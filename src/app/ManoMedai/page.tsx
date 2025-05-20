"use client";

import { SymptomInputForm } from "@/components/SymptomInputForm";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleAnalysis = (data: {
    name: string;
    age: string;
    gender: string;
    email: string;
    symptoms: string;
    medicalHistory: string;
  }) => {
    const queryParams = new URLSearchParams({
      name: data.name,
      age: data.age,
      gender: data.gender,
      email: data.email,
      symptoms: data.symptoms,
      medicalHistory: data.medicalHistory
    });
    
    router.push(`/questionnaire?${queryParams.toString()}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12 bg-background text-foreground">
      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-primary mb-4">ManoMed AI</h1>
        <p className="text-muted-foreground text-lg max-w-xl">
          Begin your health journey—enter your information to get AI-assisted recommendations.
        </p>
      </div>
      <div className="w-full max-w-2xl">
        <SymptomInputForm onAnalysis={handleAnalysis} />
      </div>
    </div>
  );
}
