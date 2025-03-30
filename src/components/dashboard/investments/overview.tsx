"use client";

import { TrendingUp, DollarSign, PieChart, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatAmount } from "@/lib/utils";

interface Investment {
    id: string;
    name: string;
    type: "stock" | "bond" | "mutual_fund" | "crypto";
    symbol: string;
    quantity: number;
    purchasePrice: number;
    currentPrice: number;
    performance: number;
    lastUpdated: string;
}

interface InvestmentsOverviewProps {
    investments: Investment[];
}

export function InvestmentsOverview({ investments }: InvestmentsOverviewProps) {
    const totalValue = investments.reduce(
        (sum, inv) => sum + inv.quantity * inv.currentPrice,
        0
    );

    const totalCost = investments.reduce(
        (sum, inv) => sum + inv.quantity * inv.purchasePrice,
        0
    );

    const totalPerformance = totalValue - totalCost;
    const performancePercentage = (totalPerformance / totalCost) * 100;

    const stockInvestments = investments.filter((inv) => inv.type === "stock");
    const bondInvestments = investments.filter((inv) => inv.type === "bond");
    const mutualFundInvestments = investments.filter(
        (inv) => inv.type === "mutual_fund"
    );
    const cryptoInvestments = investments.filter(
        (inv) => inv.type === "crypto"
    );

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                        Total Portfolio Value
                    </CardTitle>
                    <TrendingUp className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">
                        {formatAmount(totalValue)}
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-blue-600 dark:text-blue-400">
                        Total Performance
                    </CardTitle>
                    {performancePercentage >= 0 ? (
                        <ArrowUpRight className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    ) : (
                        <ArrowDownRight className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    )}
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                        {formatAmount(totalPerformance)}
                    </div>
                    <p className="text-xs text-blue-600 dark:text-blue-400">
                        {performancePercentage.toFixed(2)}%
                    </p>
                </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-purple-600 dark:text-purple-400">
                        Asset Allocation
                    </CardTitle>
                    <PieChart className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                        {investments.length}
                    </div>
                    <p className="text-xs text-purple-600 dark:text-purple-400">
                        {stockInvestments.length} Stocks • {bondInvestments.length} Bonds •{" "}
                        {mutualFundInvestments.length} Mutual Funds • {cryptoInvestments.length} Crypto
                    </p>
                </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-amber-600 dark:text-amber-400">
                        Average Cost Basis
                    </CardTitle>
                    <DollarSign className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-amber-700 dark:text-amber-300">
                        {formatAmount(totalCost / investments.length)}
                    </div>
                    <p className="text-xs text-amber-600 dark:text-amber-400">
                        Per investment
                    </p>
                </CardContent>
            </Card>
        </div>
    );
} 