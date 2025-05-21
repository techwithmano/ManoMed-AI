import { NextResponse } from 'next/server';
import * as SendGrid from '@sendgrid/mail';

// Initialize SendGrid with API key
SendGrid.setApiKey(process.env.SENDGRID_API_KEY!);

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
    if (!process.env.SENDGRID_API_KEY) {
      console.error('SENDGRID_API_KEY is not set');
      return NextResponse.json(
        { success: false, message: 'Email service is not configured' },
        { status: 500 }
      );
    }
    if (!process.env.RECIPIENT_EMAIL) {
      console.error('RECIPIENT_EMAIL is not set');
      return NextResponse.json(
        { success: false, message: 'Recipient email is not configured' },
        { status: 500 }
      );
    }
    if (!process.env.SENDER_EMAIL) {
      console.error('SENDER_EMAIL is not set');
      return NextResponse.json(
        { success: false, message: 'Sender email is not configured' },
        { status: 500 }
      );
    }

    // Create email message
    const msg = {
      to: process.env.RECIPIENT_EMAIL,
      from: process.env.SENDER_EMAIL,
      subject: `ManoMed AI Report - ${patientName}`,
      text: `A new medical report has been generated for ${patientName}.`,
      attachments: [
        {
          content: pdfData,
          filename: `ManoMed-AI-Report-${patientName}-${new Date().toISOString().split('T')[0]}.pdf`,
          type: 'application/pdf',
          disposition: 'attachment'
        }
      ]
    };

    console.log('Attempting to send email to:', process.env.RECIPIENT_EMAIL);
    console.log('From email:', process.env.SENDER_EMAIL);

    // Send email
    const response = await SendGrid.send(msg);
    console.log('SendGrid response:', response);

    return NextResponse.json({ success: true, message: 'Report sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    // Log more details about the error
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    
    // Return a more detailed error response
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