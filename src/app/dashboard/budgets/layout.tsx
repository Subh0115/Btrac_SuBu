import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Budgets | BtrackiFiS",
    description: "Manage your budgets and track spending",
};

export default function BudgetsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
} 