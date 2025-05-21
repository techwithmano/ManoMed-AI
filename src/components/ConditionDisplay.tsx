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
    const margin = 50; // Increased margin
    const bleed = 10; // Added bleed area
    const contentWidth = width - (margin * 2);
    let cursorY = margin;

    // Typography and color definitions
    const fonts = {
      heading: 'helvetica',
      body: 'helvetica',
      monospace: 'courier'
    };

    const weights = {
      regular: 'normal',
      medium: 'bold',
      bold: 'bold'
    };

    const colors = {
      primary: '#1a365d',    // Darker blue for headers
      secondary: '#2d3748',  // Dark gray for body text
      accent: '#3182ce',     // Bright blue for links
      warning: '#c53030',    // Red for disclaimer
      background: '#f7fafc', // Lighter background
      border: '#e2e8f0'      // Border color
    };

    const spacing = {
      section: 40,    // Space between major sections
      paragraph: 20,  // Space between paragraphs
      line: 18,       // Line height
      element: 10     // Space between related elements
    };

    // Font sizes (reduced by 5pt)
    const fontSizes = {
      coverTitle: 35,     // was 40
      coverSubtitle: 19,  // was 24
      coverInfo: 11,      // was 16
      sectionTitle: 19,   // was 24
      bodyText: 9,        // was 14
      footer: 6,          // was 11
    };

    // --- Header / Footer setup ---
    const footer = (page: number, totalPages: number) => {
      // Add separator line
      doc.setDrawColor(colors.border);
      doc.setLineWidth(0.5);
      doc.line(margin, height - 40, width - margin, height - 40);
      
      doc.setFontSize(fontSizes.footer);
      doc.setTextColor(colors.secondary);
      const footerText = `Page ${page} of ${totalPages} | ManoMed AI Report | Generated: ${new Date().toLocaleString()}`;
      doc.text(footerText, width / 2, height - 25, { align: 'center' });
    };

    // Cover Page ---
    doc.setFillColor(colors.background);
    doc.rect(0, 0, width, height, 'F');
    
    // Add logo or icon
    doc.setFont(fonts.heading, weights.bold);
    doc.setFontSize(fontSizes.coverTitle);
    doc.setTextColor(colors.primary);
    doc.text('ManoMed AI', width/2, height/2 - 60, { align: 'center' });
    
    doc.setFontSize(fontSizes.coverSubtitle);
    doc.text('Comprehensive Medical Analysis Report', width/2, height/2 - 20, { align: 'center' });
    
    doc.setFontSize(fontSizes.coverInfo);
    doc.text(`Patient: ${name}`, width/2, height/2 + 20, { align: 'center' });
    doc.text(`Date: ${new Date().toLocaleDateString()}`, width/2, height/2 + 50, { align: 'center' });
    
    // Add a decorative line
    doc.setDrawColor(colors.accent);
    doc.setLineWidth(2);
    doc.line(margin, height/2 + 80, width - margin, height/2 + 80);
    
    doc.addPage();

    // Table of Contents ---
    doc.setFont(fonts.heading, weights.bold);
    doc.setFontSize(fontSizes.sectionTitle);
    doc.setTextColor(colors.primary);
    doc.text('Table of Contents', margin, cursorY);
    cursorY += spacing.section;
    
    const toc = [
      { title: 'Patient Information', page: 3 },
      { title: 'Symptoms & History', page: 4 },
      { title: 'Q&A Session', page: 5 },
      { title: 'Analysis Results', page: 6 },
      { title: 'Recommendations', page: 7 },
      { title: 'Disclaimer', page: 8 },
    ];
    
    doc.setFont(fonts.body, weights.regular);
    doc.setFontSize(fontSizes.bodyText);
    doc.setTextColor(colors.secondary);
    toc.forEach((item, idx) => {
      const pageNumWidth = 30;
      const titleWidth = width - margin * 2 - pageNumWidth;
      
      // Title
      doc.text(`${idx + 1}. ${item.title}`, margin, cursorY);
      
      // Page number
      doc.text(item.page.toString(), width - margin - pageNumWidth, cursorY);
      
      // Dots
      const dots = '.'.repeat(Math.floor((titleWidth - doc.getTextWidth(item.title)) / 5));
      doc.text(dots, margin + doc.getTextWidth(`${idx + 1}. ${item.title}`), cursorY);
      
      cursorY += spacing.line;
    });
    doc.addPage();
    cursorY = margin;

    // Patient Information ---
    doc.setFont(fonts.heading, weights.bold);
    doc.setFontSize(fontSizes.sectionTitle);
    doc.setTextColor(colors.primary);
    doc.text('1. Patient Information', margin, cursorY);
    cursorY += spacing.section;
    
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
        cellPadding: 8,
        fontSize: fontSizes.bodyText,
        textColor: colors.secondary,
        lineColor: colors.border,
        lineWidth: 0.5,
        font: fonts.body,
        fontStyle: weights.regular
      },
      columnStyles: { 
        0: { fontStyle: weights.bold, cellWidth: 150, textColor: colors.primary }, 
        1: { cellWidth: width - margin*2 - 150 } 
      }
    });
    cursorY = (doc as any).lastAutoTable.finalY + spacing.section;

    // Symptoms & Medical History ---
    doc.setFont(fonts.heading, weights.bold);
    doc.setFontSize(fontSizes.sectionTitle);
    doc.setTextColor(colors.primary);
    doc.text('2. Symptoms & History', margin, cursorY);
    cursorY += spacing.section;
    
    autoTable(doc, {
      startY: cursorY,
      margin: { left: margin, right: margin },
      theme: 'grid',
      body: [
        ['Reported Symptoms', symptoms],
        ['Medical History', medicalHistory || 'None provided'],
      ],
      styles: { 
        cellPadding: 8,
        fontSize: fontSizes.bodyText,
        textColor: colors.secondary,
        lineColor: colors.border,
        lineWidth: 0.5,
        font: fonts.body,
        fontStyle: weights.regular
      },
      columnStyles: { 
        0: { fontStyle: weights.bold, cellWidth: 150, textColor: colors.primary }, 
        1: { cellWidth: width - margin*2 - 150 } 
      }
    });
    cursorY = (doc as any).lastAutoTable.finalY + spacing.section;

    // Q&A Session ---
    doc.addPage();
    cursorY = margin;
    doc.setFont(fonts.heading, weights.bold);
    doc.setFontSize(fontSizes.sectionTitle);
    doc.setTextColor(colors.primary);
    doc.text('3. Q&A Session', margin, cursorY);
    cursorY += spacing.section;

    if (Array.isArray(questions) && Array.isArray(answers) && questions.length > 0 && answers.length > 0) {
      questions.forEach((question, index) => {
        const answer = answers[index] || 'No answer provided';
        
        // Question box
        doc.setFillColor(colors.background);
        doc.roundedRect(margin, cursorY - 10, width - margin * 2, 40, 3, 3, 'F');
        
        // Question
        doc.setTextColor(colors.primary);
        doc.setFont(fonts.body, weights.bold);
        doc.setFontSize(fontSizes.bodyText);
        const questionLines = doc.splitTextToSize(`Q${index + 1}: ${question}`, width - margin * 2 - 20);
        doc.text(questionLines, margin + 10, cursorY + 5);
        cursorY += (questionLines.length * spacing.line) + spacing.paragraph;
        
        // Answer
        doc.setTextColor(colors.secondary);
        doc.setFont(fonts.body, weights.regular);
        const answerLines = doc.splitTextToSize(answer, width - margin * 2 - 40);
        doc.text(answerLines, margin + 30, cursorY);
        cursorY += (answerLines.length * spacing.line) + spacing.section;
        
        if (cursorY > height - margin) {
          doc.addPage();
          cursorY = margin;
        }
      });
    } else {
      doc.setTextColor(colors.secondary);
      doc.text('No Q&A session data available', margin, cursorY);
      cursorY += spacing.section;
    }

    // Analysis Results ---
    doc.addPage();
    cursorY = margin;
    doc.setFont(fonts.heading, weights.bold);
    doc.setFontSize(fontSizes.sectionTitle);
    doc.setTextColor(colors.primary);
    doc.text('4. Analysis Results', margin, cursorY);
    cursorY += spacing.section;

    conditions.forEach((condition, index) => {
      const descriptionLines = doc.splitTextToSize(condition.description || '', width - margin * 2 - 40);
      const boxHeight = Math.max(40, descriptionLines.length * spacing.line + 20);
      
      // Condition box
      doc.setFillColor(colors.background);
      doc.roundedRect(margin, cursorY - 10, width - margin * 2, boxHeight, 3, 3, 'F');
      
      // Condition name
      doc.setTextColor(colors.primary);
      doc.setFont(fonts.body, weights.bold);
      doc.setFontSize(fontSizes.bodyText);
      doc.text(`Condition ${index + 1}: ${condition.condition}`, margin + 10, cursorY + 5);
      cursorY += spacing.line;

      // Likelihood
      doc.setTextColor(colors.secondary);
      doc.setFont(fonts.body, weights.regular);
      const likelihoodText = `Likelihood: ${(condition.likelihood * 100).toFixed(2)}%`;
      doc.text(likelihoodText, margin + 30, cursorY);
      cursorY += spacing.line;

      // Description
      if (condition.description) {
        doc.text(descriptionLines, margin + 30, cursorY);
        cursorY += (descriptionLines.length * spacing.line) + spacing.section;
      }

      if (cursorY > height - margin) {
        doc.addPage();
        cursorY = margin;
      }
    });

    // Recommendations ---
    doc.addPage();
    cursorY = margin;
    doc.setFont(fonts.heading, weights.bold);
    doc.setFontSize(fontSizes.sectionTitle);
    doc.setTextColor(colors.primary);
    doc.text('5. Recommendations', margin, cursorY);
    cursorY += spacing.section;
    
    const recommendations = [
      'Consult with a healthcare provider for professional medical advice',
      'Keep track of any changes in symptoms',
      'Follow up with recommended specialists if needed',
      'Maintain a record of medications and treatments',
      'Schedule regular check-ups as advised'
    ];
    
    doc.setFont(fonts.body, weights.regular);
    doc.setFontSize(fontSizes.bodyText);
    doc.setTextColor(colors.secondary);
    recommendations.forEach((rec, index) => {
      doc.text(`• ${rec}`, margin + 20, cursorY);
      cursorY += spacing.line;
    });

    // Disclaimer ---
    doc.addPage();
    cursorY = margin;
    doc.setFont(fonts.heading, weights.bold);
    doc.setFontSize(fontSizes.sectionTitle);
    doc.setTextColor(colors.warning);
    doc.text('6. Disclaimer', margin, cursorY);
    cursorY += spacing.section;
    
    doc.setFont(fonts.body, weights.regular);
    doc.setFontSize(fontSizes.bodyText);
    doc.setTextColor(colors.secondary);
    const disclaimer = [
      'This report is generated by ManoMed AI and is not a substitute for professional medical advice.',
      'Always consult a qualified healthcare provider for proper diagnosis and treatment.',
      'The information provided in this report is based on the symptoms and information provided by the patient.',
      'ManoMed AI is not responsible for any decisions made based on this report.'
    ];
    
    disclaimer.forEach((text, index) => {
      const lines = doc.splitTextToSize(text, width - margin * 2);
      doc.text(lines, margin, cursorY);
      cursorY += (lines.length * spacing.line) + spacing.paragraph;
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
    <div className="w-4/5 mx-auto">
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
