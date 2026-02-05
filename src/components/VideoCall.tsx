'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface VideoCallProps {
    roomId: string;
    userName?: string;
    userEmail?: string;
    sessionTopic?: string;
    onClose?: () => void;
    isEmbedded?: boolean;
}

declare global {
    interface Window {
        JitsiMeetExternalAPI: any;
    }
}

export default function VideoCall({
    roomId,
    userName = 'Guest',
    userEmail,
    sessionTopic = 'Mentoring Session',
    onClose,
    isEmbedded = false,
}: VideoCallProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const apiRef = useRef<any>(null);

    useEffect(() => {
        // Load the Jitsi Meet External API script
        const loadJitsiScript = () => {
            return new Promise<void>((resolve, reject) => {
                if (window.JitsiMeetExternalAPI) {
                    resolve();
                    return;
                }

                const script = document.createElement('script');
                script.src = 'https://meet.jit.si/external_api.js';
                script.async = true;
                script.onload = () => resolve();
                script.onerror = () => reject(new Error('Failed to load Jitsi script'));
                document.body.appendChild(script);
            });
        };

        const initJitsi = async () => {
            try {
                await loadJitsiScript();

                if (!containerRef.current) return;

                // Clean up any existing instance
                if (apiRef.current) {
                    apiRef.current.dispose();
                }

                const domain = 'meet.jit.si';
                const options = {
                    roomName: roomId,
                    width: '100%',
                    height: isEmbedded ? '500px' : '100%',
                    parentNode: containerRef.current,
                    userInfo: {
                        displayName: userName,
                        email: userEmail,
                    },
                    configOverwrite: {
                        startWithAudioMuted: false,
                        startWithVideoMuted: false,
                        prejoinPageEnabled: false,
                        disableDeepLinking: true,
                        toolbarButtons: [
                            'camera',
                            'chat',
                            'closedcaptions',
                            'desktop',
                            'feedback',
                            'filmstrip',
                            'fullscreen',
                            'hangup',
                            'microphone',
                            'participants-pane',
                            'raisehand',
                            'settings',
                            'tileview',
                            'toggle-camera',
                        ],
                    },
                    interfaceConfigOverwrite: {
                        SHOW_JITSI_WATERMARK: false,
                        SHOW_WATERMARK_FOR_GUESTS: false,
                        DEFAULT_BACKGROUND: '#0D9488',
                        TOOLBAR_BUTTONS: [
                            'camera',
                            'chat',
                            'desktop',
                            'fullscreen',
                            'hangup',
                            'microphone',
                            'participants-pane',
                            'raisehand',
                            'settings',
                            'tileview',
                        ],
                    },
                };

                apiRef.current = new window.JitsiMeetExternalAPI(domain, options);

                apiRef.current.addListener('videoConferenceJoined', () => {
                    setIsLoading(false);
                    apiRef.current.executeCommand('subject', sessionTopic);
                });

                apiRef.current.addListener('readyToClose', () => {
                    if (onClose) onClose();
                });

                apiRef.current.addListener('errorOccurred', (e: any) => {
                    console.error('Jitsi error:', e);
                    setError('An error occurred with the video call');
                });
            } catch (err) {
                console.error('Failed to initialize Jitsi:', err);
                setError('Failed to load video call. Please try again.');
                setIsLoading(false);
            }
        };

        initJitsi();

        return () => {
            if (apiRef.current) {
                apiRef.current.dispose();
            }
        };
    }, [roomId, userName, userEmail, sessionTopic, isEmbedded, onClose]);

    if (error) {
        return (
            <div className={`flex items-center justify-center ${isEmbedded ? 'h-[500px]' : 'h-screen'} bg-gray-900`}>
                <div className="text-center p-8">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
                        <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h3 className="text-white text-lg font-medium mb-2">Video Call Error</h3>
                    <p className="text-gray-400 mb-4">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={`relative ${isEmbedded ? 'rounded-xl overflow-hidden' : 'h-screen'}`}>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={`absolute inset-0 flex items-center justify-center bg-gray-900 z-10 ${isEmbedded ? 'rounded-xl' : ''}`}
                >
                    <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-teal-500/20 flex items-center justify-center animate-pulse">
                            <svg className="w-8 h-8 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <p className="text-white font-medium">Connecting to video call...</p>
                        <p className="text-gray-400 text-sm mt-1">{sessionTopic}</p>
                    </div>
                </motion.div>
            )}

            <div
                ref={containerRef}
                className={`${isEmbedded ? 'h-[500px]' : 'h-full'} w-full bg-gray-900`}
            />

            {onClose && (
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 p-2 bg-gray-800/80 hover:bg-gray-700 rounded-full text-white transition"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            )}
        </div>
    );
}
