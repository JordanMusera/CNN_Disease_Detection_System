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
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Problem Statement</h2>
        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-lg">
          Early detection of lung and other critical diseases from medical imaging remains a major challenge in healthcare. 
          Misdiagnosis or delayed diagnosis can significantly impact patient outcomes. Our AI system is designed to assist healthcare professionals by providing fast, accurate predictions and interpretable visualizations of medical images.
        </p>
      </section>

      <section className="py-16 px-6 text-center bg-gray-50">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Project Overview</h2>
        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-lg mb-4">
          This project leverages deep convolutional neural networks (CNNs) to classify medical images for multiple conditions. The system includes models for Pneumonia, Tuberculosis, Lung Cancer, and Bone Fractures. It utilizes Grad-CAM visualizations to provide insights into which regions of the image influenced the model's prediction.
        </p>
        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-lg">
          Our primary objectives are early disease detection, reducing diagnostic time, and enhancing transparency in AI-assisted medical diagnosis.
        </p>
      </section>

      <section className="py-16 px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Development Successes & Challenges</h2>
        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-lg mb-4">
          The AI models for Pneumonia, Tuberculosis, and Bone Fractures perform robustly, producing accurate predictions and Grad-CAM visualizations that highlight affected regions clearly. These models have been tested on diverse datasets and demonstrate strong generalization.
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
          Models were trained on publicly available and curated medical imaging datasets, including chest X-rays and CT scans. Preprocessing steps included resizing, normalization, and augmentation to improve model robustness.
        </p>
        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-lg mb-2">
          Deep learning techniques used include:
        </p>
        <ul className="list-disc list-inside text-gray-700 max-w-3xl mx-auto space-y-2 text-lg">
          <li>Convolutional Neural Networks (CNNs) for image classification</li>
          <li>Transfer learning using ResNet architectures</li>
          <li>Grad-CAM for model interpretability</li>
          <li>Two-stage classification for Lung Cancer detection</li>
        </ul>
      </section>

      <section className="py-16 px-6 text-center bg-gray-50">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Ethical Considerations</h2>
        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-lg mb-2">
          AI-assisted medical diagnosis must be used as a support tool, not a replacement for professional healthcare evaluation. Users should interpret Grad-CAM visualizations cautiously, especially for Lung Cancer, and confirm findings with medical experts.
        </p>
      </section>

      <section className="py-16 px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Limitations & Future Work</h2>
        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-lg mb-2">
          Limitations include variability in medical image quality, difficulty in precise localization for some diseases, and the two-stage Lung Cancer model's Grad-CAM interpretation challenges.
        </p>
        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-lg mb-2">
          Future improvements aim to enhance localization accuracy, expand datasets, incorporate multi-modal imaging, and refine Grad-CAM interpretability for Lung Cancer.
        </p>
      </section>

      <section className="py-16 px-6 text-center bg-blue-50">
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

      <section className="py-16 px-6 text-center">
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
