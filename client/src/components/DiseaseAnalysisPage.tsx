import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import API_URL from "../constants/api";

type Model = "pneumonia" | "tuberculosis" | "lung_cancer" | "bone_fracture";
type Props = {
  model: Model;
  title: string;
  imageType: string;
  description: string;
  guidance: string[];
  accent: string;
  accept: string;
  conditionInfo: string;
  reference: { label: string; url: string };
};

const labelGuide: Record<Model, string> = {
  pneumonia: "Normal means the model selected its Normal class. Pneumonia means it selected the class trained on pneumonia examples. These labels describe the model's image classification, not a confirmed diagnosis.",
  tuberculosis: "Normal means the model selected its Normal class. Tuberculosis means it selected the class trained on tuberculosis examples. These labels describe the model's image classification, not a confirmed diagnosis.",
  bone_fracture: "Normal means the model selected its Normal class. Fracture means it selected the class trained on fracture examples. These labels describe the model's image classification, not a confirmed diagnosis.",
  lung_cancer: "The first stage assigns Normal or Abnormal. If it assigns Normal, that is the final class. If it assigns Abnormal, a second model assigns Benign or Malignant. These are model classes and do not establish whether a person has cancer.",
};

const outcomeCases: Record<Model, { label: string; meaning: string }[]> = {
  pneumonia: [
    { label: "Normal", meaning: "The image was assigned to the model's normal class. It does not rule out pneumonia or another health issue." },
    { label: "Pneumonia", meaning: "The image was assigned to the class trained with pneumonia examples. The model does not identify the cause or severity." },
  ],
  tuberculosis: [
    { label: "Normal", meaning: "The image was assigned to the model's normal class. It does not rule out TB or other disease." },
    { label: "Tuberculosis", meaning: "The image was assigned to the class trained with TB examples. This image model does not determine active versus latent TB or confirm infection." },
  ],
  bone_fracture: [
    { label: "Normal", meaning: "The image was assigned to the model's normal class. It does not rule out a fracture." },
    { label: "Fracture", meaning: "The image was assigned to the class trained with fracture examples. The output does not specify fracture type, location, or severity." },
  ],
  lung_cancer: [
    { label: "Normal", meaning: "Stage one assigned the image to its normal class. This does not rule out disease." },
    { label: "Abnormal", meaning: "Stage one found the image closer to its abnormal class. This is a broad model label, not a cancer finding; the second stage then assigns Benign or Malignant." },
    { label: "Benign", meaning: "A non-cancerous growth does not invade nearby tissue or spread like cancer can. The model's label is not a confirmed tissue diagnosis, and benign growths can still cause health problems." },
    { label: "Malignant", meaning: "A cancerous growth can invade nearby tissue and may spread to other parts of the body. The model's label alone cannot establish that cancer is present." },
  ],
};
const DiseaseAnalysisPage = ({ model, title, imageType, description, guidance, accent, accept, conditionInfo, reference }: Props) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [imageData, setImageData] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [stageOne, setStageOne] = useState<string | null>(null);
  const [heatmap, setHeatmap] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview); }, [preview]);

  const onChooseFile = (selected?: File) => {
    if (!selected) return;
    setPrediction(null); setStageOne(null); setHeatmap(null); setError(null); setImageData(null);
    if (!selected.type.startsWith("image/")) { setFile(null); setPreview(null); setError("Choose an image file such as JPG or PNG."); return; }
    if (selected.size > 36 * 1024 * 1024) { setFile(null); setPreview(null); setError("This image is too large. Choose a file under 36 MB."); return; }
    setFile(selected); setPreview(URL.createObjectURL(selected));
    const reader = new FileReader();
    reader.onload = () => setImageData(typeof reader.result === "string" ? reader.result : null);
    reader.onerror = () => setError("The image could not be read. Please choose it again.");
    reader.readAsDataURL(selected);
  };

  const analyze = async () => {
    if (!imageData) { setError("Choose an image before starting the analysis."); return; }
    setLoading(true); setError(null); setPrediction(null); setHeatmap(null); setStageOne(null);
    try {
      const response = await fetch(`${API_URL}/post`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ model, image: imageData }) });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || data.status !== "success") throw new Error(data.message || `Analysis failed (HTTP ${response.status}).`);
      const result = model === "lung_cancer" ? data.final_prediction : data.prediction;
      if (!result) throw new Error("The model returned no prediction. Please try another image.");
      setPrediction(result); setStageOne(data.stage1_prediction || null);
      setHeatmap(data.heatmap_base64 ? `data:image/jpeg;base64,${data.heatmap_base64}` : null);
    } catch (e) { setError(e instanceof Error ? e.message : "The analysis could not be completed."); }
    finally { setLoading(false); }
  };

  return <div className={`analysis-page analysis-${accent}`}><div className="analysis-container">
    <div className="breadcrumbs"><Link to="/">Overview</Link><span>/</span><Link to="/conditions">AI models</Link><span>/</span><strong>{title}</strong></div>
    <header className="analysis-heading"><div><div className="eyebrow"><span className="eyebrow-dot" /> {imageType} MODEL</div><h1>{title} <span>analysis</span></h1><p>{description}</p></div><Link to="/conditions" className="back-models"><span>All models</span></Link></header>
    <div className="analysis-grid"><section className="upload-panel"><div className="panel-heading"><div><span className="panel-kicker">STEP 1</span><h2>Add a medical image</h2></div><span className="format-badge">JPG / PNG</span></div>
      <input ref={inputRef} type="file" accept={accept} className="visually-hidden" onChange={(e) => onChooseFile(e.target.files?.[0])} />
      {preview ? <div className="preview-frame"><img src={preview} alt={`Selected ${imageType.toLowerCase()} preview`} /><div className="preview-overlay"><span className="preview-file">{file?.name}</span><button type="button" onClick={() => inputRef.current?.click()} className="change-file">Change image</button></div></div> : <button type="button" className="dropzone" onClick={() => inputRef.current?.click()} onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); onChooseFile(e.dataTransfer.files?.[0]); }}><span className="upload-symbol"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 16V4m0 0L7.5 8.5M12 4l4.5 4.5M5 14v5h14v-5"/></svg></span><strong>Drop your image here</strong><span>or <em>browse files</em> on your device</span><small>Image files up to 36 MB</small></button>}
      {error && <div className="error-message" role="alert"><span>!</span>{error}</div>}<button type="button" className="button button-analyze" onClick={analyze} disabled={!file || loading}>{loading ? <><span className="spinner" /> Analyzing image...</> : <>Analyze image</>}</button><div className="local-processing"><span className="local-dot" /><span>Processed by the local model backend</span></div>
    </section>
    <aside className="guidance-panel"><div className="guidance-icon">i</div><div className="panel-kicker">BEFORE YOU BEGIN</div><h2>For a useful result</h2><p className="guidance-lede">Use a clear image that matches this model's intended scan type.</p><ul>{guidance.map((item) => <li key={item}><span>+</span>{item}</li>)}</ul><div className="guidance-divider" /><div className="privacy-row"><span className="privacy-icon">i</span><span><strong>Local processing</strong><small>Your image is sent to this computer's inference service.</small></span></div></aside></div>
    {(prediction || loading) && <section className="results-panel" aria-live="polite"><div className="results-header"><div><span className="panel-kicker">STEP 2</span><h2>{loading ? "Analysis in progress" : "Model output"}</h2></div>{prediction && <span className="result-label">CLASSIFICATION RESULT</span>}</div>{loading ? <div className="loading-state"><span className="spinner spinner-large" /><div><strong>Analyzing your image</strong><p>The model is preparing its classification and visual explanation.</p></div></div> : <><div className="prediction-banner"><span className="prediction-check">*</span><div><span>Predicted class</span><strong>{prediction}</strong>{stageOne && <small>Initial classification: {stageOne}</small>}</div><span className="model-tag">{title}</span></div><p className="result-explanation">{labelGuide[model]}</p><div className={`result-images ${heatmap ? "has-heatmap" : ""}`}><div className="result-image-card"><div className="image-card-heading"><strong>Uploaded image</strong><span>ORIGINAL</span></div><img src={preview || ""} alt="Uploaded medical scan" /></div>{heatmap && <div className="result-image-card"><div className="image-card-heading"><strong>Areas influencing the result</strong><span>GRAD-CAM</span></div><img src={heatmap} alt="Grad-CAM visualization highlighting scan regions" /><p className="heatmap-caption">Highlighted areas show image regions that influenced this model's class score. They are not a precise outline of disease.</p></div>}</div></>}</section>}
        <section className="outcome-cases" aria-label="Possible model outcome meanings"><div className="explanation-card"><span className="panel-kicker">POSSIBLE CASES</span><h2>What the outcome labels mean</h2><p>These are the classes available to this model, not a complete list of possible medical conditions.</p><div className="case-list">{outcomeCases[model].map((item) => <div className="case-row" key={item.label}><strong>{item.label}</strong><p>{item.meaning}</p></div>)}</div></div></section><section className="explanation-grid" aria-label="Condition and model information"><article className="explanation-card"><span className="panel-kicker">CONDITION</span><h2>About {title.toLowerCase()}</h2><p>{conditionInfo}</p><a href={reference.url} target="_blank" rel="noreferrer">Read more from {reference.label}</a></article><article className="explanation-card"><span className="panel-kicker">MODEL AND RESULTS</span><h2>How to read the output</h2><p>The image is resized and prepared for the model, which compares its visual patterns with examples learned during training. The class with the strongest model score is returned as the prediction.</p><p>{model === "lung_cancer" ? "For lung cancer, a first classifier separates Normal from Abnormal. Only images classified Abnormal are passed to a second classifier for the Benign or Malignant class." : "This model chooses between its two trained classes: Normal and the condition label shown above."}</p><p>If a Grad-CAM image is available, its highlighted regions indicate areas that influenced the prediction. It can help inspect the model's behavior but cannot confirm or rule out a condition.</p></article></section>
    <div className="medical-note"><span>!</span><p><strong>For learning and research only.</strong> This model may be wrong and is not a medical diagnosis. A qualified healthcare professional should interpret medical images and advise on care.</p></div>
  </div></div>;
};
export default DiseaseAnalysisPage;