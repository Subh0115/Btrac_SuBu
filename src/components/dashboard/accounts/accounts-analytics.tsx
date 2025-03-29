"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatAmount } from "@/lib/utils";
import { ArrowUpRight, ArrowDownRight, DollarSign, TrendingUp, PiggyBank } from "lucide-react";

interface Account {
    id: string;
    name: string;
    type: string;
    icon: any;
    balance: number;
    accountNumber: string;
    bank: string;
    color: string;
    transactions: Array<{
        date: string;
        description: string;
        amount: number;
    }>;
}

interface AccountsAnalyticsProps {
    accounts: Account[];
}

export function AccountsAnalytics({ accounts }: AccountsAnalyticsProps) {
    // Calculate total balance
    const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);

    // Calculate total income and expenses from transactions
    const transactions = accounts.flatMap(account => account.transactions);
    const totalIncome = transactions
        .filter(t => t.amount > 0)
        .reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = transactions
        .filter(t => t.amount < 0)
        .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    // Calculate average income and expenses
    const averageIncome = totalIncome / (transactions.filter(t => t.amount > 0).length || 1);
    const averageExpenses = totalExpenses / (transactions.filter(t => t.amount < 0).length || 1);

    // Calculate savings rate
    const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0;

    const stats = [
        {
            title: "Total Balance",
            value: formatAmount(totalBalance),
            change: "+12.5%",
            trend: "up",
            icon: DollarSign,
        },
        {
            title: "Total Income",
            value: formatAmount(totalIncome),
            change: "+8.2%",
            trend: "up",
            icon: TrendingUp,
        },
        {
            title: "Total Expenses",
            value: formatAmount(totalExpenses),
            change: "+5.1%",
            trend: "down",
            icon: ArrowDownRight,
        },
        {
            title: "Savings Rate",
            value: `${savingsRate.toFixed(1)}%`,
            change: "+2.3%",
            trend: "up",
            icon: PiggyBank,
        },
    ];

    return (
        <Card>
            <CardHeader>
                <CardTitle>Analytics</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between rounded-lg border p-4"
                        >
                            <div className="flex items-center gap-4">
                                <div className="rounded-full bg-primary/10 p-2">
                                    <stat.icon className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">
                                        {stat.title}
                                    </p>
                                    <p className="text-xl font-semibold">
                                        {stat.value}
                                    </p>
                                </div>
                            </div>
                            <div className={`flex items-center gap-1 ${
                                stat.trend === "up" ? "text-green-600" : "text-red-600"
                            }`}>
                                {stat.trend === "up" ? (
                                    <ArrowUpRight className="h-4 w-4" />
                                ) : (
                                    <ArrowDownRight className="h-4 w-4" />
                                )}
                                <span className="text-sm font-medium">{stat.change}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
} 