"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatAmount } from "@/lib/utils";

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

interface AccountsActivityProps {
    accounts: Account[];
}

export function AccountsActivity({ accounts }: AccountsActivityProps) {
    // Get all transactions from all accounts and sort by date
    const allTransactions = accounts
        .flatMap(account => 
            account.transactions.map(transaction => ({
                ...transaction,
                accountName: account.name,
                accountType: account.type,
                accountIcon: account.icon,
                accountColor: account.color,
            }))
        )
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 5); // Show only the 5 most recent transactions

    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {allTransactions.map((transaction, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between rounded-lg border p-4 hover:bg-accent/50 transition-colors"
                        >
                            <div className="flex items-center gap-4">
                                <div className={`rounded-full p-2 ${transaction.accountColor}`}>
                                    <transaction.accountIcon className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <p className="font-medium">{transaction.description}</p>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <span>{transaction.accountName}</span>
                                        <span>•</span>
                                        <span>{new Date(transaction.date).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>
                            <p className={`font-medium ${
                                transaction.amount < 0 ? "text-red-600" : "text-green-600"
                            }`}>
                                {transaction.amount < 0 ? "-" : "+"}{formatAmount(Math.abs(transaction.amount))}
                            </p>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
} 