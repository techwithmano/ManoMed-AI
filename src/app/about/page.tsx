import React from 'react';

const About: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-gray-900">About ManoMed AI</h2>
        <p className="mt-4 text-xl text-gray-600">
          Revolutionizing healthcare with AI-powered diagnostic assistance.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-2xl font-semibold text-gray-800">Our Mission</h3>
          <p className="mt-4 text-gray-600">
            ManoMed AI aims to provide an intuitive, AI-driven diagnostic tool that helps users analyze medical symptoms and receive accurate, timely advice. Our mission is to make healthcare more accessible and efficient through the power of technology.
          </p>
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-gray-800">How It Works</h3>
          <p className="mt-4 text-gray-600">
            Using cutting-edge machine learning models, ManoMed AI analyzes user-input symptoms and provides suggestions based on historical medical data. It’s designed to help users better understand their health and seek professional medical advice when necessary.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
