import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us",
    description: "Get in touch with the ChaiChat team. We'd love to hear from you, whether you have questions, feedback, or want to partner with us.",
    openGraph: {
        title: "Contact ChaiChat",
        description: "Get in touch with the ChaiChat team. Questions, feedback, or partnership inquiries welcome.",
    },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return children;
}
