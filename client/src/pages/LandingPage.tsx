import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white">

      <section className="flex flex-col items-center justify-center text-center py-24 px-6 bg-gradient-to-r from-blue-200 to-blue-50">
        <h1 className="text-gray-900 font-extrabold text-4xl md:text-6xl tracking-tight mb-6">
          E-Afya Disease Detection AI System
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
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Problem Statement</h2>
        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-lg">
          Early detection of lung and other critical diseases from medical imaging remains a major challenge in healthcare. Misdiagnosis or delayed diagnosis can significantly impact patient outcomes. 
          The E-Afya AI System assists healthcare professionals by providing fast, accurate predictions and interpretable visualizations.
        </p>
      </section>

      <section className="py-16 px-6 text-center bg-gray-50">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Project Overview</h2>
        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-lg mb-4">
          This project leverages deep convolutional neural networks (CNNs) to classify medical images for multiple conditions, including Pneumonia, Tuberculosis, Lung Cancer, and Bone Fractures. Grad-CAM visualizations provide insights into which regions of the image influenced the model's prediction.
        </p>
        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-lg">
          Primary objectives include early disease detection, reducing diagnostic time, and enhancing transparency in AI-assisted medical diagnosis.
        </p>
      </section>

      <section className="py-16 px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Development Successes & Challenges</h2>
        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-lg mb-4">
          Models for Pneumonia, Tuberculosis, and Bone Fractures perform robustly, providing accurate predictions and Grad-CAM visualizations that clearly highlight affected regions.
        </p>
        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-lg mb-4">
          The Lung Cancer model, while highly accurate in classification, faces challenges in Grad-CAM visualization. The two-stage classification process focuses on image-level prediction rather than precise pixel-level localization. Subtle patterns in CT scans further dilute the Grad-CAM signal, making it less reliable for visual interpretation, even though classification accuracy remains high.
        </p>
      </section>

      <section className="py-16 px-6 text-center bg-gray-50">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Supported Models</h2>
        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-lg mb-6">
          The system currently supports automated detection of the following conditions:
        </p>
        <ul className="flex flex-wrap justify-center gap-6 text-gray-700 font-semibold text-lg">
          <li>🫁 Pneumonia</li>
          <li>🫁 Tuberculosis</li>
          <li>🫁 Lung Cancer</li>
          <li>🦴 Bone Fracture</li>
        </ul>
      </section>

      <section className="py-16 px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Datasets & Techniques</h2>
        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-lg mb-2">
          Models were trained on publicly available and curated medical imaging datasets, including chest X-rays and CT scans. Preprocessing included resizing, normalization, and augmentation to improve robustness.
        </p>
        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-lg mb-2">
          Techniques include:
        </p>
        <ul className="list-disc list-inside text-gray-700 max-w-3xl mx-auto space-y-2 text-lg">
          <li>Convolutional Neural Networks (CNNs) for image classification</li>
          <li>Transfer learning using ResNet architectures</li>
          <li>Grad-CAM for interpretability</li>
          <li>Two-stage classification for Lung Cancer detection</li>
        </ul>
      </section>

      <section className="py-16 px-6 text-center bg-gray-50">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Ethical Considerations</h2>
        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-lg mb-2">
          AI-assisted medical diagnosis should support, not replace, professional evaluation. Grad-CAM visualizations for Lung Cancer must be interpreted cautiously and confirmed with medical experts.
        </p>
      </section>

      <section className="py-16 px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Limitations & Future Work</h2>
        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-lg mb-2">
          Limitations include variability in image quality, difficulty in precise localization, and Grad-CAM challenges in the two-stage Lung Cancer model.
        </p>
        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-lg mb-2">
          Future improvements will enhance localization accuracy, expand datasets, incorporate multi-modal imaging, and refine Grad-CAM interpretability for Lung Cancer.
        </p>
      </section>

      <section className="py-16 px-6 text-center bg-blue-50">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Inspiration & Developer</h2>
        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-lg mb-4">
          Inspired by the need to improve early disease detection, developed by <span className="font-semibold text-blue-600">Jordan Musera</span>.
        </p>
        <a
          href="https://www.linkedin.com/in/jordan-musera-25669b338/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 font-bold hover:underline"
        >
          Connect on LinkedIn
        </a>
      </section>

      <section className="py-16 px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Get Started</h2>
        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-lg mb-6">
          Explore the models and see how the <span className="font-semibold">E-Afya AI System</span> assists in early detection of diseases.
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
