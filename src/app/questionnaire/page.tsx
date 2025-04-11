"use client";

import { QuestionnaireForm } from "@/components/QuestionnaireForm";
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { generateQuestionnaire } from "@/ai/flows/generate-questionnaire-flow";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function QuestionnairePage() {
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
        setError(null); // Clear any previous error
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

  if (!questions) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background">
        <Loader2 className="animate-spin h-12 w-12 text-secondary mb-4" />
        <p className="text-lg text-primary">Generating Questionnaire...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8 text-primary">Questionnaire</h1>
      <QuestionnaireForm questions={questions} onAnswers={handleAnswersSubmit} onCancel={handleCancel} />
    </div>
  );
}
