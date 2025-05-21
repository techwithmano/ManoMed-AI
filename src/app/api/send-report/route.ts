import { NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

// Initialize SendGrid with API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST(request: Request) {
  try {
    const { pdfData, patientName } = await request.json();

    // Create email message
    const msg = {
      to: process.env.RECIPIENT_EMAIL!,
      from: process.env.SENDER_EMAIL!,
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

    // Send email
    await sgMail.send(msg);

    return NextResponse.json({ success: true, message: 'Report sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send report' },
      { status: 500 }
    );
  }
} 