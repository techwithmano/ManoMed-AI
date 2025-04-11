"use client";

import { SymptomInputForm } from "@/components/SymptomInputForm";
import { ConditionDisplay } from "@/components/ConditionDisplay";
import { Disclaimer } from "@/components/Disclaimer";
import { QuestionnaireForm } from "@/components/QuestionnaireForm";
import { useState } from "react";
import { SymptomAnalysisOutput } from "@/ai/flows/symptom-analysis";

export default function Home() {
  const [analysisResults, setAnalysisResults] = useState<SymptomAnalysisOutput | null>(null);
  const [questionnaire, setQuestionnaire] = useState<string[] | null>(null);
  const [questionnaireAnswers, setQuestionnaireAnswers] = useState<string[] | null>(null);

  const handleQuestionnaireSubmit = (answers: string[]) => {
    setQuestionnaireAnswers(answers);
  };

  const handleAnalysisUpdate = (updatedResults: SymptomAnalysisOutput) => {
    setAnalysisResults(updatedResults);
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-primary">HealthWise AI</h1>
      <SymptomInputForm onAnalysis={setAnalysisResults} onQuestionnaire={setQuestionnaire} onAnalysisUpdate={handleAnalysisUpdate} />
      {questionnaire && !questionnaireAnswers && (
        <QuestionnaireForm
          questions={questionnaire}
          onAnswers={handleQuestionnaireSubmit}
          onCancel={() => setQuestionnaire(null)}
        />
      )}

      {analysisResults && questionnaireAnswers && (
        <ConditionDisplay conditions={analysisResults} />
      )}
      <Disclaimer />
    </div>
  );
}
