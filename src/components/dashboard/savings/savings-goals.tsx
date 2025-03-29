"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { MoreHorizontal, Home, Car, Plane, GraduationCap } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function formatAmount(amount: number) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
}

const goals = [
    {
        id: "1",
        name: "House Down Payment",
        icon: Home,
        target: 50000,
        current: 15000,
        deadline: "2025-12-31",
        color: "bg-blue-600",
    },
    {
        id: "2",
        name: "New Car",
        icon: Car,
        target: 25000,
        current: 12500,
        deadline: "2024-06-30",
        color: "bg-green-600",
    },
    {
        id: "3",
        name: "Vacation Fund",
        icon: Plane,
        target: 5000,
        current: 3500,
        deadline: "2024-08-15",
        color: "bg-purple-600",
    },
    {
        id: "4",
        name: "Education Fund",
        icon: GraduationCap,
        target: 20000,
        current: 8000,
        deadline: "2025-09-01",
        color: "bg-orange-600",
    },
];

export function SavingsGoals() {
    return (
        <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium">Savings Goals</h3>
                <Button variant="outline" size="sm">View All</Button>
            </div>
            <div className="space-y-6">
                {goals.map((goal) => {
                    const Icon = goal.icon;
                    const progress = (goal.current / goal.target) * 100;
                    const deadline = new Date(goal.deadline);
                    const remainingDays = Math.ceil((deadline.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

                    return (
                        <div key={goal.id} className="space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className={`rounded-full p-2 ${goal.color} bg-opacity-10`}>
                                        <Icon className={`h-4 w-4 ${goal.color.replace('bg-', 'text-')}`} />
                                    </div>
                                    <div>
                                        <h4 className="font-medium">{goal.name}</h4>
                                        <p className="text-sm text-muted-foreground">
                                            {remainingDays} days remaining
                                        </p>
                                    </div>
                                </div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            className="h-8 w-8 p-0"
                                        >
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem>Add Funds</DropdownMenuItem>
                                        <DropdownMenuItem>Edit Goal</DropdownMenuItem>
                                        <DropdownMenuItem className="text-red-600">
                                            Delete Goal
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            <div className="space-y-2">
                                <Progress value={progress} className="h-2" />
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">
                                        {formatAmount(goal.current)}
                                    </span>
                                    <span className="font-medium">
                                        {formatAmount(goal.target)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </Card>
    );
} 