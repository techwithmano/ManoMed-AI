"use client";

import { ConditionDisplay } from "@/components/ConditionDisplay";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from "react";
import { symptomAnalysis, SymptomAnalysisOutput } from "@/ai/flows/symptom-analysis";
import { Disclaimer } from "@/components/Disclaimer";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

function ConditionsContent() {
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
        setError(null);
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      {conditions ? (
        <>
          <ConditionDisplay conditions={conditions} />
          <Disclaimer />
        </>
      ) : (
        <div className="flex items-center space-x-4">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span>Analyzing symptoms...</span>
        </div>
      )}
    </div>
  );
}

export default function ConditionsPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center min-h-screen p-8">
        <div className="flex items-center space-x-4">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span>Loading...</span>
        </div>
      </div>
    }>
      <ConditionsContent />
    </Suspense>
  );
}
