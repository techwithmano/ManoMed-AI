"use client";

import { SymptomInputForm } from "@/components/SymptomInputForm";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleAnalysis = (symptoms: string, medicalHistory: string) => {
    router.push(`/questionnaire?symptoms=${symptoms}&medicalHistory=${medicalHistory}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-primary">HealthWise AI</h1>
      <SymptomInputForm onAnalysis={handleAnalysis} />
      
    </div>
  );
}
