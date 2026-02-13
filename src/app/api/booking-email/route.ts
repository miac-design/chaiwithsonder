import { NextRequest, NextResponse } from 'next/server';

// POST /api/booking-email — Send booking confirmation email
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { mentorName, menteeName, menteeEmail, mentorEmail, scheduledDate, sessionType } = body;

        // Basic validation
        if (!mentorName || !menteeName || !menteeEmail || !scheduledDate) {
            return NextResponse.json(
                { error: 'mentorName, menteeName, menteeEmail, and scheduledDate are required.' },
                { status: 400 }
            );
        }

        // TODO: Connect to Brevo/Resend to send booking confirmation emails
        // Send to mentee
        // await sendEmail({
        //   to: menteeEmail,
        //   template: 'booking_confirmation_mentee',
        //   params: { mentorName, scheduledDate, sessionType }
        // });

        // Send to mentor
        // await sendEmail({
        //   to: mentorEmail,
        //   template: 'booking_confirmation_mentor',
        //   params: { menteeName, scheduledDate, sessionType }
        // });

        // TODO: Create ICS calendar event
        // const icsContent = generateICS({ mentorName, menteeName, scheduledDate, sessionType });

        // TODO: Log booking in Supabase
        // await supabase.from('bookings').insert({
        //   mentor_name: mentorName,
        //   mentee_name: menteeName,
        //   mentee_email: menteeEmail,
        //   scheduled_date: scheduledDate,
        //   session_type: sessionType,
        //   status: 'confirmed'
        // });

        return NextResponse.json(
            {
                message: 'Booking confirmation sent successfully',
                data: { mentorName, menteeName, scheduledDate, sessionType }
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Booking email error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
