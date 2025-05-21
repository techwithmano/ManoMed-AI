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
  // Add debugging logs
  console.log('ConditionDisplay received Q&A data:', {
    questionsLength: questions?.length,
    answersLength: answers?.length,
    questions,
    answers
  });

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
    // Add debugging logs at start of PDF generation
    console.log('Starting PDF generation with Q&A data:', {
      questionsLength: questions?.length,
      answersLength: answers?.length,
      questions,
      answers
    });

    const doc = new jsPDF("portrait", "pt", "a4");
    const width = doc.internal.pageSize.getWidth();
    const height = doc.internal.pageSize.getHeight();
    const margin = 40;
    let cursorY = margin;

    // --- Header / Footer setup ---
    const footer = (page: number, totalPages: number) => {
      doc.setFontSize(10);
      const footerText = `Page ${page} of ${totalPages} | ManoMed AI Report | Generated: ${new Date().toLocaleString()}`;
      doc.text(footerText, width / 2, height - 20, { align: 'center' });
    };

    // Cover Page ---
    doc.setFillColor('#f0f4f8');
    doc.rect(0, 0, width, height, 'F');
    
    // Add logo or icon
    doc.setFontSize(40);
    doc.setTextColor('#2980b9');
    doc.text('ManoMed AI', width/2, height/2 - 60, { align: 'center' });
    
    doc.setFontSize(24);
    doc.setTextColor('#2c3e50');
    doc.text('Comprehensive Medical Analysis Report', width/2, height/2 - 20, { align: 'center' });
    
    doc.setFontSize(16);
    doc.text(`Patient: ${name}`, width/2, height/2 + 20, { align: 'center' });
    doc.text(`Date: ${new Date().toLocaleDateString()}`, width/2, height/2 + 50, { align: 'center' });
    
    // Add a decorative line
    doc.setDrawColor('#2980b9');
    doc.setLineWidth(2);
    doc.line(margin, height/2 + 80, width - margin, height/2 + 80);
    
    doc.addPage();

    // Table of Contents ---
    doc.setFontSize(24).setTextColor('#34495e');
    doc.text('Table of Contents', margin, cursorY);
    cursorY += 40;
    
    const toc = [
      { title: 'Patient Information', page: 3 },
      { title: 'Symptoms & History', page: 4 },
      { title: 'Q&A Session', page: 5 },
      { title: 'Analysis Results', page: 6 },
      { title: 'Recommendations', page: 7 },
      { title: 'Disclaimer', page: 8 },
    ];
    
    doc.setFontSize(12).setTextColor('#2c3e50');
    toc.forEach((item, idx) => {
      const dots = '.'.repeat(50);
      const text = `${idx + 1}. ${item.title} ${dots} ${item.page}`;
      doc.text(text, margin, cursorY);
      cursorY += 25;
    });
    doc.addPage();
    cursorY = margin;

    // Patient Information ---
    doc.setFontSize(20).setTextColor('#16a085');
    doc.text('1. Patient Information', margin, cursorY);
    cursorY += 30;
    
    const info = [
      ['Name', name],
      ['Age', age],
      ['Gender', gender],
      ['Email', email],
      ['Report Date', new Date().toLocaleDateString()],
    ];
    
    autoTable(doc, {
      startY: cursorY,
      margin: { left: margin, right: margin },
      theme: 'grid',
      body: info,
      styles: { 
        cellPadding: 6, 
        fontSize: 12, 
        textColor: '#2c3e50',
        lineColor: '#e0e0e0',
        lineWidth: 0.5
      },
      columnStyles: { 
        0: { fontStyle: 'bold', cellWidth: 150, textColor: '#2980b9' }, 
        1: { cellWidth: width - margin*2 - 150 } 
      }
    });
    cursorY = (doc as any).lastAutoTable.finalY + 30;

    // Symptoms & Medical History ---
    doc.setFontSize(20).setTextColor('#16a085');
    doc.text('2. Symptoms & History', margin, cursorY);
    cursorY += 30;
    
    autoTable(doc, {
      startY: cursorY,
      margin: { left: margin, right: margin },
      theme: 'grid',
      body: [
        ['Reported Symptoms', symptoms],
        ['Medical History', medicalHistory || 'None provided'],
      ],
      styles: { 
        cellPadding: 6, 
        fontSize: 12, 
        textColor: '#2c3e50',
        lineColor: '#e0e0e0',
        lineWidth: 0.5
      },
      columnStyles: { 
        0: { fontStyle: 'bold', cellWidth: 150, textColor: '#2980b9' }, 
        1: { cellWidth: width - margin*2 - 150 } 
      }
    });
    cursorY = (doc as any).lastAutoTable.finalY + 30;

    // Q&A Session ---
    doc.addPage();
    cursorY = margin;
    doc.setFontSize(20).setTextColor('#16a085');
    doc.text('3. Q&A Session', margin, cursorY);
    cursorY += 30;

    if (Array.isArray(questions) && Array.isArray(answers) && questions.length > 0 && answers.length > 0) {
      questions.forEach((question, index) => {
        const answer = answers[index] || 'No answer provided';
        
        // Question box
        doc.setFillColor('#f8f9fa');
        doc.roundedRect(margin, cursorY - 10, width - margin * 2, 30, 3, 3, 'F');
        
        // Question
        doc.setTextColor('#2980b9');
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        const questionLines = doc.splitTextToSize(`Q${index + 1}: ${question}`, width - margin * 2 - 20);
        doc.text(questionLines, margin + 10, cursorY + 5);
        cursorY += (questionLines.length * 15) + 20;
        
        // Answer
        doc.setTextColor('#2c3e50');
        doc.setFont('helvetica', 'normal');
        const answerLines = doc.splitTextToSize(answer, width - margin * 2 - 40);
        doc.text(answerLines, margin + 30, cursorY);
        cursorY += (answerLines.length * 15) + 30;
        
        if (cursorY > height - margin) {
          doc.addPage();
          cursorY = margin;
        }
      });
    } else {
      doc.setTextColor('#666');
      doc.text('No Q&A session data available', margin, cursorY);
      cursorY += 30;
    }

    // Analysis Results ---
    doc.addPage();
    cursorY = margin;
    doc.setFontSize(20).setTextColor('#16a085');
    doc.text('4. Analysis Results', margin, cursorY);
    cursorY += 30;

    conditions.forEach((condition, index) => {
      // Condition box
      doc.setFillColor('#f8f9fa');
      doc.roundedRect(margin, cursorY - 10, width - margin * 2, 40, 3, 3, 'F');
      
      // Condition name
      doc.setTextColor('#2980b9');
      doc.setFont('helvetica', 'bold');
      doc.text(`Condition ${index + 1}: ${condition.condition}`, margin + 10, cursorY + 5);
      cursorY += 25;

      // Likelihood
      doc.setTextColor('#2c3e50');
      doc.setFont('helvetica', 'normal');
      const likelihoodText = `Likelihood: ${(condition.likelihood * 100).toFixed(2)}%`;
      doc.text(likelihoodText, margin + 30, cursorY);
      cursorY += 20;

      // Description
      if (condition.description) {
        const descriptionLines = doc.splitTextToSize(condition.description, width - margin * 2 - 40);
        doc.text(descriptionLines, margin + 30, cursorY);
        cursorY += (descriptionLines.length * 15) + 30;
      }

      if (cursorY > height - margin) {
        doc.addPage();
        cursorY = margin;
      }
    });

    // Recommendations ---
    doc.addPage();
    cursorY = margin;
    doc.setFontSize(20).setTextColor('#16a085');
    doc.text('5. Recommendations', margin, cursorY);
    cursorY += 30;
    
    const recommendations = [
      'Consult with a healthcare provider for professional medical advice',
      'Keep track of any changes in symptoms',
      'Follow up with recommended specialists if needed',
      'Maintain a record of medications and treatments',
      'Schedule regular check-ups as advised'
    ];
    
    recommendations.forEach((rec, index) => {
      doc.setFontSize(12);
      doc.text(`• ${rec}`, margin + 20, cursorY);
      cursorY += 20;
    });

    // Disclaimer ---
    doc.addPage();
    cursorY = margin;
    doc.setFontSize(20).setTextColor('#c0392b');
    doc.text('6. Disclaimer', margin, cursorY);
    cursorY += 30;
    
    doc.setFontSize(12).setTextColor('#2c3e50');
    const disclaimer = [
      'This report is generated by ManoMed AI and is not a substitute for professional medical advice.',
      'Always consult a qualified healthcare provider for proper diagnosis and treatment.',
      'The information provided in this report is based on the symptoms and information provided by the patient.',
      'ManoMed AI is not responsible for any decisions made based on this report.'
    ];
    
    disclaimer.forEach((text, index) => {
      const lines = doc.splitTextToSize(text, width - margin * 2);
      doc.text(lines, margin, cursorY);
      cursorY += (lines.length * 15) + 10;
    });

    // Add page numbers to all pages
    const pages = doc.getNumberOfPages();
    for (let i = 1; i <= pages; i++) {
      doc.setPage(i);
      footer(i, pages);
    }

    doc.save(`ManoMed-AI-Report-${name}-${new Date().toISOString().split('T')[0]}.pdf`);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-primary">Potential Conditions</h2>
        {conditions.length > 0 && (
          <Button
            onClick={generatePDF}
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download Report
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
