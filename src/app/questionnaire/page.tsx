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
      const queryParams = new URLSearchParams({
        name,
        age,
        gender,
        email,
        symptoms,
        medicalHistory,
        answers: answersString
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
      <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-8 bg-gradient-to-b from-background to-secondary/10">
        <div className="text-center space-y-6 max-w-md mx-auto">
          <div className="relative w-32 h-32 sm:w-40 sm:h-40">
            <div className="absolute inset-0 border-4 border-primary/20 rounded-full animate-pulse"></div>
            <div className="absolute inset-0 border-4 border-primary rounded-full animate-spin border-t-transparent"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
                <Loader2 className="w-16 h-16 sm:w-20 sm:h-20 text-primary animate-spin" />
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary animate-pulse">
              Crafting Your Health Assessment
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              Our AI is analyzing your symptoms to create a personalized questionnaire...
            </p>
          </div>
          <div className="flex justify-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce"></div>
          </div>
        </div>
      </div>
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
      <div className="flex flex-col items-center justify-center min-h-screen p-8">
        <div className="text-center space-y-4">
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-primary rounded-full animate-spin border-t-transparent"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="w-12 h-12 text-primary animate-pulse" />
            </div>
          </div>
          <p className="text-lg font-medium text-primary">Loading questionnaire...</p>
        </div>
      </div>
    }>
      <QuestionnaireContent />
    </Suspense>
  );
}
