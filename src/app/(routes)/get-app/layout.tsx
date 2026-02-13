import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Get the App",
    description: "Install ChaiChat on your iPhone, Android, or desktop. No App Store needed — get quick access to free mentorship sessions.",
    openGraph: {
        title: "Get ChaiChat on Your Phone",
        description: "Install ChaiChat as an app. No download needed — works right from your browser on iPhone, Android, and desktop.",
    },
};

export default function GetAppLayout({ children }: { children: React.ReactNode }) {
    return children;
}
