"use client";

import { MoreHorizontal, Pencil, Trash, TrendingUp, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { formatAmount } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

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

interface InvestmentsListProps {
    investments: Investment[];
    onEditInvestment: (id: string, investment: Partial<Investment>) => void;
    onDeleteInvestment: (id: string) => void;
}

export function InvestmentsList({
    investments,
    onEditInvestment,
    onDeleteInvestment,
}: InvestmentsListProps) {
    return (
        <Card className="h-full flex flex-col">
            <CardHeader className="flex-none">
                <CardTitle>Investment Portfolio</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 p-0">
                <ScrollArea className="h-full">
                    <div className="space-y-4 p-6">
                        {investments.map((investment) => (
                            <div
                                key={investment.id}
                                className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted/50 transition-colors"
                            >
                                <div className="space-y-1 flex-1">
                                    <div className="flex items-center gap-2">
                                        <p className="font-medium">{investment.name}</p>
                                        <span className="text-sm text-muted-foreground">
                                            {investment.symbol}
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                        <span>{investment.type}</span>
                                        <span>•</span>
                                        <span>{investment.quantity} units</span>
                                    </div>
                                    <div className="flex items-center gap-2 mt-2">
                                        <span className="text-sm font-medium">
                                            {formatAmount(investment.currentPrice)}
                                        </span>
                                        <span className="text-sm text-muted-foreground">
                                            per unit
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-right">
                                        <div className="flex items-center gap-1">
                                            {investment.performance >= 0 ? (
                                                <TrendingUp className="h-4 w-4 text-green-500" />
                                            ) : (
                                                <TrendingDown className="h-4 w-4 text-red-500" />
                                            )}
                                            <span
                                                className={`text-sm font-medium ${
                                                    investment.performance >= 0
                                                        ? "text-green-500"
                                                        : "text-red-500"
                                                }`}
                                            >
                                                {investment.performance.toFixed(2)}%
                                            </span>
                                        </div>
                                        <span className="text-xs text-muted-foreground">
                                            Last updated: {investment.lastUpdated}
                                        </span>
                                    </div>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem
                                                onClick={() =>
                                                    onEditInvestment(investment.id, investment)
                                                }
                                            >
                                                <Pencil className="mr-2 h-4 w-4" />
                                                Edit
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={() =>
                                                    onDeleteInvestment(investment.id)
                                                }
                                            >
                                                <Trash className="mr-2 h-4 w-4" />
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    );
} 