"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface QuestionnaireFormProps {
  questions: string[];
  onAnswers: (answers: string[]) => void;
  onCancel: () => void;
}

export const QuestionnaireForm: React.FC<QuestionnaireFormProps> = ({ questions, onAnswers, onCancel }) => {
  const [answers, setAnswers] = useState<string[]>(Array(questions.length).fill(""));
  const [isLoading, setIsLoading] = useState(false);

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      onAnswers(answers);
    } catch (error) {
      console.error("Error submitting questionnaire:", error);
      // Handle error (e.g., display an error message)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mb-4 rounded-md shadow-md p-6 bg-secondary/20">
      <h2 className="text-xl font-semibold mb-4 text-primary">Questionnaire</h2>
      <div className="grid gap-4">
        {questions.map((question, index) => (
          <div key={index}>
            <label htmlFor={`question-${index}`} className="block text-sm font-medium text-foreground">
              {question}
            </label>
            <Textarea
              id={`question-${index}`}
              value={answers[index]}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
              placeholder="Your answer"
            />
          </div>
        ))}
        <div className="flex justify-between">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "Submit Answers" : "Submitting..."}
          </Button>
        </div>
      </div>
    </div>
  );
};
