"use client";

import { Card } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, TrendingUp, DollarSign } from "lucide-react";

function formatAmount(amount: number) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
}

const stats = [
    {
        title: "Total Portfolio Value",
        value: 125750.50,
        change: "+12.5%",
        changeType: "positive",
        icon: DollarSign,
    },
    {
        title: "Total Invested",
        value: 100000.00,
        change: "+5000",
        changeType: "positive",
        icon: TrendingUp,
    },
    {
        title: "Total Return",
        value: 25750.50,
        change: "+25.75%",
        changeType: "positive",
        icon: ArrowUpRight,
    },
    {
        title: "Monthly Return",
        value: 2150.25,
        change: "-1.2%",
        changeType: "negative",
        icon: ArrowDownRight,
    },
];

export function PortfolioOverview() {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                    <Card key={stat.title} className="p-6">
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <p className="text-sm text-muted-foreground">
                                    {stat.title}
                                </p>
                                <p className="text-2xl font-bold">
                                    {formatAmount(stat.value)}
                                </p>
                            </div>
                            <div className={`rounded-full p-2.5 ${
                                stat.changeType === "positive" 
                                    ? "bg-green-100 text-green-600" 
                                    : "bg-red-100 text-red-600"
                            }`}>
                                <Icon className="h-4 w-4" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center gap-2">
                            <p className={
                                stat.changeType === "positive" 
                                    ? "text-green-600" 
                                    : "text-red-600"
                            }>
                                {stat.change}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                vs last month
                            </p>
                        </div>
                    </Card>
                );
            })}
        </div>
    );
} 