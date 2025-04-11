"use client";

import { ConditionDisplay } from "@/components/ConditionDisplay";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from "react";
import { symptomAnalysis, SymptomAnalysisOutput } from "@/ai/flows/symptom-analysis";
import { Disclaimer } from "@/components/Disclaimer";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";

export default function ConditionsPage() {
  const searchParams = useSearchParams();
  const symptoms = searchParams.get('symptoms') || '';
  const medicalHistory = searchParams.get('medicalHistory') || '';
  const answersString = searchParams.get('answers') || '[]';

  const [conditions, setConditions] = useState<SymptomAnalysisOutput | null>(null);

  useEffect(() => {
    const fetchConditions = async () => {
      try {
        const questionnaireAnswers = JSON.parse(decodeURIComponent(answersString));
        const analysisResults = await symptomAnalysis({ symptoms, medicalHistory, questionnaireAnswers: questionnaireAnswers.join(',') });
        setConditions(analysisResults);
      } catch (error) {
        console.error("Error during symptom analysis:", error);
        // Handle error (e.g., display an error message)
      }
    };

    fetchConditions();
  }, [symptoms, medicalHistory, answersString]);

  if (!conditions) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-secondary">
        <Loader2 className="animate-spin h-10 w-10 text-primary mb-2" />
        <p className="text-primary">Analyzing Symptoms...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-primary">Potential Conditions</h1>
      <ConditionDisplay conditions={conditions} />
      <Disclaimer />
    </div>
  );
}


