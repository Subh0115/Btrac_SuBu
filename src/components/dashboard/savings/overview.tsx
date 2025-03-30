"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatAmount } from "@/lib/utils";
import { PiggyBank, Target, TrendingUp, Calendar } from "lucide-react";

interface SavingsGoal {
    id: string;
    name: string;
    targetAmount: number;
    currentAmount: number;
    deadline: string;
    category: string;
    status: "active" | "completed" | "overdue";
}

interface SavingsOverviewProps {
    goals: SavingsGoal[];
}

export function SavingsOverview({ goals }: SavingsOverviewProps) {
    const totalSavings = goals.reduce((sum, goal) => sum + goal.currentAmount, 0);
    const totalTarget = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);
    const activeGoals = goals.filter((goal) => goal.status === "active").length;
    const completedGoals = goals.filter((goal) => goal.status === "completed").length;
    const savingsRate = totalTarget > 0 ? (totalSavings / totalTarget) * 100 : 0;

    return (
        <>
            <Card className="border-none shadow-sm bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-blue-900 dark:text-blue-100">Total Savings</CardTitle>
                    <PiggyBank className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">{formatAmount(totalSavings)}</div>
                    <p className="text-xs text-blue-700 dark:text-blue-300">
                        {savingsRate.toFixed(1)}% of total target
                    </p>
                </CardContent>
            </Card>
            <Card className="border-none shadow-sm bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-blue-900 dark:text-blue-100">Active Goals</CardTitle>
                    <Target className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">{activeGoals}</div>
                    <p className="text-xs text-blue-700 dark:text-blue-300">
                        {completedGoals} completed
                    </p>
                </CardContent>
            </Card>
            <Card className="border-none shadow-sm bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-blue-900 dark:text-blue-100">Total Target</CardTitle>
                    <TrendingUp className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">{formatAmount(totalTarget)}</div>
                    <p className="text-xs text-blue-700 dark:text-blue-300">
                        Across all goals
                    </p>
                </CardContent>
            </Card>
            <Card className="border-none shadow-sm bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-blue-900 dark:text-blue-100">Next Deadline</CardTitle>
                    <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                        {goals.length > 0
                            ? new Date(Math.min(...goals.map(g => new Date(g.deadline).getTime())))
                                .toLocaleDateString()
                            : "No goals"}
                    </div>
                    <p className="text-xs text-blue-700 dark:text-blue-300">
                        {goals.length > 0 ? "Nearest goal" : "Add a goal"}
                    </p>
                </CardContent>
            </Card>
        </>
    );
} 