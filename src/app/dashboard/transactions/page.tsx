"use client";

import { TransactionsContent } from "@/components/dashboard/transactions/transactions-content";
import { mockAccounts, mockTransactions } from "@/data/mock-data";

export default function TransactionsPage() {
    return (
        <TransactionsContent 
            transactions={mockTransactions}
            accounts={mockAccounts}
        />
    );
} 