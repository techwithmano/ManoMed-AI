"use client";

import { SymptomInputForm } from "@/components/SymptomInputForm";
import { ConditionDisplay } from "@/components/ConditionDisplay";
import { Disclaimer } from "@/components/Disclaimer";
import { useState } from "react";
import { SymptomAnalysisOutput } from "@/ai/flows/symptom-analysis";

export default function Home() {
  const [analysisResults, setAnalysisResults] = useState<SymptomAnalysisOutput | null>(null);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-primary">HealthWise AI</h1>
      <SymptomInputForm onAnalysis={setAnalysisResults} />
      {analysisResults && (
        <ConditionDisplay conditions={analysisResults} />
      )}
      <Disclaimer />
    </div>
  );
}
