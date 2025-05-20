'use client';

import { SymptomAnalysisOutput } from "@/ai/flows/symptom-analysis";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, Info, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";

interface ConditionDisplayProps {
  conditions: SymptomAnalysisOutput;
  symptoms: string;
  medicalHistory: string;
}

export const ConditionDisplay: React.FC<ConditionDisplayProps> = ({
  conditions,
  symptoms,
  medicalHistory,
}) => {
  const getIcon = (likelihood: number) => {
    if (likelihood > 0.75) {
      return <CheckCircle className="w-4 h-4 text-green-500 mr-1" />;
    } else if (likelihood > 0.5) {
      return <AlertTriangle className="w-4 h-4 text-yellow-500 mr-1" />;
    } else {
      return <Info className="w-4 h-4 text-gray-500 mr-1" />;
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("ManoMed AI - Diagnosis Report", 14, 22);
    doc.setFontSize(12);

    let y = 30;
    doc.text(`Symptoms: ${symptoms}`, 14, y);
    y += 10;
    doc.text(`Medical History: ${medicalHistory}`, 14, y);
    y += 15;

    conditions.forEach((condition, i) => {
      doc.setFontSize(14);
      doc.text(`${i + 1}. ${condition.condition}`, 14, y);
      doc.setFontSize(12);
      y += 8;
      doc.text(`Likelihood: ${(condition.likelihood * 100).toFixed(2)}%`, 14, y);
      y += 8;
      const description = condition.description || "No description available.";
      const splitDescription = doc.splitTextToSize(description, 180);
      doc.text(`Description:`, 14, y);
      y += 6;
      doc.text(splitDescription, 14, y);
      y += splitDescription.length * 6 + 4;
    });

    doc.save("diagnosis-report.pdf");
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-primary">Potential Conditions</h2>
      {conditions.length > 0 ? (
        <>
          <div className="grid gap-6">
            {conditions.map((condition, index) => (
              <Card key={index} className="shadow-md rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    {condition.condition}
                  </CardTitle>
                  <CardDescription>
                    Likelihood:
                    <Badge variant="secondary" className="ml-1">
                      {(condition.likelihood * 100).toFixed(2)}%
                    </Badge>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center mb-2">
                    {getIcon(condition.likelihood)}
                    <span className="ml-1">
                      {condition.description || "No description available."}
                    </span>
                  </div>
                  <Button
                    variant="link"
                    className="text-sm p-0 mt-2"
                    onClick={() =>
                      window.open(
                        `https://www.webmd.com/search/search_results/default.aspx?query=${encodeURIComponent(condition.condition)}`,
                        "_blank"
                      )
                    }
                  >
                    Learn more on WebMD →
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <Button onClick={generatePDF} className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Download Report (PDF)
            </Button>
          </div>
        </>
      ) : (
        <p>No potential conditions found.</p>
      )}
    </div>
  );
};
