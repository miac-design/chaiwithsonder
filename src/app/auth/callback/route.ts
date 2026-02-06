import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get('code');

    if (code) {
        await supabase.auth.exchangeCodeForSession(code);
    }

    // Redirect to dashboard - the dashboard will check onboarding status
    return NextResponse.redirect(new URL('/dashboard', request.url));
}
