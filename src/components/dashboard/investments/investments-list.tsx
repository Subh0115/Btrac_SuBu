"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowDownRight, MoreHorizontal } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function formatAmount(amount: number) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
}

const investments = [
    {
        id: "1",
        name: "Apple Inc.",
        symbol: "AAPL",
        type: "Stocks",
        invested: 10000,
        currentValue: 12500.75,
        units: 50,
        purchaseDate: "2024-01-15",
    },
    {
        id: "2",
        name: "US Treasury Bond",
        symbol: "USTB",
        type: "Bonds",
        invested: 25000,
        currentValue: 25750.50,
        units: 25,
        purchaseDate: "2023-12-01",
    },
    {
        id: "3",
        name: "Real Estate Fund",
        symbol: "REIT",
        type: "Real Estate",
        invested: 15000,
        currentValue: 15100.60,
        units: 100,
        purchaseDate: "2024-02-10",
    },
    {
        id: "4",
        name: "Bitcoin",
        symbol: "BTC",
        type: "Crypto",
        invested: 5000,
        currentValue: 5025.25,
        units: 0.1,
        purchaseDate: "2024-03-01",
    },
];

export function InvestmentsList() {
    return (
        <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium">Your Investments</h3>
                <Button variant="outline" size="sm">View All</Button>
            </div>
            <div className="space-y-6">
                {investments.map((investment) => {
                    const profit = investment.currentValue - investment.invested;
                    const profitPercentage = (profit / investment.invested) * 100;
                    const isProfit = profit >= 0;

                    return (
                        <div key={investment.id} className="space-y-2">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium">{investment.name}</span>
                                        <span className="text-sm text-muted-foreground">
                                            {investment.symbol}
                                        </span>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        {investment.type} • {investment.units} units
                                    </p>
                                </div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            className="h-8 w-8 p-0"
                                        >
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem>View Details</DropdownMenuItem>
                                        <DropdownMenuItem>Edit Investment</DropdownMenuItem>
                                        <DropdownMenuItem className="text-red-600">
                                            Sell Investment
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <div className="grid grid-cols-2 gap-x-8 gap-y-1">
                                    <span className="text-muted-foreground">Invested</span>
                                    <span className="font-medium">{formatAmount(investment.invested)}</span>
                                    <span className="text-muted-foreground">Current Value</span>
                                    <span className="font-medium">{formatAmount(investment.currentValue)}</span>
                                </div>
                                <div className={`flex items-center gap-1 ${
                                    isProfit ? "text-green-600" : "text-red-600"
                                }`}>
                                    {isProfit ? (
                                        <ArrowUpRight className="h-4 w-4" />
                                    ) : (
                                        <ArrowDownRight className="h-4 w-4" />
                                    )}
                                    <span className="font-medium">
                                        {profitPercentage >= 0 ? "+" : ""}
                                        {profitPercentage.toFixed(2)}%
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