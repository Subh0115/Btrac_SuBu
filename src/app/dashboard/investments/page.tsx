import { Metadata } from "next";
import { InvestmentContent } from "@/components/dashboard/investments/investment-content";

export const metadata: Metadata = {
    title: "Investments | BtrackiFiS",
    description: "Track your investment portfolio and performance",
};

export default function InvestmentsPage() {
    return <InvestmentContent />;
} 