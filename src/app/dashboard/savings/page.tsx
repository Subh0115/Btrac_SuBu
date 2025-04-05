import { Metadata } from "next";
import { SavingsContent } from "@/components/dashboard/savings/savings-content";

export const metadata: Metadata = {
    title: "Savings | BtrackiFiS",
    description: "Track your savings goals and progress",
};

export default function SavingsPage() {
    return <SavingsContent />;
} 