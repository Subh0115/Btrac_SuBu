"use client";

import { Card } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

function formatAmount(amount: number) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
}

const transactions = [
    {
        id: "1",
        description: "Monthly Savings",
        amount: 2000,
        type: "deposit",
        date: "2024-03-15",
        category: "Regular Savings",
    },
    {
        id: "2",
        description: "House Fund",
        amount: 1500,
        type: "deposit",
        date: "2024-03-10",
        category: "Goal Contribution",
    },
    {
        id: "3",
        description: "Emergency Withdrawal",
        amount: 500,
        type: "withdrawal",
        date: "2024-03-05",
        category: "Emergency",
    },
    {
        id: "4",
        description: "Bonus Savings",
        amount: 3000,
        type: "deposit",
        date: "2024-03-01",
        category: "Extra Savings",
    },
    {
        id: "5",
        description: "Car Fund",
        amount: 1000,
        type: "deposit",
        date: "2024-02-28",
        category: "Goal Contribution",
    },
];

export function SavingsHistory() {
    return (
        <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium">Recent Activity</h3>
            </div>
            <div className="space-y-6">
                {transactions.map((transaction) => {
                    const date = new Date(transaction.date);
                    const isDeposit = transaction.type === "deposit";

                    return (
                        <div key={transaction.id} className="flex items-center justify-between">
                            <div className="space-y-1">
                                <p className="font-medium">{transaction.description}</p>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <span>{transaction.category}</span>
                                    <span>•</span>
                                    <span>{date.toLocaleDateString()}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className={`flex items-center gap-1 ${
                                    isDeposit ? "text-green-600" : "text-red-600"
                                }`}>
                                    {isDeposit ? (
                                        <ArrowUpRight className="h-4 w-4" />
                                    ) : (
                                        <ArrowDownRight className="h-4 w-4" />
                                    )}
                                    <span className="font-medium">
                                        {isDeposit ? "+" : "-"}
                                        {formatAmount(transaction.amount)}
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