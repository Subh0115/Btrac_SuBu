"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowDownRight, Clock } from "lucide-react";

const transactions = [
    {
        id: "1",
        description: "Salary Deposit",
        amount: 5000,
        type: "income",
        date: "2024-03-29",
        category: "Income",
    },
    {
        id: "2",
        description: "Grocery Shopping",
        amount: 150.50,
        type: "expense",
        date: "2024-03-28",
        category: "Food",
    },
    {
        id: "3",
        description: "Netflix Subscription",
        amount: 15.99,
        type: "expense",
        date: "2024-03-27",
        category: "Entertainment",
    },
    {
        id: "4",
        description: "Freelance Payment",
        amount: 1200,
        type: "income",
        date: "2024-03-26",
        category: "Income",
    },
];

export function RecentTransactions() {
    return (
        <Card className="p-6">
            <div className="flex items-center justify-between">
                <h3 className="font-medium">Recent Transactions</h3>
                <Button variant="ghost" size="sm">
                    View All
                </Button>
            </div>

            <div className="mt-6 space-y-4">
                {transactions.map((transaction) => (
                    <div
                        key={transaction.id}
                        className="flex items-center justify-between"
                    >
                        <div className="flex items-center gap-4">
                            <div
                                className={`rounded-full p-2 ${
                                    transaction.type === "income"
                                        ? "bg-green-100 text-green-600"
                                        : "bg-red-100 text-red-600"
                                }`}
                            >
                                {transaction.type === "income" ? (
                                    <ArrowUpRight className="h-4 w-4" />
                                ) : (
                                    <ArrowDownRight className="h-4 w-4" />
                                )}
                            </div>
                            <div>
                                <p className="font-medium">
                                    {transaction.description}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {transaction.category}
                                </p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p
                                className={`font-medium ${
                                    transaction.type === "income"
                                        ? "text-green-600"
                                        : "text-red-600"
                                }`}
                            >
                                {transaction.type === "income" ? "+" : "-"}$
                                {transaction.amount.toFixed(2)}
                            </p>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                {new Date(transaction.date).toLocaleDateString()}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
} 