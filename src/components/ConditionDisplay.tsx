"use client";

import { SymptomAnalysisOutput } from "@/ai/flows/symptom-analysis";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, Info } from "lucide-react"; // Import necessary icons

interface ConditionDisplayProps {
  conditions: SymptomAnalysisOutput;
}

export const ConditionDisplay: React.FC<ConditionDisplayProps> = ({ conditions }) => {
  const getIcon = (likelihood: number) => {
    if (likelihood > 0.75) {
      return <CheckCircle className="w-4 h-4 text-green-500 mr-1" />;
    } else if (likelihood > 0.5) {
      return <AlertTriangle className="w-4 h-4 text-yellow-500 mr-1" />;
    } else {
      return <Info className="w-4 h-4 text-gray-500 mr-1" />;
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-primary">Potential Conditions</h2>
      {conditions.length > 0 ? (
        <div className="grid gap-6">
          {conditions.map((condition, index) => (
            <Card key={index} className="shadow-md rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center">
                  {condition.condition}
                </CardTitle>
                <CardDescription>
                  Likelihood: 
                  <Badge variant="secondary">
                    {(condition.likelihood * 100).toFixed(2)}%
                  </Badge>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-2">
                  {getIcon(condition.likelihood)}
                  <span>{condition.description || "No description available."}</span>
                </div>
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
