'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Message, Conversation } from '@/lib/chat-service';
import {
    getMessages,
    sendMessage,
    subscribeToMessages,
    unsubscribeFromMessages,
    markMessagesAsRead,
} from '@/lib/chat-service';
import type { RealtimeChannel } from '@supabase/supabase-js';

interface ChatWindowProps {
    conversation: Conversation;
    currentUserId: string;
    onClose?: () => void;
}

export default function ChatWindow({ conversation, currentUserId, onClose }: ChatWindowProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isSending, setIsSending] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const channelRef = useRef<RealtimeChannel | null>(null);

    const otherUser = currentUserId === conversation.mentor_id
        ? conversation.mentee
        : conversation.mentor;

    // Load initial messages
    useEffect(() => {
        async function loadMessages() {
            try {
                const data = await getMessages(conversation.id);
                setMessages(data);
                markMessagesAsRead(conversation.id, currentUserId);
            } catch (error) {
                console.error('Failed to load messages:', error);
            } finally {
                setIsLoading(false);
            }
        }
        loadMessages();
    }, [conversation.id, currentUserId]);

    // Subscribe to new messages
    useEffect(() => {
        channelRef.current = subscribeToMessages(conversation.id, (newMsg) => {
            setMessages((prev) => {
                // Avoid duplicates
                if (prev.some((m) => m.id === newMsg.id)) return prev;
                return [...prev, newMsg];
            });
            // Mark as read if from other user
            if (newMsg.sender_id !== currentUserId) {
                markMessagesAsRead(conversation.id, currentUserId);
            }
        });

        return () => {
            if (channelRef.current) {
                unsubscribeFromMessages(channelRef.current);
            }
        };
    }, [conversation.id, currentUserId]);

    // Scroll to bottom on new messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || isSending) return;

        setIsSending(true);
        try {
            const sent = await sendMessage(conversation.id, currentUserId, newMessage);
            // Optimistically add message (will be deduplicated by realtime)
            setMessages((prev) => [...prev, { ...sent, sender: { full_name: 'You', avatar_url: '' } }]);
            setNewMessage('');
        } catch (error) {
            console.error('Failed to send message:', error);
        } finally {
            setIsSending(false);
        }
    };

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        if (date.toDateString() === today.toDateString()) return 'Today';
        if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';
        return date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
    };

    // Group messages by date
    const groupedMessages = messages.reduce((groups, message) => {
        const date = new Date(message.created_at).toDateString();
        if (!groups[date]) groups[date] = [];
        groups[date].push(message);
        return groups;
    }, {} as Record<string, Message[]>);

    return (
        <div className="flex flex-col h-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-teal-50 to-white">
                <div className="flex items-center gap-3">
                    {otherUser?.avatar_url ? (
                        <img
                            src={otherUser.avatar_url}
                            alt={otherUser.full_name}
                            className="w-10 h-10 rounded-full object-cover"
                        />
                    ) : (
                        <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
                            <span className="text-teal-600 font-semibold">
                                {otherUser?.full_name?.[0] || '?'}
                            </span>
                        </div>
                    )}
                    <div>
                        <h3 className="font-semibold text-gray-900">{otherUser?.full_name || 'User'}</h3>
                        <p className="text-sm text-teal-600">
                            {conversation.status === 'active' ? 'Active conversation' : conversation.status}
                        </p>
                    </div>
                </div>
                {onClose && (
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6 bg-gray-50">
                {isLoading ? (
                    <div className="flex items-center justify-center h-32">
                        <div className="animate-spin rounded-full h-8 w-8 border-2 border-teal-500 border-t-transparent" />
                    </div>
                ) : messages.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                        <p className="mb-2">No messages yet</p>
                        <p className="text-sm">Start the conversation!</p>
                    </div>
                ) : (
                    Object.entries(groupedMessages).map(([date, dayMessages]) => (
                        <div key={date}>
                            <div className="flex items-center justify-center mb-4">
                                <span className="text-xs text-gray-400 bg-white px-3 py-1 rounded-full shadow-sm">
                                    {formatDate(dayMessages[0].created_at)}
                                </span>
                            </div>
                            <div className="space-y-3">
                                <AnimatePresence>
                                    {dayMessages.map((message) => {
                                        const isOwn = message.sender_id === currentUserId;
                                        return (
                                            <motion.div
                                                key={message.id}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                                            >
                                                <div
                                                    className={`max-w-[75%] px-4 py-3 rounded-2xl ${isOwn
                                                            ? 'bg-teal-500 text-white rounded-br-md'
                                                            : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-md'
                                                        }`}
                                                >
                                                    <p className="text-sm leading-relaxed">{message.content}</p>
                                                    <p className={`text-xs mt-1 ${isOwn ? 'text-teal-100' : 'text-gray-400'}`}>
                                                        {formatTime(message.created_at)}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </AnimatePresence>
                            </div>
                        </div>
                    ))
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            {conversation.status === 'active' ? (
                <form onSubmit={handleSend} className="p-4 border-t border-gray-100 bg-white">
                    <div className="flex items-center gap-3">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-1 px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition text-gray-800 placeholder-gray-400"
                            disabled={isSending}
                        />
                        <button
                            type="submit"
                            disabled={!newMessage.trim() || isSending}
                            className="p-3 bg-teal-500 text-white rounded-xl hover:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-teal-500/30"
                        >
                            {isSending ? (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                            )}
                        </button>
                    </div>
                </form>
            ) : (
                <div className="p-4 border-t border-gray-100 bg-amber-50 text-center">
                    <p className="text-amber-700 text-sm">
                        {conversation.status === 'pending'
                            ? 'Waiting for mentor to accept the conversation...'
                            : `This conversation is ${conversation.status}.`}
                    </p>
                </div>
            )}
        </div>
    );
}
