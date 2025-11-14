import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <section className="flex flex-col items-center justify-center text-center py-24 px-6 bg-gradient-to-r from-blue-200 to-blue-50">
        <h1 className="text-gray-900 font-extrabold text-4xl md:text-6xl tracking-tight mb-6">
          Welcome to the Disease Detection AI
        </h1>
        <p className="text-gray-700 text-lg md:text-xl max-w-3xl mb-8">
          AI-powered analysis for early detection of diseases using medical imaging and deep learning techniques.
        </p>
        <Link
          to="/conditions"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl text-lg transition-colors"
        >
          Explore Models
        </Link>
      </section>

      <section className="py-16 px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Purpose</h2>
        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-lg">
          This AI system was developed to assist healthcare professionals by providing fast, accurate detection of multiple diseases from medical images. It reduces diagnostic time, improves early detection, and highlights affected regions for better understanding.
        </p>
      </section>

      <section className="py-16 px-6 text-center bg-gray-50">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Supported Models</h2>
        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-lg mb-6">
          Currently, the system supports detection of:
        </p>
        <ul className="flex flex-wrap justify-center gap-6 text-gray-700 font-semibold text-lg">
          <li>🫁 Pneumonia</li>
          <li>🫁 Tuberculosis</li>
          <li>🫁 Lung Cancer</li>
          <li>🦴 Bone Fracture</li>
        </ul>
      </section>

      <section className="py-16 px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Challenges in Training</h2>
        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-lg">
          Training deep learning models for medical image analysis requires large, high-quality datasets. Challenges include handling imbalanced data, preprocessing diverse image types, and ensuring model interpretability. Grad-CAM visualization helps highlight areas of interest to improve model transparency.
        </p>
      </section>

      <section className="py-16 px-6 text-center bg-gray-50">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">How It Works</h2>
        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-lg mb-6">
          Users upload a medical image. The AI model predicts the presence of a disease and generates a Grad-CAM heatmap to visualize the affected areas on the image. This provides an interpretable and intuitive view of the diagnosis.
        </p>
       
      </section>

      <section className="py-16 px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Inspiration & Developer</h2>
        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-lg mb-4">
          Inspired by the need to improve early disease detection, this project was developed by <span className="font-semibold text-blue-600">Jordan Musera</span>.
        </p>
        <a
          href="https://www.linkedin.com/in/jordan-musera-25669b338/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 font-bold hover:underline"
        >
          Connect with me on LinkedIn
        </a>
      </section>

      <section className="py-16 px-6 text-center bg-blue-50">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Get Started</h2>
        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-lg mb-6">
          Explore the models and see how AI can assist in early detection of diseases.
        </p>
        <Link
          to="/conditions"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl text-lg transition-colors"
        >
          Explore Models
        </Link>
      </section>
    </div>
  );
}

export default LandingPage;
