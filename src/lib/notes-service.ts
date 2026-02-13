/**
 * Notes Service - Session Notes & Action Items
 * Handles CRUD operations for session notes, action items, and feedback
 */

import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createBrowserClient(supabaseUrl || 'https://placeholder.supabase.co', supabaseAnonKey || 'placeholder');

// Types
export interface SessionNote {
    id: string;
    session_id: string;
    author_id: string;
    content: string;
    is_private: boolean;
    created_at: string;
    updated_at: string;
}

export interface ActionItem {
    id: string;
    session_id: string;
    created_by: string;
    assigned_to?: string;
    content: string;
    is_completed: boolean;
    due_date?: string;
    created_at: string;
    completed_at?: string;
}

export interface SessionFeedback {
    id: string;
    session_id: string;
    author_id: string;
    rating: number;
    feedback_text?: string;
    would_recommend?: boolean;
    created_at: string;
}

// Session Notes CRUD
export async function getSessionNotes(sessionId: string): Promise<SessionNote[]> {
    const { data, error } = await supabase
        .from('session_notes')
        .select('*')
        .eq('session_id', sessionId)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching session notes:', error);
        return [];
    }

    return (data as SessionNote[]) || [];
}

export async function createSessionNote(
    sessionId: string,
    content: string,
    isPrivate: boolean = false
): Promise<SessionNote | null> {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) return null;

    const { data, error } = await supabase
        .from('session_notes')
        .insert({
            session_id: sessionId,
            author_id: userData.user.id,
            content,
            is_private: isPrivate,
        })
        .select()
        .single();

    if (error) {
        console.error('Error creating session note:', error);
        return null;
    }

    return data as SessionNote;
}

export async function updateSessionNote(
    noteId: string,
    content: string,
    isPrivate?: boolean
): Promise<SessionNote | null> {
    const updates: Partial<SessionNote> = {
        content,
        updated_at: new Date().toISOString(),
    };

    if (isPrivate !== undefined) {
        updates.is_private = isPrivate;
    }

    const { data, error } = await supabase
        .from('session_notes')
        .update(updates)
        .eq('id', noteId)
        .select()
        .single();

    if (error) {
        console.error('Error updating session note:', error);
        return null;
    }

    return data as SessionNote;
}

export async function deleteSessionNote(noteId: string): Promise<boolean> {
    const { error } = await supabase
        .from('session_notes')
        .delete()
        .eq('id', noteId);

    if (error) {
        console.error('Error deleting session note:', error);
        return false;
    }

    return true;
}

// Action Items CRUD
export async function getActionItems(sessionId: string): Promise<ActionItem[]> {
    const { data, error } = await supabase
        .from('action_items')
        .select('*')
        .eq('session_id', sessionId)
        .order('created_at', { ascending: true });

    if (error) {
        console.error('Error fetching action items:', error);
        return [];
    }

    return (data as ActionItem[]) || [];
}

export async function createActionItem(
    sessionId: string,
    content: string,
    assignedTo?: string,
    dueDate?: string
): Promise<ActionItem | null> {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) return null;

    const { data, error } = await supabase
        .from('action_items')
        .insert({
            session_id: sessionId,
            created_by: userData.user.id,
            assigned_to: assignedTo,
            content,
            due_date: dueDate,
        })
        .select()
        .single();

    if (error) {
        console.error('Error creating action item:', error);
        return null;
    }

    return data as ActionItem;
}

export async function toggleActionItem(itemId: string, isCompleted: boolean): Promise<boolean> {
    const { error } = await supabase
        .from('action_items')
        .update({
            is_completed: isCompleted,
            completed_at: isCompleted ? new Date().toISOString() : null,
        })
        .eq('id', itemId);

    if (error) {
        console.error('Error toggling action item:', error);
        return false;
    }

    return true;
}

export async function deleteActionItem(itemId: string): Promise<boolean> {
    const { error } = await supabase
        .from('action_items')
        .delete()
        .eq('id', itemId);

    if (error) {
        console.error('Error deleting action item:', error);
        return false;
    }

    return true;
}

// Session Feedback
export async function getSessionFeedback(sessionId: string): Promise<SessionFeedback[]> {
    const { data, error } = await supabase
        .from('session_feedback')
        .select('*')
        .eq('session_id', sessionId);

    if (error) {
        console.error('Error fetching session feedback:', error);
        return [];
    }

    return (data as SessionFeedback[]) || [];
}

export async function submitSessionFeedback(
    sessionId: string,
    rating: number,
    feedbackText?: string,
    wouldRecommend?: boolean
): Promise<SessionFeedback | null> {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) return null;

    const { data, error } = await supabase
        .from('session_feedback')
        .upsert({
            session_id: sessionId,
            author_id: userData.user.id,
            rating,
            feedback_text: feedbackText,
            would_recommend: wouldRecommend,
        })
        .select()
        .single();

    if (error) {
        console.error('Error submitting session feedback:', error);
        return null;
    }

    return data as SessionFeedback;
}

// Get user's action items across all sessions
export async function getUserActionItems(userId: string): Promise<ActionItem[]> {
    const { data, error } = await supabase
        .from('action_items')
        .select('*')
        .eq('assigned_to', userId)
        .eq('is_completed', false)
        .order('due_date', { ascending: true });

    if (error) {
        console.error('Error fetching user action items:', error);
        return [];
    }

    return (data as ActionItem[]) || [];
}
