'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { symptomAnalysis, SymptomAnalysisOutput } from '@/ai/flows/symptom-analysis';
import { ConditionDisplay } from '@/components/ConditionDisplay';
import { Disclaimer } from '@/components/Disclaimer';
import { Loader2 } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import jsPDF from 'jspdf';
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

  useEffect(() => {
    const fetchConditions = async () => {
      try {
        // Decode and parse answers and questions
        const decodedAnswers = decodeURIComponent(answersRaw);
        const decodedQuestions = decodeURIComponent(questionsRaw);
        const parsedAnswers: string[] = JSON.parse(decodedAnswers);
        const parsedQuestions: string[] = JSON.parse(decodedQuestions);

        const result = await symptomAnalysis({
          symptoms,
          medicalHistory,
          questionnaireAnswers: parsedAnswers.join(','),
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

  // PDF download function
  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Symptom Analysis Report', 20, 20);
    doc.setFontSize(12);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 30);
    
    doc.text('Symptoms:', 20, 40);
    doc.text(symptoms, 20, 50);
    
    doc.text('Medical History:', 20, 60);
    doc.text(medicalHistory || 'None', 20, 70);

    doc.text('Potential Conditions:', 20, 80);

    if (conditions) {
      conditions.forEach((condition, index) => {
        const yOffset = 90 + index * 20;
        doc.text(`${index + 1}. ${condition.condition}`, 20, yOffset);
        doc.text(`Likelihood: ${(condition.likelihood * 100).toFixed(2)}%`, 20, yOffset + 10);
        doc.text(condition.description || 'No description available.', 20, yOffset + 20);
      });
    } else {
      doc.text('No conditions found.', 20, 90);
    }

    // Save PDF
    doc.save('Symptom_Analysis_Report.pdf');
  };

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
            questions={JSON.parse(decodeURIComponent(questionsRaw))}
            answers={JSON.parse(decodeURIComponent(answersRaw))}
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
                Loading Analysis
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground">
                Preparing your personalized health insights...
              </p>
            </div>
            <div className="flex justify-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce"></div>
            </div>
          </div>
        </div>
      }
    >
      <ConditionsContent />
    </Suspense>
  );
}
