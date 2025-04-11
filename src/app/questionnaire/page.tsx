"use client";

import { QuestionnaireForm } from "@/components/QuestionnaireForm";
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { generateQuestionnaire } from "@/ai/flows/generate-questionnaire-flow";
import { Skeleton } from "@/components/ui/skeleton";

export default function QuestionnairePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const symptoms = searchParams.get('symptoms') || '';
  const medicalHistory = searchParams.get('medicalHistory') || '';

  const [questions, setQuestions] = useState<string[] | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      const questionnaire = await generateQuestionnaire({ symptoms, medicalHistory });
      setQuestions(questionnaire);
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

  if (!questions) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-primary">Loading Questionnaire</h1>
        <Skeleton className="w-full h-10 mb-2" />
        <Skeleton className="w-full h-10 mb-2" />
        <Skeleton className="w-full h-10 mb-2" />
        <Skeleton className="w-full h-10 mb-2" />
        <Skeleton className="w-full h-10 mb-2" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-primary">Questionnaire</h1>
      <QuestionnaireForm questions={questions} onAnswers={handleAnswersSubmit} onCancel={handleCancel} />
    </div>
  );
}

