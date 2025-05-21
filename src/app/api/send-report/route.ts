import { NextResponse } from 'next/server';
import * as SendGrid from '@sendgrid/mail';

// Initialize SendGrid with API key
SendGrid.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST(request: Request) {
  try {
    console.log('Starting email send process...');
    const { pdfData, patientName } = await request.json();
    console.log('Received request for patient:', patientName);

    // Verify environment variables
    if (!process.env.SENDGRID_API_KEY) {
      console.error('SENDGRID_API_KEY is not set');
      throw new Error('SENDGRID_API_KEY is not configured');
    }
    if (!process.env.RECIPIENT_EMAIL) {
      console.error('RECIPIENT_EMAIL is not set');
      throw new Error('RECIPIENT_EMAIL is not configured');
    }
    if (!process.env.SENDER_EMAIL) {
      console.error('SENDER_EMAIL is not set');
      throw new Error('SENDER_EMAIL is not configured');
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
    return NextResponse.json(
      { success: false, message: 'Failed to send report', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 