'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { symptomAnalysis, SymptomAnalysisOutput } from '@/ai/flows/symptom-analysis';
import { ConditionDisplay } from '@/components/ConditionDisplay';
import { Disclaimer } from '@/components/Disclaimer';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import Loading from '@/components/Loading';

function ConditionsContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get('name') || '';
  const age = searchParams.get('age') || '';
  const gender = searchParams.get('gender') || '';
  const email = searchParams.get('email') || '';
  const symptoms = searchParams.get('symptoms') || '';
  const medicalHistory = searchParams.get('medicalHistory') || '';
  const answersRaw = searchParams.get('answers') || '[]';
  const questionsRaw = searchParams.get('questions') || '[]';

  const [conditions, setConditions] = useState<SymptomAnalysisOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [parsedQuestions, setParsedQuestions] = useState<string[]>([]);
  const [parsedAnswers, setParsedAnswers] = useState<string[]>([]);

  useEffect(() => {
    const fetchConditions = async () => {
      try {
        // Safely parse questions and answers
        let questions: string[] = [];
        let answers: string[] = [];
        
        try {
          const decodedQuestions = decodeURIComponent(questionsRaw);
          const decodedAnswers = decodeURIComponent(answersRaw);
          questions = JSON.parse(decodedQuestions);
          answers = JSON.parse(decodedAnswers);
          
          // Validate arrays
          if (!Array.isArray(questions) || !Array.isArray(answers)) {
            console.error('Invalid questions or answers format:', { questions, answers });
            questions = [];
            answers = [];
          }
          
          // Ensure both arrays have the same length
          const minLength = Math.min(questions.length, answers.length);
          questions = questions.slice(0, minLength);
          answers = answers.slice(0, minLength);
          
          setParsedQuestions(questions);
          setParsedAnswers(answers);
        } catch (parseError) {
          console.error('Error parsing questions/answers:', parseError);
          setParsedQuestions([]);
          setParsedAnswers([]);
        }

        const result = await symptomAnalysis({
          symptoms,
          medicalHistory,
          questionnaireAnswers: answers.join(','),
        });

        setConditions(result);
        setIsLoading(false);
      } catch (err) {
        console.error("Symptom analysis failed:", err);
        setError("Unable to analyze symptoms. Please try again.");
        setConditions(null);
      }
    };

    fetchConditions();
  }, [symptoms, medicalHistory, answersRaw, questionsRaw]);

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12">
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <Loading
        title="Analyzing Your Health Profile"
        description="Our AI is processing your responses and medical history to provide personalized insights..."
      />
    );
  }

  // Results state
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12">
      {conditions ? (
        <>
          <ConditionDisplay
            conditions={conditions}
            name={name}
            age={age}
            gender={gender}
            email={email}
            symptoms={symptoms}
            medicalHistory={medicalHistory}
            questions={parsedQuestions}
            answers={parsedAnswers}
          />
          <div className="mt-6">
            <Disclaimer />
          </div>
        </>
      ) : null}
    </div>
  );
}

// Main Page with Suspense fallback
export default function ConditionsPage() {
  return (
    <Suspense
      fallback={
        <Loading
          title="Loading Analysis"
          description="Preparing your personalized health insights..."
        />
      }
    >
      <ConditionsContent />
    </Suspense>
  );
}
