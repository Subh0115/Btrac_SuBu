"use client";

import { SavingsHeader } from "@/components/dashboard/savings/header";
import { SavingsOverview } from "@/components/dashboard/savings/savings-overview";
import { SavingsGoals } from "@/components/dashboard/savings/savings-goals";
import { SavingsHistory } from "@/components/dashboard/savings/savings-history";

export function SavingsContent() {
    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <SavingsHeader />
            <SavingsOverview />
            <div className="grid gap-4 md:grid-cols-7">
                <div className="col-span-4">
                    <SavingsGoals />
                </div>
                <div className="col-span-3">
                    <SavingsHistory />
                </div>
            </div>
        </div>
    );
} 