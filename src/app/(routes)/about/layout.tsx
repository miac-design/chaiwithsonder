import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About ChaiChat",
    description: "Learn about ChaiChat's mission to make mentorship free and accessible for everyone. Built on the concept of sonder, every person's story matters.",
    openGraph: {
        title: "About ChaiChat | Where Sonder Becomes Connection",
        description: "Learn about ChaiChat's mission to make mentorship free and accessible for everyone.",
    },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
    return children;
}
