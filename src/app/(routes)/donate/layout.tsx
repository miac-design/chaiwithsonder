import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Support ChaiChat",
    description: "Help keep mentorship free for everyone. Your donation covers infrastructure and ensures accessibility for all who need guidance.",
    openGraph: {
        title: "Support ChaiChat — Help Keep Mentorship Free",
        description: "Your donation helps keep our mentorship platform free and accessible for all.",
    },
};

export default function DonateLayout({ children }: { children: React.ReactNode }) {
    return children;
}
