import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// POST /api/mentors: Submit a new mentor application
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, email, expertise, experience, availability, goals } = body;

        // Basic validation
        if (!name || !email || !expertise) {
            return NextResponse.json(
                { error: 'Name, email, and expertise are required.' },
                { status: 400 }
            );
        }

        const { data, error } = await (supabase as any)
            .from('mentor_applications')
            .insert({ name, email, expertise, experience, availability, goals, status: 'pending' })
            .select()
            .single();

        if (error) {
            console.error('Supabase insert error:', error);
            return NextResponse.json(
                { error: 'Failed to save application. Please try again.' },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { message: 'Application submitted successfully', data },
            { status: 201 }
        );
    } catch (error) {
        console.error('Mentor application error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// GET /api/mentors: Fetch approved mentors
export async function GET() {
    try {
        const { data, error } = await (supabase as any)
            .from('mentors')
            .select('*')
            .eq('status', 'approved')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Supabase fetch error:', error);
            return NextResponse.json(
                { error: 'Failed to fetch mentors.' },
                { status: 500 }
            );
        }

        return NextResponse.json({ data }, { status: 200 });
    } catch (error) {
        console.error('Fetch mentors error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
