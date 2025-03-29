"use client";

import { ArrowDown, ArrowUp, DollarSign, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatAmount } from "@/lib/utils";

interface Transaction {
    id: string;
    date: string;
    description: string;
    amount: number;
    category: string;
    accountId: string;
    accountName: string;
    status: "completed" | "pending" | "failed";
    tags: string[];
    receipt?: string;
}

interface TransactionsOverviewProps {
    transactions: Transaction[];
}

export function TransactionsOverview({ transactions }: TransactionsOverviewProps) {
    const totalIncome = transactions
        .filter((t) => t.amount > 0)
        .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = transactions
        .filter((t) => t.amount < 0)
        .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    const averageTransaction =
        transactions.reduce((sum, t) => sum + Math.abs(t.amount), 0) /
        transactions.length;

    const netChange = totalIncome - totalExpenses;
    const savingsRate = totalIncome > 0 ? (netChange / totalIncome) * 100 : 0;

    const stats = [
        {
            title: "Total Income",
            value: formatAmount(totalIncome),
            trend: "+12.5%",
            icon: ArrowUp,
            color: "text-green-600",
        },
        {
            title: "Total Expenses",
            value: formatAmount(totalExpenses),
            trend: "+8.2%",
            icon: ArrowDown,
            color: "text-red-600",
        },
        {
            title: "Average Transaction",
            value: formatAmount(averageTransaction),
            trend: "+5.3%",
            icon: DollarSign,
            color: "text-blue-600",
        },
        {
            title: "Net Change",
            value: formatAmount(netChange),
            trend: `${savingsRate.toFixed(1)}%`,
            icon: TrendingUp,
            color: netChange >= 0 ? "text-green-600" : "text-red-600",
        },
    ];

    return (
        <>
            {stats.map((stat) => (
                <Card key={stat.title}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            {stat.title}
                        </CardTitle>
                        <stat.icon className={`h-4 w-4 ${stat.color}`} />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <p className="text-xs text-muted-foreground">
                            {stat.trend} from last month
                        </p>
                    </CardContent>
                </Card>
            ))}
        </>
    );
} 