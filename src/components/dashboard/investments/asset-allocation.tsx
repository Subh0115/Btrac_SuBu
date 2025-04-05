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
    { name: "Stocks", value: 75450.30, color: "#3B82F6" },  // blue-500
    { name: "Bonds", value: 25150.10, color: "#22C55E" },   // green-500
    { name: "Real Estate", value: 15100.60, color: "#A855F7" }, // purple-500
    { name: "Crypto", value: 5025.25, color: "#F97316" },   // orange-500
    { name: "Cash", value: 5024.25, color: "#64748B" },     // slate-500
];

const totalValue = data.reduce((acc, item) => acc + item.value, 0);

export function AssetAllocation() {
    return (
        <Card className="p-6">
            <div className="mb-6">
                <h3 className="text-lg font-medium">Asset Allocation</h3>
                <p className="text-sm text-muted-foreground">
                    Your investment distribution across asset classes
                </p>
            </div>

            <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={2}
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

            <div className="mt-6 space-y-2">
                {data.map((item) => (
                    <div key={item.name} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                            <div 
                                className="h-3 w-3 rounded-full" 
                                style={{ backgroundColor: item.color }}
                            />
                            <span>{item.name}</span>
                        </div>
                        <div className="text-right">
                            <p className="font-medium">{formatAmount(item.value)}</p>
                            <p className="text-xs text-muted-foreground">
                                {((item.value / totalValue) * 100).toFixed(1)}%
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
} 