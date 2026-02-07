import { NextResponse } from 'next/server';
import { computeMatchScores, type MatchIntake, type MentorProfile } from '@/lib/sonder-match-engine';

/**
 * POST /api/match
 * 
 * Accepts intake data and runs the 3-tier Sonder Match engine.
 * Currently works against hardcoded mentor data (same as mentor page).
 * When Supabase profiles are fully migrated, this will switch to DB queries.
 */

// Hardcoded mentor data (mirrors mentor/page.tsx)
const MENTORS: MentorProfile[] = [
    {
        id: 'hamed-alikhani',
        name: 'Hamed Alikhani, PhD',
        title: 'Gen AI Expert',
        photo: '/team/hamed.jpg',
        linkedin: 'https://www.linkedin.com/in/hamedalikhani/',
        story: "I came to the US in 2014 with $200 and a dream. Happy to share what I've learned.",
        specialties: ['Career', 'Visa', 'AI/ML'],
        chaisShared: 47,
        growth_stage: 'senior',
        communication_style: 'storyteller',
    },
    {
        id: 'moein-razavi',
        name: 'Moein Razavi, PhD',
        title: 'Gen AI Expert',
        photo: '/team/moein.jpg',
        linkedin: 'https://www.linkedin.com/in/moeinrazavi/',
        story: "Navigated the PhD journey and tech transition — love helping others do the same.",
        specialties: ['Academia', 'AI/ML', 'Career'],
        chaisShared: 32,
        growth_stage: 'senior',
        communication_style: 'structured',
    },
    {
        id: 'reza-haghighi',
        name: 'Reza Haghighi, MS',
        title: 'Sr. Platform Engineer',
        photo: '/team/reza.jpg',
        linkedin: 'https://www.linkedin.com/in/rezahaghighi/',
        story: "Engineering is about solving puzzles — I love sharing those aha moments.",
        specialties: ['Tech', 'Career'],
        chaisShared: 18,
        growth_stage: 'mid_career',
        communication_style: 'casual',
    },
    {
        id: 'parisa-ghane',
        name: 'Parisa Ghane, PhD',
        title: 'Sr. Consultant',
        photo: '/team/parisa.jpg',
        linkedin: 'https://www.linkedin.com/in/parisaghane/',
        story: "From research to consulting — happy to chat about making that leap.",
        specialties: ['Consulting', 'Career'],
        chaisShared: 21,
        growth_stage: 'mid_career',
        communication_style: 'structured',
    },
    {
        id: 'alireza-tahsini',
        name: 'Alireza Tahsini, MS',
        title: 'Sr. Software Engineer',
        photo: '/team/alireza.jpg',
        linkedin: 'https://www.linkedin.com/in/alirezatahsini/',
        story: "Building great software starts with great conversations.",
        specialties: ['Tech', 'Resume'],
        chaisShared: 15,
        growth_stage: 'mid_career',
        communication_style: 'direct',
    },
    {
        id: 'monica-far',
        name: 'Monica Far',
        title: 'Amazon Sales Leader',
        photo: '/team/monica-far.jpg',
        linkedin: 'https://www.linkedin.com/in/monicafar/',
        story: "Sales is about connection first — let's chat about breaking into big tech.",
        specialties: ['Sales', 'Big Tech', 'Career'],
        chaisShared: 28,
        growth_stage: 'senior',
        communication_style: 'casual',
    },
    {
        id: 'bita-shirazi',
        name: 'Bita Shirazi',
        title: 'Amazon Finance Manager',
        photo: '/team/bita.jpg',
        linkedin: 'https://www.linkedin.com/in/bitashirazi/',
        story: "Numbers tell stories — I help people write their own financial chapter.",
        specialties: ['Finance', 'Big Tech'],
        chaisShared: 19,
        growth_stage: 'mid_career',
        communication_style: 'analytical',
    },
    {
        id: 'reza-piri',
        name: 'Reza Piri',
        title: 'Productbot Founder',
        photo: '/team/rezapiri.jpg',
        linkedin: 'https://www.linkedin.com/in/rezapiri/',
        story: "Started from zero, built a company. Happy to share the founder journey.",
        specialties: ['Startup', 'Product'],
        chaisShared: 24,
        growth_stage: 'senior',
        communication_style: 'storyteller',
    },
    {
        id: 'meysam-gamini',
        name: 'Meysam Gamini',
        title: 'Principal Software Engineer',
        photo: '/team/meysam.jpg',
        linkedin: 'https://www.linkedin.com/in/meysamgamini/',
        story: "Engineering leadership is a skill you can learn — let me help.",
        specialties: ['Tech', 'Leadership'],
        chaisShared: 31,
        growth_stage: 'senior',
        communication_style: 'direct',
    },
    {
        id: 'ali-rezajoo',
        name: 'Ali Rezajoo',
        title: 'Senior Product Manager',
        photo: '/team/alirezajoo.jpg',
        linkedin: 'https://www.linkedin.com/in/alirezajoo/',
        story: "Transitioned from engineering to PM — happy to guide your pivot.",
        specialties: ['Product', 'Career'],
        chaisShared: 22,
        growth_stage: 'mid_career',
        communication_style: 'structured',
    },
    {
        id: 'ramin-jahedi',
        name: 'Ramin Jahedi',
        title: 'Black Ops Agency CEO',
        photo: '/team/ramin.jpg',
        linkedin: 'https://www.linkedin.com/in/raminjahedi/',
        story: "Built an agency from scratch. Let's talk entrepreneurship.",
        specialties: ['Startup', 'Marketing'],
        chaisShared: 16,
        growth_stage: 'senior',
        communication_style: 'casual',
    },
    {
        id: 'ramin-komeili',
        name: 'Ramin Komeili',
        title: 'Senior Traffic/Transportation Engineer',
        photo: '/team/ramin-komeili.jpg',
        linkedin: 'https://www.linkedin.com/in/raminkomeili/',
        story: "Engineering meets urban planning — a unique path worth exploring.",
        specialties: ['Engineering', 'Career'],
        chaisShared: 12,
        growth_stage: 'mid_career',
        communication_style: 'structured',
    },
    {
        id: 'amin-rashidi',
        name: 'Amin Rashidi',
        title: 'Lead Data Engineer',
        photo: '/team/amin.jpg',
        linkedin: 'https://www.linkedin.com/in/aminrashidi/',
        story: "Data engineering is the backbone of AI. Let's talk pipelines.",
        specialties: ['Data', 'Tech'],
        chaisShared: 27,
        growth_stage: 'mid_career',
        communication_style: 'analytical',
    },
];

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const intake: MatchIntake = {
            desired_flavor: body.desired_flavor,
            career_stage: body.career_stage,
            current_challenge: body.current_challenge,
            support_style: body.support_style,
            preferred_vibe: body.preferred_vibe,
            additional_context: body.additional_context,
        };

        // Validate required fields
        if (!intake.desired_flavor || !intake.career_stage || !intake.preferred_vibe) {
            return NextResponse.json(
                { error: 'Missing required fields: desired_flavor, career_stage, preferred_vibe' },
                { status: 400 }
            );
        }

        // Run the 3-tier engine
        const results = computeMatchScores(MENTORS, intake);

        // Return top matches
        return NextResponse.json({
            matches: results.map(r => ({
                mentor_id: r.mentor.id,
                name: r.mentor.name,
                title: r.mentor.title,
                photo: r.mentor.photo,
                linkedin: r.mentor.linkedin,
                story: r.mentor.story,
                specialties: r.mentor.specialties,
                chaisShared: r.mentor.chaisShared,
                total_score: r.total_score,
                expertise_score: r.expertise_score,
                stage_score: r.stage_score,
                engagement_score: r.engagement_score,
                style_score: r.style_score,
                story_score: r.story_score,
                match_reasons: r.match_reasons,
            })),
            total_eligible: results.length,
        });
    } catch (error) {
        console.error('Match API error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
