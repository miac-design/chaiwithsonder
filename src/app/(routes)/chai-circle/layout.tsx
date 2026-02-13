import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Chai Circle — Group Sessions",
    description: "Join group mentorship sessions led by experts. Career talks, tech workshops, community building, and more. Free and open to everyone.",
    openGraph: {
        title: "Chai Circle — Group Sessions | ChaiChat",
        description: "Join group conversations led by mentors. Learn together, network, and grow — over a virtual cup of chai.",
    },
};

export default function ChaiCircleLayout({ children }: { children: React.ReactNode }) {
    return children;
}
