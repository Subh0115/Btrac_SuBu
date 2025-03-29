import { Metadata } from "next";
import { BudgetContent } from "@/components/dashboard/budgets/budget-content";

export const metadata: Metadata = {
    title: "Budgets | BtrackiFiS",
    description: "Manage your budgets and track spending",
};

export default function BudgetsPage() {
    return <BudgetContent />;
} 