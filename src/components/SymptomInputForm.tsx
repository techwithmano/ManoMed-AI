"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { symptomAnalysis, SymptomAnalysisOutput } from "@/ai/flows/symptom-analysis";

interface SymptomInputFormProps {
  onAnalysis: (results: SymptomAnalysisOutput) => void;
}

export const SymptomInputForm: React.FC<SymptomInputFormProps> = ({ onAnalysis }) => {
  const [symptoms, setSymptoms] = useState("");
  const [medicalHistory, setMedicalHistory] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalysis = async () => {
    setIsLoading(true);
    try {
      const results = await symptomAnalysis({ symptoms, medicalHistory });
      onAnalysis(results);
    } catch (error) {
      console.error("Error during symptom analysis:", error);
      // Handle error (e.g., display an error message)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mb-4 rounded-md shadow-md p-6 bg-secondary/20">
      <h2 className="text-xl font-semibold mb-2 text-primary">Enter Your Symptoms</h2>
      <div className="grid gap-4">
        <div>
          <label htmlFor="symptoms" className="block text-sm font-medium text-foreground">
            Symptoms (comma-separated):
          </label>
          <Input
            type="text"
            id="symptoms"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder="e.g., Headache, Fever, Cough"
          />
        </div>
        <div>
          <label htmlFor="medicalHistory" className="block text-sm font-medium text-foreground">
            Medical History (optional):
          </label>
          <Textarea
            id="medicalHistory"
            value={medicalHistory}
            onChange={(e) => setMedicalHistory(e.target.value)}
            placeholder="e.g., Asthma, Allergies"
          />
        </div>
        <Button onClick={handleAnalysis} disabled={isLoading}>
          {isLoading ? "Analyzing..." : "Analyze Symptoms"}
        </Button>
      </div>
    </div>
  );
};
