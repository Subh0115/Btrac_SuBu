"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
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

interface InvestmentsAnalyticsProps {
    investments: Investment[];
}

export function InvestmentsAnalytics({ investments }: InvestmentsAnalyticsProps) {
    const totalValue = investments.reduce(
        (sum, inv) => sum + inv.quantity * inv.currentPrice,
        0
    );

    const stockValue = investments
        .filter((inv) => inv.type === "stock")
        .reduce((sum, inv) => sum + inv.quantity * inv.currentPrice, 0);

    const bondValue = investments
        .filter((inv) => inv.type === "bond")
        .reduce((sum, inv) => sum + inv.quantity * inv.currentPrice, 0);

    const mutualFundValue = investments
        .filter((inv) => inv.type === "mutual_fund")
        .reduce((sum, inv) => sum + inv.quantity * inv.currentPrice, 0);

    const cryptoValue = investments
        .filter((inv) => inv.type === "crypto")
        .reduce((sum, inv) => sum + inv.quantity * inv.currentPrice, 0);

    const stockPercentage = (stockValue / totalValue) * 100;
    const bondPercentage = (bondValue / totalValue) * 100;
    const mutualFundPercentage = (mutualFundValue / totalValue) * 100;
    const cryptoPercentage = (cryptoValue / totalValue) * 100;

    return (
        <Card className="h-full flex flex-col">
            <CardHeader className="flex-none">
                <CardTitle>Portfolio Analytics</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 space-y-6">
                <div className="space-y-4">
                    <div>
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-muted-foreground">Stocks</span>
                            <span className="font-medium">{formatAmount(stockValue)}</span>
                        </div>
                        <Progress 
                            value={stockPercentage} 
                            className="h-2 bg-blue-100 dark:bg-blue-900"
                            indicatorClassName="bg-blue-600 dark:bg-blue-400"
                        />
                    </div>

                    <div>
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-muted-foreground">Bonds</span>
                            <span className="font-medium">{formatAmount(bondValue)}</span>
                        </div>
                        <Progress 
                            value={bondPercentage} 
                            className="h-2 bg-blue-100 dark:bg-blue-900"
                            indicatorClassName="bg-blue-600 dark:bg-blue-400"
                        />
                    </div>

                    <div>
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-muted-foreground">Mutual Funds</span>
                            <span className="font-medium">{formatAmount(mutualFundValue)}</span>
                        </div>
                        <Progress 
                            value={mutualFundPercentage} 
                            className="h-2 bg-blue-100 dark:bg-blue-900"
                            indicatorClassName="bg-blue-600 dark:bg-blue-400"
                        />
                    </div>

                    <div>
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-muted-foreground">Cryptocurrency</span>
                            <span className="font-medium">{formatAmount(cryptoValue)}</span>
                        </div>
                        <Progress 
                            value={cryptoPercentage} 
                            className="h-2 bg-blue-100 dark:bg-blue-900"
                            indicatorClassName="bg-blue-600 dark:bg-blue-400"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <h4 className="text-sm font-medium">Portfolio Insights</h4>
                    <div className="space-y-2 text-sm text-muted-foreground">
                        <p>• Total Investments: {investments.length}</p>
                        <p>• Average Performance: {getAveragePerformance(investments)}%</p>
                        <p>• Most Valuable: {getMostValuableInvestment(investments)}</p>
                        <p>• Best Performer: {getBestPerformer(investments)}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

function getAveragePerformance(investments: Investment[]): number {
    if (investments.length === 0) return 0;
    const sum = investments.reduce((acc, inv) => acc + inv.performance, 0);
    return sum / investments.length;
}

function getMostValuableInvestment(investments: Investment[]): string {
    if (investments.length === 0) return "N/A";
    const mostValuable = investments.reduce((max, inv) => {
        const value = inv.quantity * inv.currentPrice;
        return value > max.value ? { name: inv.name, value } : max;
    }, { name: "", value: 0 });
    return mostValuable.name;
}

function getBestPerformer(investments: Investment[]): string {
    if (investments.length === 0) return "N/A";
    const bestPerformer = investments.reduce((max, inv) =>
        inv.performance > max.performance ? inv : max
    );
    return `${bestPerformer.name} (${bestPerformer.performance.toFixed(2)}%)`;
} 