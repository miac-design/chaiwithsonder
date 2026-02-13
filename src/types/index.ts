// ChaiChat Hub — Shared TypeScript Types
// All domain types used across the application

export interface Mentor {
    name: string;
    title: string;
    photo: string;
    calendly: string;
    linkedin: string;
    hours?: number;
    sessions?: number;
    rating?: number;
    tags?: string[];
    available?: boolean;
}

export interface BadgeDefinition {
    name: string;
    icon: React.ReactNode;
    description: string;
    check: (mentor: Mentor) => boolean;
}

export interface MentorFormData {
    name: string;
    email: string;
    expertise: string;
    experience: string;
    availability: string;
    goals: string;
}

export interface NavItem {
    name: string;
    href?: string;
    dropdown?: boolean;
}
