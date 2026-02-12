import { NextRequest, NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

// POST /api/mentor-approval — Approve or reject a mentor application
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { applicationId, action, adminSecret } = body;

        // Verify admin secret
        if (adminSecret !== process.env.ADMIN_SECRET) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        if (!applicationId || !['approve', 'reject'].includes(action)) {
            return NextResponse.json(
                { error: 'applicationId and action (approve|reject) are required.' },
                { status: 400 }
            );
        }

        const newStatus = action === 'approve' ? 'approved' : 'rejected';

        // Update in Supabase if configured
        if (isSupabaseConfigured() && supabase) {
            const { data, error } = await supabase
                .from('mentor_applications')
                .update({ status: newStatus })
                .eq('id', applicationId)
                .select()
                .single();

            if (error) {
                console.error('Supabase update error:', error);
                return NextResponse.json(
                    { error: 'Failed to update application status.' },
                    { status: 500 }
                );
            }

            // If approved, create a mentor record from the application data
            if (action === 'approve' && data) {
                const { error: insertError } = await supabase
                    .from('mentors')
                    .insert({
                        name: data.name,
                        email: data.email,
                        expertise: data.expertise,
                        experience: data.experience,
                        availability: data.availability,
                        goals: data.goals,
                        status: 'approved',
                    });

                if (insertError) {
                    console.error('Mentor record creation error:', insertError);
                }
            }

            // TODO: Send email notification via Brevo/Resend
            // if (action === 'approve') {
            //   await sendEmail({ to: data.email, template: 'mentor_approved' });
            // } else {
            //   await sendEmail({ to: data.email, template: 'mentor_rejected' });
            // }

            return NextResponse.json(
                { message: `Mentor application ${action}d successfully`, data },
                { status: 200 }
            );
        }

        // Fallback: mock response when Supabase is not configured
        return NextResponse.json(
            { message: `Mentor application ${action}d successfully`, applicationId },
            { status: 200 }
        );
    } catch (error) {
        console.error('Mentor approval error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
