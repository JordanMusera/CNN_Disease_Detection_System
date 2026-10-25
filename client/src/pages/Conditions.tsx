import React from "react";
import { Link } from "react-router-dom";
const conditions = [
  { name: "Pneumonia", type: "Chest X-ray", description: "Classifies chest X-ray images for patterns associated with pneumonia.", path: "/conditions/pneumonia" },
  { name: "Tuberculosis", type: "Chest X-ray", description: "Analyzes chest X-ray images for patterns associated with tuberculosis.", path: "/conditions/tuberculosis" },
  { name: "Lung cancer", type: "Lung image", description: "A two-stage classifier for normal, abnormal, benign, and malignant classes.", path: "/conditions/lung_cancer" },
  { name: "Bone fracture", type: "Bone X-ray", description: "Classifies X-ray images for patterns associated with bone fracture.", path: "/conditions/bone_fracture" },
];
const Conditions = () => <div className="content-width conditions-page"><div className="page-intro"><p className="eyebrow">MODEL LIBRARY</p><h1>Select a model</h1><p>Choose a classifier that matches the image you want to analyze.</p></div><div className="condition-grid">{conditions.map((condition, index) => <Link to={condition.path} className="condition-card" key={condition.name}><div className="condition-card-head"><span className="condition-number">0{index + 1}</span><span className="condition-type">{condition.type}</span></div><h2>{condition.name}</h2><p>{condition.description}</p><span className="condition-open">Open model <span aria-hidden="true">→</span></span></Link>)}</div><p className="local-caption library-caption">Image analysis runs through the local model service.</p></div>;
export default Conditions;