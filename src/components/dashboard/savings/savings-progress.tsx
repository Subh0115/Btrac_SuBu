"use client";

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatAmount } from "@/lib/utils";

interface SavingsGoal {
    id: string;
    name: string;
    targetAmount: number;
    currentAmount: number;
    deadline: string;
    category: string;
    status: "active" | "completed" | "overdue";
}

interface SavingsProgressProps {
    goals: SavingsGoal[];
}

export function SavingsProgress({ goals }: SavingsProgressProps) {
    // Calculate total progress for each category
    const categoryProgress = goals.reduce((acc, goal) => {
        if (!acc[goal.category]) {
            acc[goal.category] = {
                current: 0,
                target: 0,
                count: 0
            };
        }
        acc[goal.category].current += goal.currentAmount;
        acc[goal.category].target += goal.targetAmount;
        acc[goal.category].count += 1;
        return acc;
    }, {} as Record<string, { current: number; target: number; count: number }>);

    // Define colors for each category
    const categoryColors = {
        emergency: "bg-blue-600 dark:bg-blue-400",
        vacation: "bg-green-600 dark:bg-green-400",
        house: "bg-purple-600 dark:bg-purple-400",
        education: "bg-yellow-600 dark:bg-yellow-400",
        retirement: "bg-red-600 dark:bg-red-400",
        other: "bg-gray-600 dark:bg-gray-400"
    };

    // Define background colors for each category
    const categoryBgColors = {
        emergency: "bg-blue-100 dark:bg-blue-900",
        vacation: "bg-green-100 dark:bg-green-900",
        house: "bg-purple-100 dark:bg-purple-900",
        education: "bg-yellow-100 dark:bg-yellow-900",
        retirement: "bg-red-100 dark:bg-red-900",
        other: "bg-gray-100 dark:bg-gray-900"
    };

    return (
        <Card className="p-4 mt-4">
            <h3 className="text-sm font-medium mb-4">Category Progress</h3>
            <div className="space-y-4">
                {Object.entries(categoryProgress).map(([category, data]) => {
                    const progress = (data.current / data.target) * 100;
                    const color = categoryColors[category as keyof typeof categoryColors] || "bg-blue-600 dark:bg-blue-400";
                    const bgColor = categoryBgColors[category as keyof typeof categoryBgColors] || "bg-blue-100 dark:bg-blue-900";

                    return (
                        <div key={category} className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                                <span className="capitalize">{category.replace(/([A-Z])/g, ' $1').trim()}</span>
                                <span className="text-muted-foreground">
                                    {formatAmount(data.current)} / {formatAmount(data.target)}
                                </span>
                            </div>
                            <Progress 
                                value={progress} 
                                className={`h-2 ${bgColor}`}
                                indicatorClassName={color}
                            />
                        </div>
                    );
                })}
            </div>
        </Card>
    );
} 