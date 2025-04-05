"use client";

import { BudgetsHeader } from "@/components/dashboard/budgets/header";
import { BudgetCategories } from "@/components/dashboard/budgets/categories";
import { BudgetOverview } from "@/components/dashboard/budgets/overview";

export function BudgetContent() {
    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <BudgetsHeader />
            <div className="grid gap-4 md:grid-cols-7">
                <div className="col-span-4">
                    <BudgetCategories />
                </div>
                <div className="col-span-3">
                    <BudgetOverview />
                </div>
            </div>
        </div>
    );
} 