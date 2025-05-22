import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    console.log('Starting email send process...');
    
    // Parse request body
    const body = await request.json();
    console.log('Request body received:', { 
      hasPdfData: !!body.pdfData,
      patientName: body.patientName,
      pdfDataLength: body.pdfData?.length
    });

    const { pdfData, patientName } = body;

    // Validate required fields
    if (!pdfData) {
      console.error('PDF data is missing');
      return NextResponse.json(
        { success: false, message: 'PDF data is required' },
        { status: 400 }
      );
    }

    if (!patientName) {
      console.error('Patient name is missing');
      return NextResponse.json(
        { success: false, message: 'Patient name is required' },
        { status: 400 }
      );
    }

    // Verify environment variables
    const recipientEmail = process.env.RECIPIENT_EMAIL;

    if (!recipientEmail) {
      console.error('RECIPIENT_EMAIL is not set');
      return NextResponse.json(
        { success: false, message: 'Recipient email is not configured' },
        { status: 500 }
      );
    }

    // Create email message using Resend's default sender domain
    const { data, error } = await resend.emails.send({
      from: 'ManoMed AI <onboarding@resend.dev>',
      to: recipientEmail,
      subject: `ManoMed AI Report - ${patientName}`,
      text: `A new medical report has been generated for ${patientName}.`,
      attachments: [
        {
          filename: `ManoMed-AI-Report-${patientName}-${new Date().toISOString().split('T')[0]}.pdf`,
          content: Buffer.from(pdfData, 'base64')
        }
      ]
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { 
          success: false, 
          message: 'Failed to send email',
          error: error.message
        },
        { status: 500 }
      );
    }

    console.log('Email sent successfully:', data);
    return NextResponse.json({ success: true, message: 'Report sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to send report',
        error: error instanceof Error ? error.message : 'Unknown error',
        details: error instanceof Error ? {
          name: error.name,
          message: error.message,
          stack: error.stack
        } : null
      },
      { status: 500 }
    );
  }
} 