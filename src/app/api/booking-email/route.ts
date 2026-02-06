import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// Generate ICS calendar invite content
function generateICSContent({
  title,
  description,
  startTime,
  endTime,
  mentorName,
  mentorEmail,
  menteeName,
  menteeEmail,
  sessionId,
}: {
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  mentorName: string;
  mentorEmail: string;
  menteeName: string;
  menteeEmail: string;
  sessionId: string;
}): string {
  const formatDate = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const uid = `${sessionId}@chaichathub.com`;
  const now = formatDate(new Date());

  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Chai Chat//Mentorship Session//EN
CALSCALE:GREGORIAN
METHOD:REQUEST
BEGIN:VEVENT
UID:${uid}
DTSTAMP:${now}
DTSTART:${formatDate(startTime)}
DTEND:${formatDate(endTime)}
SUMMARY:${title}
DESCRIPTION:${description.replace(/\n/g, '\\n')}
ORGANIZER;CN=Chai Chat:mailto:noreply@chaichathub.com
ATTENDEE;CN=${mentorName};RSVP=TRUE:mailto:${mentorEmail}
ATTENDEE;CN=${menteeName};RSVP=TRUE:mailto:${menteeEmail}
STATUS:CONFIRMED
SEQUENCE:0
END:VEVENT
END:VCALENDAR`;
}

// Send email via Brevo API
async function sendBrevoEmail({
  to,
  toName,
  subject,
  htmlContent,
  textContent,
  icsContent,
}: {
  to: string;
  toName: string;
  subject: string;
  htmlContent: string;
  textContent: string;
  icsContent?: string;
}) {
  const apiKey = process.env.BREVO_API_KEY;

  if (!apiKey) {
    throw new Error('BREVO_API_KEY not configured');
  }

  const emailData: Record<string, unknown> = {
    sender: {
      name: process.env.BREVO_FROM_NAME || 'Chai Chat',
      email: process.env.BREVO_FROM_EMAIL || 'noreply@chaichathub.com',
    },
    to: [{ email: to, name: toName }],
    subject,
    htmlContent,
    textContent,
  };

  // Add calendar invite as attachment if provided
  if (icsContent) {
    emailData.attachment = [
      {
        name: 'invite.ics',
        content: Buffer.from(icsContent).toString('base64'),
      },
    ];
  }

  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'api-key': apiKey,
      'content-type': 'application/json',
    },
    body: JSON.stringify(emailData),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Brevo API error: ${error}`);
  }

  return response.json();
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      mentorName,
      mentorEmail,
      menteeName,
      menteeEmail,
      sessionDate,
      sessionTime,
      sessionDuration = 30,
      sessionId,
      topic = 'Mentorship Session',
      meetingLink, // Optional: Zoom, Google Meet, Teams, or Calendly link
    } = body;

    // Validate required fields
    if (!mentorName || !mentorEmail || !menteeName || !menteeEmail || !sessionDate || !sessionTime) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Parse session date and time
    const startTime = new Date(`${sessionDate}T${sessionTime}`);
    const endTime = new Date(startTime.getTime() + sessionDuration * 60 * 1000);

    // Generate calendar invite with meeting link if provided
    const calendarDescription = meetingLink
      ? `Mentorship session between ${mentorName} and ${menteeName}.\n\nTopic: ${topic}\n\nJoin Meeting: ${meetingLink}\n\nOr view in Dashboard: https://chaichathub.com/dashboard`
      : `Mentorship session between ${mentorName} and ${menteeName}.\n\nTopic: ${topic}\n\nJoin via Chai Chat Dashboard: https://chaichathub.com/dashboard`;

    const icsContent = generateICSContent({
      title: `Chai Chat: ${topic}`,
      description: calendarDescription,
      startTime,
      endTime,
      mentorName,
      mentorEmail,
      menteeName,
      menteeEmail,
      sessionId: sessionId || `session-${Date.now()}`,
    });

    // Format date for display
    const formattedDate = startTime.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const formattedTime = startTime.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });

    // Email template for mentor (no emojis - clean professional design)
    const mentorHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #14b8a6, #0d9488); padding: 30px; border-radius: 12px 12px 0 0; text-align: center; }
    .header h1 { color: white; margin: 0; font-size: 24px; }
    .content { background: #f8fafc; padding: 30px; border-radius: 0 0 12px 12px; }
    .session-card { background: white; border-radius: 8px; padding: 20px; margin: 20px 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
    .session-detail { display: flex; margin: 10px 0; }
    .session-label { color: #64748b; width: 100px; font-weight: 500; }
    .session-value { color: #1e293b; font-weight: 500; }
    .button { display: inline-block; background: #14b8a6; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; margin-top: 20px; }
    .footer { text-align: center; color: #64748b; font-size: 12px; margin-top: 30px; }
    .note { background: #e0f2fe; border-radius: 8px; padding: 12px; margin-top: 16px; color: #0369a1; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Mentorship Session Booked</h1>
    </div>
    <div class="content">
      <p>Hi ${mentorName},</p>
      <p><strong>${menteeName}</strong> has booked a mentorship session with you!</p>
      
      <div class="session-card">
        <div class="session-detail">
          <span class="session-label">Date</span>
          <span class="session-value">${formattedDate}</span>
        </div>
        <div class="session-detail">
          <span class="session-label">Time</span>
          <span class="session-value">${formattedTime}</span>
        </div>
        <div class="session-detail">
          <span class="session-label">Duration</span>
          <span class="session-value">${sessionDuration} minutes</span>
        </div>
        <div class="session-detail">
          <span class="session-label">Topic</span>
          <span class="session-value">${topic}</span>
        </div>
      </div>
      ${meetingLink ? `
      <div class="session-card" style="background: #f0fdfa; border: 1px solid #14b8a6;">
        <p style="margin: 0 0 10px 0; font-weight: 600; color: #0d9488;">Join Meeting</p>
        <a href="${meetingLink}" style="color: #0d9488; word-break: break-all;">${meetingLink}</a>
      </div>` : ''}
      
      <div class="note">
        A calendar invite is attached to this email. Click to add it to your calendar.
      </div>
      
      <center>
        ${meetingLink
        ? `<a href="${meetingLink}" class="button">Join Meeting</a>
             <br/><br/>
             <a href="https://chaichathub.com/dashboard/sessions" style="color: #14b8a6;">View in Dashboard</a>`
        : `<a href="https://chaichathub.com/dashboard/sessions" class="button">View in Dashboard</a>`}
      </center>
      
      <div class="footer">
        <p>Chai Chat &mdash; Where Sonder Becomes Connection</p>
        <p>You're receiving this because you're a mentor on Chai Chat.</p>
      </div>
    </div>
  </div>
</body>
</html>`;

    // Email template for mentee (no emojis - clean professional design)
    const menteeHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #14b8a6, #0d9488); padding: 30px; border-radius: 12px 12px 0 0; text-align: center; }
    .header h1 { color: white; margin: 0; font-size: 24px; }
    .content { background: #f8fafc; padding: 30px; border-radius: 0 0 12px 12px; }
    .session-card { background: white; border-radius: 8px; padding: 20px; margin: 20px 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
    .session-detail { display: flex; margin: 10px 0; }
    .session-label { color: #64748b; width: 100px; font-weight: 500; }
    .session-value { color: #1e293b; font-weight: 500; }
    .button { display: inline-block; background: #14b8a6; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; margin-top: 20px; }
    .footer { text-align: center; color: #64748b; font-size: 12px; margin-top: 30px; }
    .note { background: #e0f2fe; border-radius: 8px; padding: 12px; margin-top: 16px; color: #0369a1; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Your Session is Confirmed!</h1>
    </div>
    <div class="content">
      <p>Hi ${menteeName},</p>
      <p>Great news! Your mentorship session with <strong>${mentorName}</strong> is confirmed!</p>
      
      <div class="session-card">
        <div class="session-detail">
          <span class="session-label">Date</span>
          <span class="session-value">${formattedDate}</span>
        </div>
        <div class="session-detail">
          <span class="session-label">Time</span>
          <span class="session-value">${formattedTime}</span>
        </div>
        <div class="session-detail">
          <span class="session-label">Duration</span>
          <span class="session-value">${sessionDuration} minutes</span>
        </div>
        <div class="session-detail">
          <span class="session-label">Mentor</span>
          <span class="session-value">${mentorName}</span>
        </div>
        <div class="session-detail">
          <span class="session-label">Topic</span>
          <span class="session-value">${topic}</span>
        </div>
      </div>
      ${meetingLink ? `
      <div class="session-card" style="background: #f0fdfa; border: 1px solid #14b8a6;">
        <p style="margin: 0 0 10px 0; font-weight: 600; color: #0d9488;">Join Meeting</p>
        <a href="${meetingLink}" style="color: #0d9488; word-break: break-all;">${meetingLink}</a>
      </div>` : ''}
      
      <div class="note">
        A calendar invite is attached to this email. Click to add it to your calendar.
      </div>
      
      <center>
        ${meetingLink
        ? `<a href="${meetingLink}" class="button">Join Meeting</a>
             <br/><br/>
             <a href="https://chaichathub.com/dashboard/sessions" style="color: #14b8a6;">View in Dashboard</a>`
        : `<a href="https://chaichathub.com/dashboard/sessions" class="button">View in Dashboard</a>`}
      </center>
      
      <div class="footer">
        <p>Chai Chat &mdash; Where Sonder Becomes Connection</p>
        <p>We're excited to be part of your journey!</p>
      </div>
    </div>
  </div>
</body>
</html>`;

    // Plain text versions
    const mentorText = `New Mentorship Session Booked

Hi ${mentorName},

${menteeName} has booked a mentorship session with you!

Session Details:
- Date: ${formattedDate}
- Time: ${formattedTime}
- Duration: ${sessionDuration} minutes
- Topic: ${topic}
${meetingLink ? `
Join Meeting: ${meetingLink}` : ''}

A calendar invite is attached to this email.

View in Dashboard: https://chaichathub.com/dashboard/sessions

---
Chai Chat - Where Sonder Becomes Connection`;

    const menteeText = `Your Session is Confirmed!

Hi ${menteeName},

Your mentorship session with ${mentorName} is confirmed!

Session Details:
- Date: ${formattedDate}
- Time: ${formattedTime}
- Duration: ${sessionDuration} minutes
- Mentor: ${mentorName}
- Topic: ${topic}
${meetingLink ? `
Join Meeting: ${meetingLink}` : ''}

A calendar invite is attached to this email.

View in Dashboard: https://chaichathub.com/dashboard/sessions

---
Chai Chat - Where Sonder Becomes Connection`;

    // Send emails (no emojis in subject lines)
    const [mentorResult, menteeResult] = await Promise.all([
      sendBrevoEmail({
        to: mentorEmail,
        toName: mentorName,
        subject: `New Session: ${menteeName} booked ${formattedDate}`,
        htmlContent: mentorHtml,
        textContent: mentorText,
        icsContent,
      }),
      sendBrevoEmail({
        to: menteeEmail,
        toName: menteeName,
        subject: `Session Confirmed with ${mentorName} - ${formattedDate}`,
        htmlContent: menteeHtml,
        textContent: menteeText,
        icsContent,
      }),
    ]);

    return NextResponse.json({
      success: true,
      message: 'Booking emails sent successfully',
      mentorEmailId: mentorResult.messageId,
      menteeEmailId: menteeResult.messageId,
    });

  } catch (error) {
    console.error('Booking email error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to send booking emails' },
      { status: 500 }
    );
  }
}
