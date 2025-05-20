'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { symptomAnalysis, SymptomAnalysisOutput } from '@/ai/flows/symptom-analysis';
import { ConditionDisplay } from '@/components/ConditionDisplay';
import { Disclaimer } from '@/components/Disclaimer';
import { Loader2 } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import jsPDF from 'jspdf';

function ConditionsContent() {
  const searchParams = useSearchParams();
  const symptoms = searchParams.get('symptoms') || '';
  const medicalHistory = searchParams.get('medicalHistory') || '';
  const answersRaw = searchParams.get('answers') || '[]';

  const [conditions, setConditions] = useState<SymptomAnalysisOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConditions = async () => {
      try {
        // Decode and parse answers
        const decodedAnswers = decodeURIComponent(answersRaw);
        const parsedAnswers: string[] = JSON.parse(decodedAnswers);

        const result = await symptomAnalysis({
          symptoms,
          medicalHistory,
          questionnaireAnswers: parsedAnswers.join(','),
        });

        setConditions(result);
        setError(null);
      } catch (err) {
        console.error("Symptom analysis failed:", err);
        setError("Unable to analyze symptoms. Please try again.");
        setConditions(null);
      }
    };

    fetchConditions();
  }, [symptoms, medicalHistory, answersRaw]);

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

  // Loading or results state
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12">
      {conditions ? (
        <>
          <ConditionDisplay conditions={conditions} />
          <div className="mt-6">
            <Disclaimer />
          </div>
        </>
      ) : (
        <div className="flex items-center space-x-4 text-muted-foreground">
          <Loader2 className="w-8 h-8 animate-spin" />
          <span>Analyzing symptoms...</span>
        </div>
      )}
    </div>
  );
}

// Main Page with Suspense fallback
export default function ConditionsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12">
          <div className="flex items-center space-x-4 text-muted-foreground">
            <Loader2 className="w-8 h-8 animate-spin" />
            <span>Loading...</span>
          </div>
        </div>
      }
    >
      <ConditionsContent />
    </Suspense>
  );
}
