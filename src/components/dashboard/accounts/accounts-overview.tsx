"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatAmount } from "@/lib/utils";
import { Building, CreditCard, Briefcase } from "lucide-react";

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

interface AccountsOverviewProps {
    accounts: Account[];
}

export function AccountsOverview({ accounts }: AccountsOverviewProps) {
    const accountTypes = {
        checking: {
            icon: Building,
            color: "bg-blue-500",
            label: "Checking",
        },
        savings: {
            icon: Building,
            color: "bg-green-500",
            label: "Savings",
        },
        credit: {
            icon: CreditCard,
            color: "bg-purple-500",
            label: "Credit",
        },
        investment: {
            icon: Briefcase,
            color: "bg-orange-500",
            label: "Investment",
        },
    };

    const overviewCards = Object.entries(accountTypes).map(([type, info]) => {
        const typeAccounts = accounts.filter(account => account.type === type);
        const totalBalance = typeAccounts.reduce((sum, account) => sum + account.balance, 0);
        const accountCount = typeAccounts.length;

        return {
            type,
            label: info.label,
            icon: info.icon,
            color: info.color,
            balance: totalBalance,
            count: accountCount,
        };
    });

    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {overviewCards.map((card) => (
                <Card key={card.type} className="border-none shadow-sm bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className={`rounded-full p-2 bg-blue-600`}>
                                <card.icon className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                                    {card.label}
                                </p>
                                <p className="text-2xl font-semibold text-blue-900 dark:text-blue-100">
                                    {formatAmount(card.balance)}
                                </p>
                                <p className="text-sm text-blue-700 dark:text-blue-300">
                                    {card.count} {card.count === 1 ? "account" : "accounts"}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
} 