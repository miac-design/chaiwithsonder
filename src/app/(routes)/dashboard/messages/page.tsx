'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/DashboardLayout';
import ChatWindow from '@/components/ChatWindow';
import { getConversations, type Conversation } from '@/lib/chat-service';

// Mock user for demo - replace with actual auth
const mockUser = {
    id: 'user-123',
    name: 'Demo User',
    email: 'demo@example.com',
    isMentor: true,
};

export default function MessagesPage() {
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadConversations() {
            try {
                const data = await getConversations(mockUser.id);
                setConversations(data);
                if (data.length > 0) {
                    setSelectedConversation(data[0]);
                }
            } catch (error) {
                console.error('Failed to load conversations:', error);
            } finally {
                setIsLoading(false);
            }
        }
        loadConversations();
    }, []);

    const formatTime = (dateString: string | null) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const now = new Date();
        const diff = now.getTime() - date.getTime();

        if (diff < 60000) return 'Just now';
        if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
        if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
        return date.toLocaleDateString();
    };

    return (
        <DashboardLayout user={mockUser}>
            <div className="h-[calc(100vh-12rem)]">
                <div className="flex h-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    {/* Conversations List */}
                    <div className="w-80 border-r border-gray-100 flex flex-col">
                        <div className="p-4 border-b border-gray-100">
                            <h2 className="text-lg font-semibold text-gray-900">Messages</h2>
                            <p className="text-sm text-gray-500">{conversations.length} conversations</p>
                        </div>

                        <div className="flex-1 overflow-y-auto">
                            {isLoading ? (
                                <div className="p-4 space-y-3">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="flex gap-3 animate-pulse">
                                            <div className="w-12 h-12 bg-gray-100 rounded-full" />
                                            <div className="flex-1">
                                                <div className="h-4 bg-gray-100 rounded w-24 mb-2" />
                                                <div className="h-3 bg-gray-100 rounded w-32" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : conversations.length === 0 ? (
                                <div className="p-8 text-center text-gray-500">
                                    <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                    <p className="mb-2">No conversations yet</p>
                                    <p className="text-sm">Connect with a mentor to start chatting</p>
                                </div>
                            ) : (
                                <div className="divide-y divide-gray-50">
                                    {conversations.map((conv) => {
                                        const otherUser = mockUser.id === conv.mentor_id ? conv.mentee : conv.mentor;
                                        const isSelected = selectedConversation?.id === conv.id;

                                        return (
                                            <motion.button
                                                key={conv.id}
                                                onClick={() => setSelectedConversation(conv)}
                                                className={`w-full p-4 flex gap-3 text-left transition-colors ${isSelected ? 'bg-teal-50' : 'hover:bg-gray-50'
                                                    }`}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                {otherUser?.avatar_url ? (
                                                    <img
                                                        src={otherUser.avatar_url}
                                                        alt={otherUser.full_name}
                                                        className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                                                    />
                                                ) : (
                                                    <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                                                        <span className="text-teal-600 font-semibold">
                                                            {otherUser?.full_name?.[0] || '?'}
                                                        </span>
                                                    </div>
                                                )}
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center justify-between">
                                                        <h4 className="font-medium text-gray-900 truncate">
                                                            {otherUser?.full_name || 'User'}
                                                        </h4>
                                                        <span className="text-xs text-gray-400">
                                                            {formatTime(conv.last_message_at)}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-gray-500 truncate">
                                                        {conv.status === 'pending' ? 'Waiting for response...' : 'Click to view messages'}
                                                    </p>
                                                    <span className={`inline-block mt-1 px-2 py-0.5 text-xs rounded-full ${conv.status === 'active'
                                                            ? 'bg-green-100 text-green-700'
                                                            : conv.status === 'pending'
                                                                ? 'bg-yellow-100 text-yellow-700'
                                                                : 'bg-gray-100 text-gray-600'
                                                        }`}>
                                                        {conv.status}
                                                    </span>
                                                </div>
                                            </motion.button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Chat Area */}
                    <div className="flex-1 flex flex-col">
                        {selectedConversation ? (
                            <ChatWindow
                                conversation={selectedConversation}
                                currentUserId={mockUser.id}
                            />
                        ) : (
                            <div className="flex-1 flex items-center justify-center text-gray-500">
                                <div className="text-center">
                                    <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                    <p className="text-lg font-medium mb-1">Select a conversation</p>
                                    <p className="text-sm">Choose from your conversations to start chatting</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
