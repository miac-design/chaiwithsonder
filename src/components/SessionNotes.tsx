'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ActionItem {
    id: string;
    content: string;
    isCompleted: boolean;
    dueDate?: string;
}

interface SessionNotesProps {
    sessionId: string;
    initialNotes?: string;
    initialActionItems?: ActionItem[];
    isMentor?: boolean;
    onSave?: (notes: string, actionItems: ActionItem[]) => void;
}

export default function SessionNotes({
    sessionId,
    initialNotes = '',
    initialActionItems = [],
    isMentor = false,
    onSave,
}: SessionNotesProps) {
    const [notes, setNotes] = useState(initialNotes);
    const [actionItems, setActionItems] = useState<ActionItem[]>(initialActionItems);
    const [newActionItem, setNewActionItem] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleAddActionItem = () => {
        if (!newActionItem.trim()) return;

        const newItem: ActionItem = {
            id: `temp-${Date.now()}`,
            content: newActionItem.trim(),
            isCompleted: false,
        };

        setActionItems([...actionItems, newItem]);
        setNewActionItem('');
    };

    const handleToggleActionItem = (id: string) => {
        setActionItems(
            actionItems.map((item) =>
                item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
            )
        );
    };

    const handleDeleteActionItem = (id: string) => {
        setActionItems(actionItems.filter((item) => item.id !== id));
    };

    const handleSave = async () => {
        setIsSaving(true);

        // Simulate save (would call actual API)
        await new Promise((resolve) => setTimeout(resolve, 500));

        if (onSave) {
            onSave(notes, actionItems);
        }

        setIsSaving(false);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2000);
    };

    const completedCount = actionItems.filter((item) => item.isCompleted).length;
    const progressPercent = actionItems.length > 0 ? (completedCount / actionItems.length) * 100 : 0;

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center">
                        <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900">Session Notes</h3>
                        <p className="text-sm text-gray-500">
                            {isMentor ? 'Capture key takeaways and action items' : 'Review notes from your session'}
                        </p>
                    </div>
                </div>

                {/* Privacy toggle */}
                {isMentor && (
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={isPrivate}
                            onChange={(e) => setIsPrivate(e.target.checked)}
                            className="sr-only"
                        />
                        <div className={`w-10 h-6 rounded-full transition-colors ${isPrivate ? 'bg-amber-500' : 'bg-gray-200'}`}>
                            <div className={`w-4 h-4 rounded-full bg-white transform transition-transform mt-1 ${isPrivate ? 'translate-x-5 ml-0' : 'translate-x-1'}`} />
                        </div>
                        <span className="text-sm text-gray-600">
                            {isPrivate ? '🔒 Private' : '👁 Shared'}
                        </span>
                    </label>
                )}
            </div>

            {/* Notes Editor */}
            <div className="p-6 space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Notes
                    </label>
                    <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Write your notes here... What was discussed? Key insights?"
                        className="w-full h-40 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none transition"
                    />
                </div>

                {/* Action Items */}
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <label className="block text-sm font-medium text-gray-700">
                            Action Items
                        </label>
                        {actionItems.length > 0 && (
                            <span className="text-xs text-gray-500">
                                {completedCount}/{actionItems.length} completed
                            </span>
                        )}
                    </div>

                    {/* Progress bar */}
                    {actionItems.length > 0 && (
                        <div className="h-1 bg-gray-100 rounded-full mb-4 overflow-hidden">
                            <motion.div
                                className="h-full bg-teal-500 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${progressPercent}%` }}
                                transition={{ duration: 0.3 }}
                            />
                        </div>
                    )}

                    {/* Action items list */}
                    <div className="space-y-2 mb-4">
                        <AnimatePresence>
                            {actionItems.map((item) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg group"
                                >
                                    <button
                                        onClick={() => handleToggleActionItem(item.id)}
                                        className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition ${item.isCompleted
                                                ? 'bg-teal-500 border-teal-500'
                                                : 'border-gray-300 hover:border-teal-400'
                                            }`}
                                    >
                                        {item.isCompleted && (
                                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        )}
                                    </button>
                                    <span className={`flex-1 text-sm ${item.isCompleted ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                                        {item.content}
                                    </span>
                                    <button
                                        onClick={() => handleDeleteActionItem(item.id)}
                                        className="p-1 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Add action item */}
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={newActionItem}
                            onChange={(e) => setNewActionItem(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleAddActionItem()}
                            placeholder="Add an action item..."
                            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition text-sm"
                        />
                        <button
                            onClick={handleAddActionItem}
                            disabled={!newActionItem.trim()}
                            className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                <p className="text-xs text-gray-400">
                    {isPrivate ? 'Only you can see these notes' : 'Notes will be shared with your session partner'}
                </p>
                <div className="flex items-center gap-3">
                    <AnimatePresence>
                        {showSuccess && (
                            <motion.span
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0 }}
                                className="text-sm text-green-600 flex items-center gap-1"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Saved!
                            </motion.span>
                        )}
                    </AnimatePresence>
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="px-4 py-2 bg-teal-500 text-white rounded-lg font-medium hover:bg-teal-600 transition disabled:opacity-50"
                    >
                        {isSaving ? 'Saving...' : 'Save Notes'}
                    </button>
                </div>
            </div>
        </div>
    );
}
