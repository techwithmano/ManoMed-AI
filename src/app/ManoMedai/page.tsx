"use client";

import { SymptomInputForm } from "@/components/SymptomInputForm";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleAnalysis = (symptoms: string, medicalHistory: string) => {
    router.push(`/questionnaire?symptoms=${encodeURIComponent(symptoms)}&medicalHistory=${encodeURIComponent(medicalHistory)}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12 bg-background text-foreground">
      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-primary mb-4">ManoMed AI</h1>
        <p className="text-muted-foreground text-lg max-w-xl">
          Begin your health journey—enter your symptoms and medical history to get AI-assisted recommendations.
        </p>
      </div>
      <div className="w-full max-w-xl">
        <SymptomInputForm onAnalysis={handleAnalysis} />
      </div>
    </div>
  );
}
