"use client";

export const Disclaimer: React.FC = () => {
  return (
    <div className="mt-8 p-6 bg-secondary/10 rounded-2xl shadow-md">
      <h2 className="text-lg font-semibold text-primary mb-2">Disclaimer</h2>
      <p className="text-sm text-gray-600">
        This tool provides potential conditions based on your input and is not a substitute for professional medical advice. Always consult with a qualified healthcare provider for diagnosis and treatment.
      </p>
    </div>
  );
};
