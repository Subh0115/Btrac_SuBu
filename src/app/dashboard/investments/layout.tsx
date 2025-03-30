import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Investments | BtrackiFiS",
    description: "Track your investment portfolio and performance",
};

export default function InvestmentsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
} 