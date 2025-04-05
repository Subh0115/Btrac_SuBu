"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatAmount } from "@/lib/utils";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

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

interface TransactionsAnalyticsProps {
    transactions: Transaction[];
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

export function TransactionsAnalytics({ transactions }: TransactionsAnalyticsProps) {
    // Calculate spending by category
    const spendingByCategory = transactions
        .filter((t) => t.amount < 0)
        .reduce((acc, t) => {
            acc[t.category] = (acc[t.category] || 0) + Math.abs(t.amount);
            return acc;
        }, {} as Record<string, number>);

    const categoryData = Object.entries(spendingByCategory).map(([name, value]) => ({
        name,
        value,
    }));

    // Calculate monthly spending
    const monthlySpending = transactions
        .filter((t) => t.amount < 0)
        .reduce((acc, t) => {
            const month = new Date(t.date).toLocaleString("default", { month: "short" });
            acc[month] = (acc[month] || 0) + Math.abs(t.amount);
            return acc;
        }, {} as Record<string, number>);

    const monthlyData = Object.entries(monthlySpending).map(([month, amount]) => ({
        month,
        amount,
    }));

    // Calculate income vs expenses
    const income = transactions
        .filter((t) => t.amount > 0)
        .reduce((sum, t) => sum + t.amount, 0);

    const expenses = transactions
        .filter((t) => t.amount < 0)
        .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    const incomeExpensesData = [
        { name: "Income", value: income },
        { name: "Expenses", value: expenses },
    ];

    return (
        <Card className="col-span-full">
            <CardHeader>
                <CardTitle>Analytics</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Spending by Category */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-medium">Spending by Category</h3>
                        <div className="h-[200px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={categoryData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percent }) =>
                                            `${name} ${(percent * 100).toFixed(0)}%`
                                        }
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {categoryData.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={COLORS[index % COLORS.length]}
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        formatter={(value: number) =>
                                            formatAmount(value)
                                        }
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Monthly Spending */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-medium">Monthly Spending</h3>
                        <div className="h-[200px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={monthlyData}>
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip
                                        formatter={(value: number) =>
                                            formatAmount(value)
                                        }
                                    />
                                    <Bar dataKey="amount" fill="#8884d8" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Income vs Expenses */}
                    <div className="space-y-4 md:col-span-2">
                        <h3 className="text-sm font-medium">Income vs Expenses</h3>
                        <div className="h-[200px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={incomeExpensesData}>
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip
                                        formatter={(value: number) =>
                                            formatAmount(value)
                                        }
                                    />
                                    <Bar
                                        dataKey="value"
                                        fill="#8884d8"
                                        fillOpacity={0.8}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
} 