import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// Simple token for admin actions - in production, use proper auth
const ADMIN_SECRET = process.env.ADMIN_SECRET || 'chaichat-admin-2024';

// Send email via Brevo API
async function sendBrevoEmail({
    to,
    toName,
    subject,
    htmlContent,
    textContent,
}: {
    to: string;
    toName: string;
    subject: string;
    htmlContent: string;
    textContent: string;
}) {
    const apiKey = process.env.BREVO_API_KEY;

    if (!apiKey) {
        throw new Error('BREVO_API_KEY not configured');
    }

    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'api-key': apiKey,
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            sender: {
                name: process.env.BREVO_FROM_NAME || 'Chai Chat',
                email: process.env.BREVO_FROM_EMAIL || 'noreply@chaichathub.com',
            },
            to: [{ email: to, name: toName }],
            subject,
            htmlContent,
            textContent,
        }),
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`Brevo API error: ${error}`);
    }

    return response.json();
}

// POST: Approve a mentor application
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {
            adminSecret,
            mentorName,
            mentorEmail,
            specialization,
        } = body;

        // Validate admin secret
        if (adminSecret !== ADMIN_SECRET) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Validate required fields
        if (!mentorName || !mentorEmail) {
            return NextResponse.json(
                { error: 'Missing required fields: mentorName, mentorEmail' },
                { status: 400 }
            );
        }

        // Welcome email HTML template
        const welcomeHtml = `
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
    .highlight-card { background: white; border-radius: 8px; padding: 20px; margin: 20px 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
    .button { display: inline-block; background: #14b8a6; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; margin-top: 20px; }
    .footer { text-align: center; color: #64748b; font-size: 12px; margin-top: 30px; }
    .step { display: flex; align-items: flex-start; margin: 16px 0; }
    .step-number { background: #14b8a6; color: white; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600; flex-shrink: 0; margin-right: 12px; }
    .step-content { flex: 1; }
    .step-title { font-weight: 600; color: #1e293b; }
    .step-desc { color: #64748b; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Welcome to the Chai Chat Mentor Network!</h1>
    </div>
    <div class="content">
      <p>Hi ${mentorName},</p>
      <p>Congratulations! Your mentor application has been <strong>approved</strong>. You're now part of our community of mentors helping others through meaningful conversations.</p>
      
      <div class="highlight-card">
        <h3 style="margin-top: 0; color: #0d9488;">Getting Started</h3>
        
        <div class="step">
          <div class="step-number">1</div>
          <div class="step-content">
            <div class="step-title">Complete Your Profile</div>
            <div class="step-desc">Add your photo, bio, and expertise areas to help mentees find you.</div>
          </div>
        </div>
        
        <div class="step">
          <div class="step-number">2</div>
          <div class="step-content">
            <div class="step-title">Set Your Availability</div>
            <div class="step-desc">Use the "Go Live" feature or set regular office hours for scheduled sessions.</div>
          </div>
        </div>
        
        <div class="step">
          <div class="step-number">3</div>
          <div class="step-content">
            <div class="step-title">Add Your Meeting Link</div>
            <div class="step-desc">Connect your Zoom, Google Meet, or Calendly for seamless video sessions.</div>
          </div>
        </div>
        
        <div class="step">
          <div class="step-number">4</div>
          <div class="step-content">
            <div class="step-title">Start Mentoring!</div>
            <div class="step-desc">When mentees book sessions, you'll receive email notifications with all the details.</div>
          </div>
        </div>
      </div>
      
      <center>
        <a href="https://chaichathub.com/dashboard" class="button">Go to Your Dashboard</a>
      </center>
      
      <p style="margin-top: 30px;">We're excited to have you on board. Your experience and wisdom will make a real difference in someone's life.</p>
      
      <p>Have questions? Just reply to this email - we're here to help!</p>
      
      <div class="footer">
        <p>Chai Chat &mdash; Where Sonder Becomes Connection</p>
        <p>You're receiving this because you were approved as a mentor on Chai Chat.</p>
      </div>
    </div>
  </div>
</body>
</html>`;

        // Plain text version
        const welcomeText = `Welcome to the Chai Chat Mentor Network!

Hi ${mentorName},

Congratulations! Your mentor application has been approved. You're now part of our community of mentors helping others through meaningful conversations.

Getting Started:

1. Complete Your Profile
   Add your photo, bio, and expertise areas to help mentees find you.

2. Set Your Availability
   Use the "Go Live" feature or set regular office hours for scheduled sessions.

3. Add Your Meeting Link
   Connect your Zoom, Google Meet, or Calendly for seamless video sessions.

4. Start Mentoring!
   When mentees book sessions, you'll receive email notifications with all the details.

Go to your dashboard: https://chaichathub.com/dashboard

We're excited to have you on board. Your experience and wisdom will make a real difference in someone's life.

Have questions? Just reply to this email - we're here to help!

---
Chai Chat - Where Sonder Becomes Connection`;

        // Send welcome email
        await sendBrevoEmail({
            to: mentorEmail,
            toName: mentorName,
            subject: `Welcome to Chai Chat, ${mentorName}! You're now a mentor.`,
            htmlContent: welcomeHtml,
            textContent: welcomeText,
        });

        return NextResponse.json({
            success: true,
            message: `${mentorName} has been approved and welcome email sent to ${mentorEmail}`,
        });

    } catch (error) {
        console.error('Mentor approval error:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Failed to approve mentor' },
            { status: 500 }
        );
    }
}

// GET: Generate approval link (for admin use)
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const adminSecret = searchParams.get('secret');

    if (adminSecret !== ADMIN_SECRET) {
        return NextResponse.json(
            { error: 'Unauthorized' },
            { status: 401 }
        );
    }

    // Return instructions for using the API
    return NextResponse.json({
        message: 'Mentor Approval API',
        usage: {
            method: 'POST',
            endpoint: '/api/mentor-approval',
            body: {
                adminSecret: 'your-admin-secret',
                mentorName: 'Mentor Full Name',
                mentorEmail: 'mentor@example.com',
                specialization: 'optional - their area of expertise',
            },
        },
        example: `curl -X POST https://chaichathub.com/api/mentor-approval \\
  -H "Content-Type: application/json" \\
  -d '{"adminSecret":"${ADMIN_SECRET}","mentorName":"John Doe","mentorEmail":"john@example.com"}'`,
    });
}
