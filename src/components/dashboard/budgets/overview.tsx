"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatAmount } from "@/lib/utils";
import { Wallet, TrendingUp, AlertCircle, CheckCircle } from "lucide-react";

interface Budget {
    id: string;
    name: string;
    category: string;
    amount: number;
    spent: number;
    startDate: string;
    endDate: string;
    status: "active" | "completed" | "overdue";
    transactions: string[];
}

interface BudgetsOverviewProps {
    budgets: Budget[];
}

export function BudgetsOverview({ budgets }: BudgetsOverviewProps) {
    const totalBudget = budgets.reduce((sum, budget) => sum + budget.amount, 0);
    const totalSpent = budgets.reduce((sum, budget) => sum + budget.spent, 0);
    const activeBudgets = budgets.filter((budget) => budget.status === "active").length;
    const overdueBudgets = budgets.filter((budget) => budget.status === "overdue").length;

    return (
        <>
            <Card className="border-none shadow-sm bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-blue-900 dark:text-blue-100">Total Budget</CardTitle>
                    <Wallet className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">{formatAmount(totalBudget)}</div>
                </CardContent>
            </Card>
            <Card className="border-none shadow-sm bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-blue-900 dark:text-blue-100">Total Spent</CardTitle>
                    <TrendingUp className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">{formatAmount(totalSpent)}</div>
                </CardContent>
            </Card>
            <Card className="border-none shadow-sm bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-blue-900 dark:text-blue-100">Active Budgets</CardTitle>
                    <CheckCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">{activeBudgets}</div>
                </CardContent>
            </Card>
            <Card className="border-none shadow-sm bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-blue-900 dark:text-blue-100">Overdue Budgets</CardTitle>
                    <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">{overdueBudgets}</div>
                </CardContent>
            </Card>
        </>
    );
} 