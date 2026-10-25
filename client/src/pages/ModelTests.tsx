import React from "react";

type TestCase = {
  title: string;
  model: string;
  sourceLabel: string;
  output: string;
  stage?: string;
  image: string;
  heatmap: string;
  source: string;
  sourceUrl: string;
  credit: string;
  note: string;
  overlayExplanation: string;
};

const cases: TestCase[] = [
  {
    title: "Pneumonia example",
    model: "Chest X-ray classifier",
    sourceLabel: "Pneumonia",
    output: "Pneumonia",
    image: "/test-gallery/pneumonia-positive-example.jpeg",
    heatmap: "/test-gallery/pneumonia-positive-example-heatmap.jpg",
    source: "Public pneumonia test set on GitHub",
    sourceUrl: "https://github.com/probml/chest_xray_kaggle/blob/main/test/PNEUMONIA/person10_virus_35.jpeg",
    credit: "Kermany et al. Chest X-Ray Images (Pneumonia) dataset; CC BY 4.0 source data.",
    note: "This pediatric chest X-ray comes from a public dataset labeled Pneumonia. The local model also returned Pneumonia.",
    overlayExplanation: "The overlay marks image regions that influenced the Pneumonia output. It does not outline infection or show how severe it is."
  },
  {
    title: "Normal chest X-ray example",
    model: "Chest X-ray classifier",
    sourceLabel: "Normal",
    output: "Normal",
    image: "/test-gallery/pneumonia-normal-example.jpeg",
    heatmap: "/test-gallery/pneumonia-normal-example-heatmap.jpg",
    source: "Public pneumonia test set on GitHub",
    sourceUrl: "https://github.com/probml/chest_xray_kaggle/blob/main/test/NORMAL/IM-0003-0001.jpeg",
    credit: "Kermany et al. Chest X-Ray Images (Pneumonia) dataset; CC BY 4.0 source data.",
    note: "This chest X-ray is labeled Normal in its source dataset, and the model returned Normal.",
    overlayExplanation: "A heatmap still appears because Grad-CAM is asked to explain the class the model selected—in this case, Normal. The highlighted areas influenced the Normal score; they are not disease marks. Ordinary anatomy, image contrast, or artifacts can influence the score too."
  },
  {
    title: "Pulmonary tuberculosis example",
    model: "Chest X-ray classifier",
    sourceLabel: "Pulmonary tuberculosis case",
    output: "Tuberculosis",
    image: "/test-gallery/tuberculosis-positive-example.png",
    heatmap: "/test-gallery/tuberculosis-positive-example-heatmap.jpg",
    source: "CDC Public Health Image Library, image 28765",
    sourceUrl: "https://wwwn.cdc.gov/phil/Details.aspx?pid=28765",
    credit: "CDC / Richard Larkin. Public-domain image; credit CDC and photographer.",
    note: "CDC identifies this as a chest X-ray from a pulmonary tuberculosis case, and this image received a Tuberculosis output.",
    overlayExplanation: "The overlay shows regions that influenced the Tuberculosis output for this one image. It is not a precise outline of TB lesions or proof that the model found them correctly."
  },
  {
    title: "Bone fracture example",
    model: "Bone X-ray classifier",
    sourceLabel: "Tibia and fibula fracture",
    output: "Fracture",
    image: "/test-gallery/fracture-wellcome.jpg",
    heatmap: "/test-gallery/fracture-wellcome-heatmap.jpg",
    source: "Wellcome Collection, image 38513i",
    sourceUrl: "https://wellcomecollection.org/works/wj6dh6t8",
    credit: "Wellcome Collection; Public Domain Mark.",
    note: "This historical X-ray shows a tibia and fibula fracture in the Wellcome Collection record. The classifier returned Fracture.",
    overlayExplanation: "The overlay marks regions that influenced the Fracture output. It does not trace the break or estimate its severity."
  },
  {
    title: "Lung tissue example",
    model: "Two-stage histopathology classifier",
    sourceLabel: "Lung adenocarcinoma photomicrograph",
    output: "Malignant",
    stage: "Stage 1: Abnormal; Stage 2: Malignant",
    image: "/test-gallery/lung-adenocarcinoma-cdc.jpg",
    heatmap: "/test-gallery/lung-adenocarcinoma-cdc-heatmap.jpg",
    source: "CDC Public Health Image Library, image 22244",
    sourceUrl: "https://wwwn.cdc.gov/phil/Details.aspx?pid=22244",
    credit: "CDC / Dr. Charles N. Farmer; Dr. Ellis, Emory University Department of Pathology. Public domain.",
    note: "This CDC photomicrograph shows lung adenocarcinoma tissue. The two-stage model returned Abnormal, then Malignant. This model is for tissue microscopy images, not lung CT scans.",
    overlayExplanation: "The overlay marks tissue regions that influenced the Malignant output. It is not a tumor boundary or a measure of cancer stage."
  },
];

const ModelTests = () => <div className="content-width model-tests-page">
  <header className="page-intro"><p className="eyebrow">LOCAL MODEL RUNS</p><h1>Model tests</h1><p>Selected public image examples run through the project's current local models. Each card shows the source label, actual output, original image, and Grad-CAM visualization.</p></header>
  <div className="test-notice"><strong>How to read Grad-CAM</strong><p>Grad-CAM creates a heatmap for the class the model selected, including Normal. Highlighted regions show what influenced that class score; a highlight on a Normal image does not mean disease. The overlay is not a lesion outline, confidence or diagnosis. Ordinary anatomy, contrast and image artifacts may influence the model.</p></div>
  <div className="test-notice"><strong>Read the results carefully</strong><p>These are selected demonstrations, not a clinical evaluation or an accuracy benchmark. The examples may overlap training data, and the model API does not return a calibrated confidence score. A Grad-CAM overlay shows image regions that influenced a class score; it does not prove disease.</p></div>
  <div className="test-case-list">{cases.map((item) => <article className="test-case" key={item.title}>
    <div className="test-case-top"><div><span className="panel-kicker">{item.model}</span><h2>{item.title}</h2></div><div className="test-output"><span>MODEL OUTPUT</span><strong>{item.output}</strong>{item.stage && <small>{item.stage}</small>}</div></div>
    <div className="test-image-grid"><figure><img src={item.image} alt={`Source scan for ${item.title}`} /><figcaption>Original source image</figcaption></figure><figure><img src={item.heatmap} alt={`Grad-CAM visualization for ${item.title}`} /><figcaption>Model Grad-CAM overlay</figcaption></figure></div>
    <div className="test-case-details"><div><span className="panel-kicker">SOURCE LABEL</span><p><strong>{item.sourceLabel}</strong></p><p>{item.note}</p><span className="panel-kicker overlay-kicker">WHAT THE OVERLAY SHOWS</span><p>{item.overlayExplanation}</p></div><div><span className="panel-kicker">IMAGE CREDIT</span><p>{item.credit}</p><a href={item.sourceUrl} target="_blank" rel="noreferrer">{item.source}</a></div></div>
  </article>)}</div>
  <div className="medical-note"><span>!</span><p><strong>Educational demonstration only.</strong> These outputs are not a diagnosis and should not be used to make care decisions. Have medical images interpreted by a qualified healthcare professional.</p></div>
</div>;

export default ModelTests;