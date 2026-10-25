import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import AppShell from "./components/AppShell";
import Pneumonia from "./pages/Pneumonia";
import LandingPage from "./pages/LandingPage";
import Conditions from "./pages/Conditions";
import Tuberculosis from "./pages/Tuberculosis";
import LungCancer from "./pages/LungCancer";
import BoneFracture from "./pages/BoneFracture";
import ModelTests from "./pages/ModelTests";
function App() {
  return <Router><AppShell><Routes><Route path="/" element={<LandingPage />} /><Route path="/conditions" element={<Conditions />} /><Route path="/conditions/pneumonia" element={<Pneumonia />} /><Route path="/conditions/tuberculosis" element={<Tuberculosis />} /><Route path="/conditions/lung_cancer" element={<LungCancer />} /><Route path="/conditions/bone_fracture" element={<BoneFracture />} /><Route path="/tests" element={<ModelTests />} /></Routes></AppShell></Router>;
}
export default App;