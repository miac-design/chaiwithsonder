/**
 * Reminder Service - Smart Session Reminders
 * Handles scheduling and sending reminder notifications
 */

// Reminder types
export type ReminderType = '24h' | '1h' | '15min' | 'follow_up';

export interface SessionReminder {
  sessionId: string;
  userId: string;
  userEmail: string;
  userName: string;
  partnerName: string;
  sessionTopic: string;
  scheduledFor: Date;
  reminderType: ReminderType;
  meetingUrl?: string;
}

// Email templates
function get24HourReminderEmail(reminder: SessionReminder): { subject: string; html: string } {
  const sessionDate = reminder.scheduledFor.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
  const sessionTime = reminder.scheduledFor.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });

  return {
    subject: `Reminder: Session with ${reminder.partnerName} tomorrow`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #0D9488, #14B8A6); color: white; padding: 30px; border-radius: 16px 16px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 16px 16px; }
            .button { display: inline-block; background: #0D9488; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; margin-top: 20px; }
            .session-card { background: white; padding: 20px; border-radius: 12px; margin: 20px 0; border-left: 4px solid #0D9488; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">Session Reminder</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">Your mentoring session is coming up!</p>
            </div>
            <div class="content">
              <p>Hi ${reminder.userName},</p>
              <p>This is a friendly reminder that you have a session scheduled for <strong>tomorrow</strong>.</p>
              
              <div class="session-card">
                <h3 style="margin: 0 0 10px 0;">${reminder.sessionTopic}</h3>
                <p style="margin: 5px 0;"><strong>With:</strong> ${reminder.partnerName}</p>
                <p style="margin: 5px 0;"><strong>When:</strong> ${sessionDate} at ${sessionTime}</p>
              </div>
              
              <p>Take a moment to:</p>
              <ul>
                <li>Review any notes from previous sessions</li>
                <li>Prepare questions or topics to discuss</li>
                <li>Test your camera and microphone</li>
              </ul>
              
              ${reminder.meetingUrl ? `<a href="${reminder.meetingUrl}" class="button">Join Session →</a>` : ''}
              
              <p style="margin-top: 30px; color: #6b7280; font-size: 14px;">
                — The ChaiChat Team
              </p>
            </div>
          </div>
        </body>
      </html>
    `,
  };
}

function get1HourReminderEmail(reminder: SessionReminder): { subject: string; html: string } {
  const sessionTime = reminder.scheduledFor.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });

  return {
    subject: `Your session with ${reminder.partnerName} starts in 1 hour!`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #F59E0B, #FBBF24); color: white; padding: 30px; border-radius: 16px 16px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 16px 16px; }
            .button { display: inline-block; background: #0D9488; color: white; padding: 16px 32px; border-radius: 8px; text-decoration: none; margin-top: 20px; font-weight: bold; font-size: 16px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">1 Hour to Go!</h1>
            </div>
            <div class="content">
              <p>Hi ${reminder.userName},</p>
              <p>Your session with <strong>${reminder.partnerName}</strong> starts at <strong>${sessionTime}</strong>.</p>
              <p>Topic: <em>${reminder.sessionTopic}</em></p>
              
              ${reminder.meetingUrl ? `<a href="${reminder.meetingUrl}" class="button">Join Video Call →</a>` : ''}
              
              <p style="margin-top: 30px; color: #6b7280; font-size: 14px;">
                See you soon!
              </p>
            </div>
          </div>
        </body>
      </html>
    `,
  };
}

function get15MinReminderEmail(reminder: SessionReminder): { subject: string; html: string } {
  return {
    subject: `Starting NOW: Session with ${reminder.partnerName}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; text-align: center; }
            .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
            .button { display: inline-block; background: #0D9488; color: white; padding: 20px 40px; border-radius: 12px; text-decoration: none; font-weight: bold; font-size: 18px; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Your session starts in 15 minutes!</h1>
            <p style="font-size: 18px;">${reminder.sessionTopic}</p>
            <p>With: <strong>${reminder.partnerName}</strong></p>
            
            ${reminder.meetingUrl ? `<a href="${reminder.meetingUrl}" class="button">Join Now →</a>` : ''}
          </div>
        </body>
      </html>
    `,
  };
}

function getFollowUpEmail(reminder: SessionReminder): { subject: string; html: string } {
  return {
    subject: `How was your session with ${reminder.partnerName}?`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #0D9488, #14B8A6); color: white; padding: 30px; border-radius: 16px 16px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 16px 16px; }
            .button { display: inline-block; background: #0D9488; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; margin: 10px 5px; }
            .stars { font-size: 30px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">Session Complete!</h1>
            </div>
            <div class="content">
              <p>Hi ${reminder.userName},</p>
              <p>We hope your session with <strong>${reminder.partnerName}</strong> was valuable!</p>
              
              <p><strong>Topic:</strong> ${reminder.sessionTopic}</p>
              
              <p style="margin-top: 20px;">We'd love to hear how it went. Your feedback helps us improve ChaiChat for everyone.</p>
              
              <div class="stars">★★★★★</div>
              
              <a href="https://chaichathub.com/dashboard/sessions" class="button">Leave Feedback →</a>
              
              <p style="margin-top: 30px; color: #6b7280; font-size: 14px;">
                Thank you for being part of our community!
              </p>
            </div>
          </div>
        </body>
      </html>
    `,
  };
}

// Send reminder email using fetch (no external dependency)
export async function sendReminderEmail(reminder: SessionReminder): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'noreply@chaichathub.com';

  if (!apiKey) {
    console.log('RESEND_API_KEY not configured, skipping email');
    return false;
  }

  let emailContent: { subject: string; html: string };

  switch (reminder.reminderType) {
    case '24h':
      emailContent = get24HourReminderEmail(reminder);
      break;
    case '1h':
      emailContent = get1HourReminderEmail(reminder);
      break;
    case '15min':
      emailContent = get15MinReminderEmail(reminder);
      break;
    case 'follow_up':
      emailContent = getFollowUpEmail(reminder);
      break;
    default:
      emailContent = get24HourReminderEmail(reminder);
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `ChaiChat <${fromEmail}>`,
        to: reminder.userEmail,
        subject: emailContent.subject,
        html: emailContent.html,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Resend API error:', error);
      return false;
    }

    console.log(`Sent ${reminder.reminderType} reminder to ${reminder.userEmail}`);
    return true;
  } catch (error) {
    console.error('Failed to send reminder email:', error);
    return false;
  }
}

// Calculate reminder times for a session
export function calculateReminderTimes(sessionTime: Date): Record<ReminderType, Date> {
  return {
    '24h': new Date(sessionTime.getTime() - 24 * 60 * 60 * 1000),
    '1h': new Date(sessionTime.getTime() - 60 * 60 * 1000),
    '15min': new Date(sessionTime.getTime() - 15 * 60 * 1000),
    'follow_up': new Date(sessionTime.getTime() + 60 * 60 * 1000), // 1 hour after
  };
}

// Check which reminders should be sent now
export function getRemindersToSend(
  sessionTime: Date,
  sentReminders: ReminderType[]
): ReminderType[] {
  const now = new Date();
  const times = calculateReminderTimes(sessionTime);
  const toSend: ReminderType[] = [];

  for (const [type, time] of Object.entries(times) as [ReminderType, Date][]) {
    if (!sentReminders.includes(type) && now >= time) {
      toSend.push(type);
    }
  }

  return toSend;
}
