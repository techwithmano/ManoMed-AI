"use client";

import { SymptomInputForm } from "@/components/SymptomInputForm";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleAnalysis = (symptoms: string, medicalHistory: string) => {
    router.push(`/questionnaire?symptoms=${symptoms}&medicalHistory=${medicalHistory}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8 text-primary">ManoMed AI</h1>
      <SymptomInputForm onAnalysis={handleAnalysis} />
    </div>
  );
}

