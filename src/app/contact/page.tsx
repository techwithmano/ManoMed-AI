// src/app/about/page.tsx

import React from "react";

export default function About() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8 text-primary">About ManoMed AI</h1>
      <p className="text-lg mb-4">
        ManoMed AI is an AI-powered medical expert system designed to help
        users diagnose medical symptoms and gain insights into their health.
        Our platform uses advanced algorithms and data analysis to provide
        accurate recommendations.
      </p>
      <p className="text-lg">
        Our mission is to offer accessible and reliable healthcare guidance to
        people around the world. We aim to bridge the gap between patients and
        healthcare professionals by leveraging the power of AI.
      </p>
    </div>
  );
}
