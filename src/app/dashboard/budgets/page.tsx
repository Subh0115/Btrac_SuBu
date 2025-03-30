"use client";

import { BudgetsContent } from "@/components/dashboard/budgets/budgets-content";
import { mockBudgets, mockAccounts } from "@/data/mock-data";

export default function BudgetsPage() {
    return (
        <BudgetsContent 
            budgets={mockBudgets}
            accounts={mockAccounts}
        />
    );
} 