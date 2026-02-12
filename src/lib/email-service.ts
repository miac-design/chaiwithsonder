/**
 * Email Notification Service - Resend Integration
 * 
 * SETUP REQUIRED:
 * 1. Create a Resend account at https://resend.com
 * 2. Verify your domain or use the test domain
 * 3. Get your API key from Resend dashboard
 * 4. Add RESEND_API_KEY to your .env.local
 * 5. Add RESEND_FROM_EMAIL to your .env.local
 */

const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'ChaiChat <noreply@chaichathub.com>';

interface EmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
}

interface EmailResult {
  success: boolean;
  id?: string;
  error?: string;
}

// Send an email via Resend
export async function sendEmail(options: EmailOptions): Promise<EmailResult> {
  if (!RESEND_API_KEY) {
    console.warn('Resend API key not configured');
    return { success: false, error: 'Email service not configured' };
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: Array.isArray(options.to) ? options.to : [options.to],
        subject: options.subject,
        html: options.html,
        reply_to: options.replyTo,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error);
    }

    const data = await response.json();
    return { success: true, id: data.id };
  } catch (error) {
    console.error('Email send error:', error);
    return { success: false, error: String(error) };
  }
}

// Email Templates

export function welcomeEmail(userName: string): EmailOptions['html'] {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #10B981, #059669); padding: 30px; text-align: center; border-radius: 12px 12px 0 0; }
        .header h1 { color: white; margin: 0; font-size: 28px; }
        .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 12px 12px; }
        .button { display: inline-block; background: #10B981; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Welcome to ChaiChat!</h1>
        </div>
        <div class="content">
          <h2>Hello ${userName}!</h2>
          <p>Welcome to ChaiChat, where sonder becomes connection. We're thrilled to have you join our mentorship community.</p>
          <p>Here's what you can do:</p>
          <ul>
            <li><strong>Find a Mentor:</strong> Connect with experienced guides who understand your journey</li>
            <li><strong>Become a Mentor:</strong> Share your wisdom and make a meaningful impact</li>
            <li><strong>Schedule Sessions:</strong> Book 1-on-1 conversations at your convenience</li>
          </ul>
          <p style="text-align: center; margin-top: 30px;">
            <a href="https://chaichathub.com/mentor" class="button">Explore Mentors</a>
          </p>
        </div>
        <div class="footer">
          <p>Sonder. Connect. Grow.</p>
          <p>ChaiChat Hub • A nonprofit mentorship community</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function conversationRequestEmail(mentorName: string, menteeName: string): EmailOptions['html'] {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #10B981, #059669); padding: 30px; text-align: center; border-radius: 12px 12px 0 0; }
        .header h1 { color: white; margin: 0; font-size: 24px; }
        .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 12px 12px; }
        .highlight { background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #10B981; margin: 20px 0; }
        .button { display: inline-block; background: #10B981; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Conversation Request</h1>
        </div>
        <div class="content">
          <h2>Hi ${mentorName}!</h2>
          <div class="highlight">
            <strong>${menteeName}</strong> would like to connect with you for mentorship.
          </div>
          <p>Someone is reaching out because they believe you can make a difference in their journey. Take a moment to review their profile and accept the conversation to start chatting.</p>
          <p style="text-align: center; margin-top: 30px;">
            <a href="https://chaichathub.com/dashboard/messages" class="button">View Request</a>
          </p>
        </div>
        <div class="footer">
          <p>Sonder. Connect. Grow.</p>
          <p>ChaiChat Hub • A nonprofit mentorship community</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function sessionReminderEmail(userName: string, mentorName: string, sessionTime: string, meetingUrl?: string): EmailOptions['html'] {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #3B82F6, #2563EB); padding: 30px; text-align: center; border-radius: 12px 12px 0 0; }
        .header h1 { color: white; margin: 0; font-size: 24px; }
        .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 12px 12px; }
        .session-card { background: white; padding: 24px; border-radius: 12px; text-align: center; margin: 20px 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
        .session-time { font-size: 24px; font-weight: 700; color: #3B82F6; }
        .button { display: inline-block; background: #3B82F6; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Session Reminder</h1>
        </div>
        <div class="content">
          <h2>Hi ${userName}!</h2>
          <p>Just a friendly reminder about your upcoming mentoring session:</p>
          <div class="session-card">
            <p style="margin: 0; color: #666;">Session with</p>
            <p style="margin: 5px 0; font-size: 20px; font-weight: 600;">${mentorName}</p>
            <p class="session-time">${sessionTime}</p>
          </div>
          ${meetingUrl ? `
            <p style="text-align: center; margin-top: 30px;">
              <a href="${meetingUrl}" class="button">Join Session</a>
            </p>
          ` : ''}
          <p style="color: #666; font-size: 14px; margin-top: 20px;">
            <strong>Tips for your session:</strong>
            <br>• Come prepared with questions or topics
            <br>• Test your audio/video beforehand
            <br>• Find a quiet space for the conversation
          </p>
        </div>
        <div class="footer">
          <p>Sonder. Connect. Grow.</p>
          <p>ChaiChat Hub • A nonprofit mentorship community</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function sessionFeedbackEmail(userName: string, mentorName: string): EmailOptions['html'] {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #10B981, #059669); padding: 30px; text-align: center; border-radius: 12px 12px 0 0; }
        .header h1 { color: white; margin: 0; font-size: 24px; }
        .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 12px 12px; }
        .button { display: inline-block; background: #10B981; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>How was your session?</h1>
        </div>
        <div class="content">
          <h2>Hi ${userName}!</h2>
          <p>We hope you had a great conversation with <strong>${mentorName}</strong>!</p>
          <p>Your feedback helps us improve the ChaiChat experience and helps mentors grow. Would you take 30 seconds to share your thoughts?</p>
          <p style="text-align: center; margin-top: 30px;">
            <a href="https://chaichathub.com/dashboard/feedback" class="button">Leave Feedback</a>
          </p>
        </div>
        <div class="footer">
          <p>Sonder. Connect. Grow.</p>
          <p>ChaiChat Hub • A nonprofit mentorship community</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

// Convenience functions for sending templated emails

export async function sendWelcomeEmail(email: string, userName: string): Promise<EmailResult> {
  return sendEmail({
    to: email,
    subject: 'Welcome to ChaiChat!',
    html: welcomeEmail(userName),
  });
}

export async function sendConversationRequestEmail(
  mentorEmail: string,
  mentorName: string,
  menteeName: string
): Promise<EmailResult> {
  return sendEmail({
    to: mentorEmail,
    subject: `${menteeName} wants to connect with you on ChaiChat`,
    html: conversationRequestEmail(mentorName, menteeName),
  });
}

export async function sendSessionReminderEmail(
  email: string,
  userName: string,
  mentorName: string,
  sessionTime: string,
  meetingUrl?: string
): Promise<EmailResult> {
  return sendEmail({
    to: email,
    subject: `Reminder: Session with ${mentorName} coming up`,
    html: sessionReminderEmail(userName, mentorName, sessionTime, meetingUrl),
  });
}

export async function sendFeedbackRequestEmail(
  email: string,
  userName: string,
  mentorName: string
): Promise<EmailResult> {
  return sendEmail({
    to: email,
    subject: `How was your session with ${mentorName}?`,
    html: sessionFeedbackEmail(userName, mentorName),
  });
}
