"use client";

import { QuestionnaireForm } from "@/components/QuestionnaireForm";
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState, Suspense } from "react";
import { generateQuestionnaire } from "@/ai/flows/generate-questionnaire-flow";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Loading from '@/components/Loading';

function QuestionnaireContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const name = searchParams.get('name') || '';
  const age = searchParams.get('age') || '';
  const gender = searchParams.get('gender') || '';
  const email = searchParams.get('email') || '';
  const symptoms = searchParams.get('symptoms') || '';
  const medicalHistory = searchParams.get('medicalHistory') || '';

  const [questions, setQuestions] = useState<string[] | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const questionnaire = await generateQuestionnaire({ symptoms, medicalHistory });
        setQuestions(questionnaire);
        setAnswers(new Array(questionnaire.length).fill(''));
        setIsLoading(false);
      } catch (e) {
        console.error("Error generating questionnaire:", e);
        // Retry logic will be handled by the loading state
      }
    };

    fetchQuestions();
  }, [symptoms, medicalHistory]);

  const handleNext = () => {
    if (currentQuestionIndex < (questions?.length || 0) - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      const answersString = encodeURIComponent(JSON.stringify(answers));
      const questionsString = encodeURIComponent(JSON.stringify(questions));
      const queryParams = new URLSearchParams({
        name,
        age,
        gender,
        email,
        symptoms,
        medicalHistory,
        answers: answersString,
        questions: questionsString
      });
      router.push(`/conditions?${queryParams.toString()}`);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answer;
    setAnswers(newAnswers);
  };

  if (isLoading) {
    return (
      <Loading
        title="Crafting Your Health Assessment"
        description="Our AI is analyzing your symptoms to create a personalized questionnaire..."
      />
    );
  }

  if (!questions || questions.length === 0) {
    return null; // Will retry automatically due to loading state
  }

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-center">Health Assessment Questionnaire</CardTitle>
          <Progress value={progress} className="mt-4" />
          <p className="text-center text-sm text-muted-foreground mt-2">
            Question {currentQuestionIndex + 1} of {questions.length}
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="text-lg font-medium">
              {questions[currentQuestionIndex]}
            </div>
            <div className="space-y-4">
              <textarea
                className="w-full min-h-[100px] p-3 rounded-md border"
                value={answers[currentQuestionIndex]}
                onChange={(e) => handleAnswer(e.target.value)}
                placeholder="Type your answer here..."
              />
            </div>
            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </Button>
              <Button
                onClick={handleNext}
                className="flex items-center gap-2"
              >
                {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function QuestionnairePage() {
  return (
    <Suspense fallback={
      <Loading
        title="Loading Questionnaire"
        description="Preparing your personalized health assessment..."
      />
    }>
      <QuestionnaireContent />
    </Suspense>
  );
}
