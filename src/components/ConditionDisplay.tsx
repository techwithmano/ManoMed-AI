"use client";

import { SymptomAnalysisOutput } from "@/ai/flows/symptom-analysis";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ConditionDisplayProps {
  conditions: SymptomAnalysisOutput;
}

export const ConditionDisplay: React.FC<ConditionDisplayProps> = ({ conditions }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2 text-primary">Potential Conditions</h2>
      {conditions.length > 0 ? (
        <div className="grid gap-4">
          {conditions.map((condition, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{condition.condition}</CardTitle>
                <CardDescription>
                  Likelihood: {(condition.likelihood * 100).toFixed(2)}%
                </CardDescription>
              </CardHeader>
              <CardContent>
                {condition.description || "No description available."}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p>No potential conditions found.</p>
      )}
    </div>
  );
};
