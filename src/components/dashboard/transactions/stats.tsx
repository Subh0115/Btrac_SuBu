"use client";

import { Card } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, Wallet } from "lucide-react";

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
        title: "Total Income",
        amount: 12500.75,
        change: "+12.5%",
        changeType: "positive",
        icon: ArrowUpRight,
    },
    {
        title: "Total Expenses",
        amount: 7845.25,
        change: "+5.2%",
        changeType: "negative",
        icon: ArrowDownRight,
    },
    {
        title: "Net Flow",
        amount: 4655.50,
        change: "+7.3%",
        changeType: "positive",
        icon: Wallet,
    },
];

export function TransactionStats() {
    return (
        <div className="grid gap-4 md:grid-cols-3">
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
                                    {formatAmount(stat.amount)}
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