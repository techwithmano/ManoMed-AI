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
      return <CheckCircle className="w-4 h-4 text-green-500 mr-1" />;
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

    // --- Header / Footer setup ---
    const footer = (page: number, totalPages: number) => {
      doc.setFontSize(10);
      const footerText = `Page ${page} of ${totalPages}`;
      doc.text(footerText, width / 2, height - 20, { align: 'center' });
    };

    // Cover Page ---
    doc.setFillColor('#f0f4f8');
    doc.rect(0, 0, width, height, 'F');
    doc.setFontSize(30);
    doc.setTextColor('#2c3e50');
    doc.text('ManoMed AI', width/2, height/2 - 40, { align: 'center' });
    doc.setFontSize(16);
    doc.text('Comprehensive Medical Analysis Report', width/2, height/2, { align: 'center' });
    doc.setFontSize(12);
    doc.text(`Generated: ${new Date().toLocaleString()}`, width/2, height/2 + 30, { align: 'center' });
    doc.addPage();

    // Table of Contents ---
    doc.setFontSize(18).setTextColor('#34495e');
    doc.text('Table of Contents', margin, cursorY);
    cursorY += 30;
    const toc = [
      '1. Patient Information',
      '2. Symptoms & History',
      '3. Q&A Session',
      '4. Analysis Results',
      '5. Disclaimer',
    ];
    doc.setFontSize(12).setTextColor('#2c3e50');
    toc.forEach((item, idx) => {
      doc.text(`${idx+1}. ${item}`, margin + 10, cursorY);
      cursorY += 20;
    });
    doc.addPage();
    cursorY = margin;

    // Patient Information ---
    doc.setFontSize(16).setTextColor('#16a085');
    doc.text('1. Patient Information', margin, cursorY);
    cursorY += 25;
    doc.setFontSize(12).setTextColor('#2c3e50');
    const info = [
      ['Name', name],
      ['Age', age],
      ['Gender', gender],
      ['Email', email],
    ];
    autoTable(doc, {
      startY: cursorY,
      margin: { left: margin, right: margin },
      theme: 'grid',
      head: [['Field', 'Detail']],
      body: info,
      styles: { cellPadding: 4, fontSize: 12 },
      headStyles: { fillColor: '#16a085', textColor: 255 },
    });
    cursorY = (doc as any).lastAutoTable.finalY + 30;

    // Symptoms & Medical History ---
    doc.setFontSize(16).setTextColor('#16a085');
    doc.text('2. Symptoms & History', margin, cursorY);
    cursorY += 25;
    doc.setFontSize(12).setTextColor('#2c3e50');
    autoTable(doc, {
      startY: cursorY,
      margin: { left: margin, right: margin },
      theme: 'plain',
      body: [
        ['Reported Symptoms', symptoms],
        ['Medical History', medicalHistory || 'None provided'],
      ],
      styles: { cellPadding: 4, fontSize: 12, textColor: '#2c3e50' },
      columnStyles: { 0: { fontStyle: 'bold', cellWidth: 150 }, 1: { cellWidth: width - margin*2 - 150 } }
    });
    cursorY = (doc as any).lastAutoTable.finalY + 30;

    // Q&A Session ---
    doc.addPage();
    cursorY = margin;
    doc.setFontSize(16).setTextColor('#16a085');
    doc.text('3. Q&A Session', margin, cursorY);
    cursorY += 25;
    doc.setFontSize(12).setTextColor('#2c3e50');
    const qaBody = questions.map((q, i) => [`Q${i+1}: ${q}`, `A${i+1}: ${answers[i]}`]);
    autoTable(doc, {
      startY: cursorY,
      margin: { left: margin, right: margin },
      head: [],
      body: qaBody,
      styles: { cellPadding: 4, fontSize: 12 },
      alternateRowStyles: { fillColor: '#ecf0f1' }
    });
    cursorY = (doc as any).lastAutoTable.finalY + 30;

    // Analysis Results ---
    doc.addPage();
    cursorY = margin;
    doc.setFontSize(16).setTextColor('#16a085');
    doc.text('4. Analysis Results', margin, cursorY);
    cursorY += 25;
    const resultRows = conditions.map((c, idx) => [
      `${idx+1}`,
      c.condition,
      (c.likelihood * 100).toFixed(2) + '%',
      c.description || 'No description.'
    ]);
    autoTable(doc, {
      startY: cursorY,
      margin: { left: margin, right: margin },
      head: [['#', 'Condition', 'Likelihood', 'Description']],
      body: resultRows,
      styles: { cellPadding: 4, fontSize: 10 },
      headStyles: { fillColor: '#2980b9', textColor: 255 }
    });

    // Disclaimer ---
    doc.addPage();
    cursorY = margin;
    doc.setFontSize(14).setTextColor('#c0392b');
    doc.text('5. Disclaimer', margin, cursorY);
    cursorY += 20;
    doc.setFontSize(10).setTextColor('#2c3e50');
    const disclaimer = `This report is generated by ManoMed AI and is not a substitute for professional medical advice. Always consult a qualified healthcare provider.`;
    doc.text(doc.splitTextToSize(disclaimer, width - margin*2), margin, cursorY);

    // Add page numbers to all pages
    const pages = doc.getNumberOfPages();
    for (let i = 1; i <= pages; i++) {
      doc.setPage(i);
      footer(i, pages);
    }

    doc.save("manomed-ai-report.pdf");
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-primary">Potential Conditions</h2>
        {conditions.length > 0 && (
          <Button onClick={generatePDF} className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Download Complete Report (PDF)
          </Button>
        )}
      </div>
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
        </>
      ) : (
        <p>No potential conditions found.</p>
      )}
    </div>
  );
};
