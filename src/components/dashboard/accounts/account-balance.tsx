"use client";

import { Card } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, DollarSign } from "lucide-react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const data = [
    { name: "Jan", balance: 4000 },
    { name: "Feb", balance: 4500 },
    { name: "Mar", balance: 5000 },
    { name: "Apr", balance: 4800 },
    { name: "May", balance: 5200 },
    { name: "Jun", balance: 5500 },
];

export function AccountBalance() {
    return (
        <Card className="p-6">
            <div className="flex items-center justify-between">
                <h3 className="font-medium">Total Balance</h3>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
            </div>

            <div className="mt-4">
                <p className="text-3xl font-bold">$40,500.25</p>
                <div className="mt-2 flex items-center gap-2">
                    <div className="flex items-center text-green-600">
                        <ArrowUpRight className="h-4 w-4" />
                        <span className="text-sm">+12.5%</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                        from last month
                    </span>
                </div>
            </div>

            <div className="mt-6 h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid
                            strokeDasharray="3 3"
                            className="stroke-muted"
                        />
                        <XAxis
                            dataKey="name"
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `$${value}`}
                        />
                        <Tooltip />
                        <Line
                            type="monotone"
                            dataKey="balance"
                            stroke="#8884d8"
                            strokeWidth={2}
                            dot={false}
                            activeDot={{
                                r: 4,
                                style: { fill: "#8884d8" },
                            }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
} 