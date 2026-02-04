import { supabase } from './supabase';
import type { RealtimeChannel } from '@supabase/supabase-js';

export interface Message {
    id: string;
    conversation_id: string;
    sender_id: string;
    content: string;
    is_read: boolean;
    created_at: string;
    sender?: {
        full_name: string;
        avatar_url: string;
    };
}

export interface Conversation {
    id: string;
    mentor_id: string;
    mentee_id: string;
    status: 'pending' | 'active' | 'completed' | 'cancelled';
    created_at: string;
    last_message_at: string | null;
    mentor?: {
        full_name: string;
        avatar_url: string;
    };
    mentee?: {
        full_name: string;
        avatar_url: string;
    };
}

// Note: These tables need to be created via migrations. Using 'as any' for type safety
// until database types are regenerated after running migrations.

// Fetch all conversations for a user
export async function getConversations(userId: string): Promise<Conversation[]> {
    const { data, error } = await (supabase as any)
        .from('conversations')
        .select(`
      *,
      mentor:profiles!mentor_id(full_name, avatar_url),
      mentee:profiles!mentee_id(full_name, avatar_url)
    `)
        .or(`mentor_id.eq.${userId},mentee_id.eq.${userId}`)
        .order('last_message_at', { ascending: false, nullsFirst: false });

    if (error) throw error;
    return (data as Conversation[]) || [];
}

// Fetch messages for a conversation
export async function getMessages(conversationId: string): Promise<Message[]> {
    const { data, error } = await (supabase as any)
        .from('messages')
        .select(`
      *,
      sender:profiles!sender_id(full_name, avatar_url)
    `)
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });

    if (error) throw error;
    return (data as Message[]) || [];
}

// Send a message
export async function sendMessage(conversationId: string, senderId: string, content: string): Promise<Message> {
    const { data, error } = await (supabase as any)
        .from('messages')
        .insert({
            conversation_id: conversationId,
            sender_id: senderId,
            content: content.trim(),
        })
        .select()
        .single();

    if (error) throw error;
    return data as Message;
}

// Start a new conversation
export async function startConversation(mentorId: string, menteeId: string): Promise<Conversation> {
    // Check if conversation already exists
    const { data: existing } = await (supabase as any)
        .from('conversations')
        .select('*')
        .eq('mentor_id', mentorId)
        .eq('mentee_id', menteeId)
        .single();

    if (existing) {
        return existing as Conversation;
    }

    const { data, error } = await (supabase as any)
        .from('conversations')
        .insert({
            mentor_id: mentorId,
            mentee_id: menteeId,
            status: 'pending',
        })
        .select()
        .single();

    if (error) throw error;
    return data as Conversation;
}

// Accept a conversation (mentor action)
export async function acceptConversation(conversationId: string): Promise<void> {
    const { error } = await (supabase as any)
        .from('conversations')
        .update({ status: 'active' })
        .eq('id', conversationId);

    if (error) throw error;
}

// Mark messages as read
export async function markMessagesAsRead(conversationId: string, userId: string): Promise<void> {
    const { error } = await (supabase as any)
        .from('messages')
        .update({ is_read: true })
        .eq('conversation_id', conversationId)
        .neq('sender_id', userId);

    if (error) throw error;
}

// Subscribe to new messages in a conversation
export function subscribeToMessages(
    conversationId: string,
    onMessage: (message: Message) => void
): RealtimeChannel {
    return supabase
        .channel(`messages:${conversationId}`)
        .on(
            'postgres_changes',
            {
                event: 'INSERT',
                schema: 'public',
                table: 'messages',
                filter: `conversation_id=eq.${conversationId}`,
            },
            async (payload) => {
                // Fetch the full message with sender info
                const { data } = await (supabase as any)
                    .from('messages')
                    .select(`
            *,
            sender:profiles!sender_id(full_name, avatar_url)
          `)
                    .eq('id', (payload.new as any).id)
                    .single();

                if (data) {
                    onMessage(data as Message);
                }
            }
        )
        .subscribe();
}

// Unsubscribe from messages
export function unsubscribeFromMessages(channel: RealtimeChannel): void {
    supabase.removeChannel(channel);
}

// Get unread message count
export async function getUnreadCount(userId: string): Promise<number> {
    // Simplified query to avoid complex subquery type issues
    const { data: conversations } = await (supabase as any)
        .from('conversations')
        .select('id')
        .or(`mentor_id.eq.${userId},mentee_id.eq.${userId}`);

    if (!conversations || conversations.length === 0) return 0;

    const conversationIds = (conversations as any[]).map((c: any) => c.id);

    const { count, error } = await (supabase as any)
        .from('messages')
        .select('*', { count: 'exact', head: true })
        .eq('is_read', false)
        .neq('sender_id', userId)
        .in('conversation_id', conversationIds);

    if (error) return 0;
    return count || 0;
}
