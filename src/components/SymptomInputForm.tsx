"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface SymptomInputFormProps {
  onAnalysis: (symptoms: string, medicalHistory: string) => void;
}

export const SymptomInputForm: React.FC<SymptomInputFormProps> = ({ onAnalysis }) => {
  const [symptoms, setSymptoms] = useState("");
  const [medicalHistory, setMedicalHistory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

  const handleAnalysis = async () => {
    setIsLoading(true);
    try {
      onAnalysis(symptoms, medicalHistory);
        setError(null);
    } catch (error: any) {
      console.error("Error during symptom analysis:", error);
      setError("Failed to analyze symptoms. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mb-8 p-8 rounded-2xl bg-secondary/10 shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-primary">Enter Your Symptoms</h2>
        {error && (
            <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}
      <div className="grid gap-6">
        <div>
          <label htmlFor="symptoms" className="block text-sm font-medium text-foreground mb-2">
            Symptoms (comma-separated):
          </label>
          <Input
            type="text"
            id="symptoms"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder="e.g., Headache, Fever, Cough"
            className="rounded-md shadow-sm"
          />
        </div>
        <div>
          <label htmlFor="medicalHistory" className="block text-sm font-medium text-foreground mb-2">
            Medical History (optional):
          </label>
          <Textarea
            id="medicalHistory"
            value={medicalHistory}
            onChange={(e) => setMedicalHistory(e.target.value)}
            placeholder="e.g., Asthma, Allergies"
            className="rounded-md shadow-sm"
          />
        </div>
        <Button onClick={handleAnalysis} disabled={isLoading} className="w-full">
          {isLoading ? "Analyzing..." : "Analyze Symptoms"}
        </Button>
      </div>
    </div>
  );
};
