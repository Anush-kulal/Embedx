// import twilio from 'twilio';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { message, recipient } = await request.json();

    if (!message || !recipient) {
      return NextResponse.json(
        { error: 'Message and recipient phone number are required' },
        { status: 400 }
      );
    }

    // Mocking twilio response
    /*
    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    const twilioResponse = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: recipient,
    });
    */

    console.log('Mocked SMS send:', { message, recipient });
    return NextResponse.json({ success: true, sid: 'mock_sid_12345' });
  } catch (error) {
    console.error('Twilio Error:', error);
    return NextResponse.json(
      { error: 'Failed to send SMS alert', details: error.message },
      { status: 500 }
    );
  }
}
