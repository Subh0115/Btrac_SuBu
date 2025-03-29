"use client";

import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

function formatAmount(amount: number) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
}

const data = [
    { name: "Shopping", value: 450.75, color: "#3B82F6" },  // blue-500
    { name: "Housing", value: 1200, color: "#22C55E" },     // green-500
    { name: "Transportation", value: 280.50, color: "#A855F7" }, // purple-500
    { name: "Food & Dining", value: 385.25, color: "#F97316" }, // orange-500
    { name: "Entertainment", value: 150.99, color: "#EC4899" }, // pink-500
    { name: "Travel", value: 1200, color: "#EAB308" },      // yellow-500
];

const totalBudget = data.reduce((acc, item) => acc + item.value, 0);
const totalSpent = 3667.49; // Sum of all spent amounts

export function BudgetOverview() {
    return (
        <Card className="p-6">
            <div className="mb-6">
                <h3 className="text-lg font-medium">Budget Overview</h3>
                <p className="text-sm text-muted-foreground">
                    Your spending distribution across categories
                </p>
            </div>
            
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-muted-foreground">Total Budget</p>
                        <p className="text-2xl font-bold">{formatAmount(totalBudget)}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-muted-foreground">Total Spent</p>
                        <p className="text-2xl font-bold">{formatAmount(totalSpent)}</p>
                    </div>
                </div>

                <div className="h-[300px] mt-6">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell 
                                        key={`cell-${index}`} 
                                        fill={entry.color}
                                    />
                                ))}
                            </Pie>
                            <Legend 
                                verticalAlign="bottom" 
                                height={36}
                                formatter={(value) => <span className="text-sm">{value}</span>}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="space-y-2">
                    {data.map((item) => (
                        <div key={item.name} className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                                <div 
                                    className="h-3 w-3 rounded-full" 
                                    style={{ backgroundColor: item.color }}
                                />
                                <span>{item.name}</span>
                            </div>
                            <span className="font-medium">
                                {formatAmount(item.value)}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    );
} 