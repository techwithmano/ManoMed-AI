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
import autoTable from "jspdf-autotable";

interface ConditionDisplayProps {
  conditions: SymptomAnalysisOutput;
  name: string;
  age: string;
  gender: string;
  email: string;
  symptoms: string;
  medicalHistory: string;
  questions: string[];
  answers: string[];
}

export const ConditionDisplay: React.FC<ConditionDisplayProps> = ({
  conditions,
  name,
  age,
  gender,
  email,
  symptoms,
  medicalHistory,
  questions,
  answers,
}) => {
  const getIcon = (likelihood: number) => {
    if (likelihood > 0.75) {
      return <CheckCircle className="w-4 h-4 text-blue-500 mr-1" />;
    } else if (likelihood > 0.5) {
      return <AlertTriangle className="w-4 h-4 text-yellow-500 mr-1" />;
    } else {
      return <Info className="w-4 h-4 text-gray-500 mr-1" />;
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF("portrait", "pt", "a4");
    const width = doc.internal.pageSize.getWidth();
    const height = doc.internal.pageSize.getHeight();
    const margin = 40;
    let cursorY = margin;

    // Header/Footer
    const footer = (page: number, totalPages: number) => {
      doc.setFontSize(10);
      doc.setTextColor("#555");
      doc.text(`Page ${page} of ${totalPages}`, width / 2, height - 20, { align: 'center' });
    };

    // Cover
    doc.setFillColor('#e3f2fd');
    doc.rect(0, 0, width, height, 'F');
    doc.setFontSize(32);
    doc.setTextColor('#1e3a8a');
    doc.text('ManoMed AI', width / 2, height / 2 - 40, { align: 'center' });
    doc.setFontSize(18);
    doc.text('Comprehensive Medical Analysis Report', width / 2, height / 2, { align: 'center' });
    doc.setFontSize(12);
    doc.text(`Generated: ${new Date().toLocaleString()}`, width / 2, height / 2 + 30, { align: 'center' });
    doc.addPage();

    // TOC
    doc.setFontSize(20).setTextColor('#1e40af');
    doc.text('Table of Contents', margin, cursorY);
    cursorY += 30;
    const toc = [
      '1. Patient Information',
      '2. Symptoms & History',
      '3. Q&A Session',
      '4. Analysis Results',
      '5. Disclaimer',
    ];
    doc.setFontSize(12).setTextColor('#333');
    toc.forEach((item, idx) => {
      doc.text(`${idx + 1}. ${item}`, margin + 10, cursorY);
      cursorY += 20;
    });
    doc.addPage();
    cursorY = margin;

    // Patient Info
    doc.setFontSize(16).setTextColor('#1e40af');
    doc.text('1. Patient Information', margin, cursorY);
    cursorY += 25;
    doc.setFontSize(12).setTextColor('#333');
    autoTable(doc, {
      startY: cursorY,
      margin: { left: margin, right: margin },
      theme: 'grid',
      head: [['Field', 'Detail']],
      body: [
        ['Name', name],
        ['Age', age],
        ['Gender', gender],
        ['Email', email],
      ],
      headStyles: { fillColor: '#2563eb', textColor: 255 },
      styles: { cellPadding: 4, fontSize: 12 },
    });
    cursorY = (doc as any).lastAutoTable.finalY + 30;

    // Symptoms & History
    doc.setFontSize(16).setTextColor('#1e40af');
    doc.text('2. Symptoms & History', margin, cursorY);
    cursorY += 25;
    autoTable(doc, {
      startY: cursorY,
      margin: { left: margin, right: margin },
      theme: 'plain',
      body: [
        ['Reported Symptoms', symptoms],
        ['Medical History', medicalHistory || 'None provided'],
      ],
      columnStyles: { 0: { cellWidth: 150, fontStyle: 'bold' }, 1: { cellWidth: width - margin * 2 - 150 } },
      styles: { cellPadding: 4, fontSize: 12, textColor: '#333' },
    });
    cursorY = (doc as any).lastAutoTable.finalY + 30;

    // Q&A
    doc.addPage();
    cursorY = margin;
    doc.setFontSize(16).setTextColor('#1e40af');
    doc.text('3. Q&A Session', margin, cursorY);
    cursorY += 25;
    const qaRows = questions.map((q, i) => [`Q${i + 1}: ${q}`, `A${i + 1}: ${answers[i]}`]);
    autoTable(doc, {
      startY: cursorY,
      margin: { left: margin, right: margin },
      head: [],
      body: qaRows,
      styles: { cellPadding: 4, fontSize: 12 },
      alternateRowStyles: { fillColor: '#f3f4f6' },
    });
    cursorY = (doc as any).lastAutoTable.finalY + 30;

    // Analysis Results
    doc.addPage();
    cursorY = margin;
    doc.setFontSize(16).setTextColor('#1e40af');
    doc.text('4. Analysis Results', margin, cursorY);
    cursorY += 25;
    const resultRows = conditions.map((c, idx) => [
      `${idx + 1}`,
      c.condition,
      `${(c.likelihood * 100).toFixed(2)}%`,
      c.description || 'No description available.',
    ]);
    autoTable(doc, {
      startY: cursorY,
      margin: { left: margin, right: margin },
      head: [['#', 'Condition', 'Likelihood', 'Description']],
      body: resultRows,
      headStyles: { fillColor: '#3b82f6', textColor: 255 },
      styles: { cellPadding: 4, fontSize: 10 },
    });

    // Disclaimer
    doc.addPage();
    cursorY = margin;
    doc.setFontSize(14).setTextColor('#b91c1c');
    doc.text('5. Disclaimer', margin, cursorY);
    cursorY += 20;
    const disclaimer =
      'This report is generated by ManoMed AI and is not a substitute for professional medical advice. Always consult a qualified healthcare provider.';
    doc.setFontSize(10).setTextColor('#333');
    doc.text(doc.splitTextToSize(disclaimer, width - margin * 2), margin, cursorY);

    // Page numbers
    const totalPages = doc.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      footer(i, totalPages);
    }

    doc.save('manomed-ai-report.pdf');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-blue-600">Potential Conditions</h2>
        {conditions.length > 0 && (
          <Button onClick={generatePDF} className="flex items-center gap-2">
            <Download className="w-4 h-4 text-blue-600" />
            <span className="text-blue-600">Download Report</span>
          </Button>
        )}
      </div>
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
                  <Badge variant="secondary" className="ml-1">
                    {(condition.likelihood * 100).toFixed(2)}%
                  </Badge>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-2">
                  {getIcon(condition.likelihood)}
                  <span className="ml-1 text-gray-700">
                    {condition.description || 'No description available.'}
                  </span>
                </div>
                <Button
                  variant="link"
                  className="text-sm p-0 mt-2 text-blue-600"
                  onClick={() =>
                    window.open(
                      `https://www.webmd.com/search/search_results/default.aspx?query=${encodeURIComponent(
                        condition.condition
                      )}`,
                      '_blank'
                    )
                  }
                >
                  Learn more on WebMD →
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No potential conditions found.</p>
      )}
    </div>
  );
};
