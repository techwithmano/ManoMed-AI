"use client";

import { QuestionnaireForm } from "@/components/QuestionnaireForm";
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState, Suspense } from "react";
import { generateQuestionnaire } from "@/ai/flows/generate-questionnaire-flow";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

function QuestionnaireContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const symptoms = searchParams.get('symptoms') || '';
  const medicalHistory = searchParams.get('medicalHistory') || '';

  const [questions, setQuestions] = useState<string[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const questionnaire = await generateQuestionnaire({ symptoms, medicalHistory });
        setQuestions(questionnaire);
        setError(null);
      } catch (e: any) {
        console.error("Error generating questionnaire:", e);
        setError("Failed to generate questionnaire. Please try again.");
        setQuestions(null);
      }
    };

    fetchQuestions();
  }, [symptoms, medicalHistory]);

  const handleAnswersSubmit = (answers: string[]) => {
    const answersString = encodeURIComponent(JSON.stringify(answers));
    router.push(`/conditions?symptoms=${symptoms}&medicalHistory=${medicalHistory}&answers=${answersString}`);
  };

  const handleCancel = () => {
    router.push('/');
  };

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
      {questions ? (
        <QuestionnaireForm 
          questions={questions} 
          onAnswers={handleAnswersSubmit} 
          onCancel={handleCancel} 
        />
      ) : (
        <div className="flex items-center space-x-4">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span>Generating questionnaire...</span>
        </div>
      )}
    </div>
  );
}

export default function QuestionnairePage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center min-h-screen p-8">
        <div className="flex items-center space-x-4">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span>Loading...</span>
        </div>
      </div>
    }>
      <QuestionnaireContent />
    </Suspense>
  );
}
