"use client";

import { ConditionDisplay } from "@/components/ConditionDisplay";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from "react";
import { symptomAnalysis, SymptomAnalysisOutput } from "@/ai/flows/symptom-analysis";
import { Disclaimer } from "@/components/Disclaimer";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function ConditionsPage() {
  const searchParams = useSearchParams();
  const symptoms = searchParams.get('symptoms') || '';
  const medicalHistory = searchParams.get('medicalHistory') || '';
  const answersString = searchParams.get('answers') || '[]';

  const [conditions, setConditions] = useState<SymptomAnalysisOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConditions = async () => {
      try {
        const questionnaireAnswers = JSON.parse(decodeURIComponent(answersString));
        const analysisResults = await symptomAnalysis({ symptoms, medicalHistory, questionnaireAnswers: questionnaireAnswers.join(',') });
        setConditions(analysisResults);
        setError(null); // Clear any previous error
      } catch (e: any) {
        console.error("Error during symptom analysis:", e);
        setError("Failed to analyze symptoms. Please try again.");
        setConditions(null);
      }
    };

    fetchConditions();
  }, [symptoms, medicalHistory, answersString]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8">
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!conditions) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background">
        <Loader2 className="animate-spin h-12 w-12 text-secondary mb-4" />
        <p className="text-lg text-primary">Analyzing Symptoms...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8 text-primary">Potential Conditions</h1>
      <ConditionDisplay conditions={conditions} />
      <Disclaimer />
    </div>
  );
}
