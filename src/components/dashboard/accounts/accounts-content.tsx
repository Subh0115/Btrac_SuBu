"use client";

import { useState, useEffect } from "react";
import { AccountsHeader } from "./header";
import { AccountsList } from "./accounts-list";
import { AccountsOverview } from "./accounts-overview";
import { AccountsActivity } from "./accounts-activity";
import { AccountsAnalytics } from "./accounts-analytics";
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

const initialAccounts: Account[] = [
    {
        id: "1",
        name: "Main Checking",
        type: "checking",
        icon: Building,
        balance: 12500.75,
        accountNumber: "**** 1234",
        bank: "Chase Bank",
        color: "bg-blue-500",
        transactions: [
            { date: "2024-03-29", description: "Salary Deposit", amount: 5000.00 },
            { date: "2024-03-28", description: "Credit Card Payment", amount: -1500.00 },
        ],
    },
    {
        id: "2",
        name: "Savings Account",
        type: "savings",
        icon: Building,
        balance: 45000.50,
        accountNumber: "**** 5678",
        bank: "Bank of America",
        color: "bg-green-500",
        transactions: [
            { date: "2024-03-29", description: "Interest Credit", amount: 25.50 },
            { date: "2024-03-28", description: "Transfer to Checking", amount: -1000.00 },
        ],
    },
    {
        id: "3",
        name: "Credit Card",
        type: "credit",
        icon: CreditCard,
        balance: -2750.25,
        accountNumber: "**** 9012",
        bank: "American Express",
        color: "bg-purple-500",
        transactions: [
            { date: "2024-03-29", description: "Grocery Shopping", amount: -250.75 },
            { date: "2024-03-28", description: "Coffee Shop", amount: -15.50 },
        ],
    },
    {
        id: "4",
        name: "Investment Portfolio",
        type: "investment",
        icon: Briefcase,
        balance: 28250.00,
        accountNumber: "**** 3456",
        bank: "Fidelity",
        color: "bg-orange-500",
        transactions: [
            { date: "2024-03-29", description: "Stock Dividend", amount: 150.00 },
            { date: "2024-03-28", description: "Stock Purchase", amount: -1000.00 },
        ],
    },
];

export function AccountsContent() {
    const [mounted, setMounted] = useState(false);
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        setMounted(true);
        setAccounts(initialAccounts);
    }, []);

    const filteredAccounts = accounts.filter(account => 
        account.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        account.bank.toLowerCase().includes(searchQuery.toLowerCase()) ||
        account.type.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleAddAccount = (newAccount: Omit<Account, "id" | "transactions">) => {
        const account: Account = {
            ...newAccount,
            id: Math.random().toString(36).substr(2, 9),
            transactions: [],
        };
        setAccounts([...accounts, account]);
    };

    const handleEditAccount = (updatedAccount: Account) => {
        setAccounts(accounts.map(account => 
            account.id === updatedAccount.id ? updatedAccount : account
        ));
    };

    const handleRemoveAccount = (accountId: string) => {
        setAccounts(accounts.filter(account => account.id !== accountId));
    };

    if (!mounted) {
        return null;
    }

    return (
        <div className="flex-1 space-y-8 p-8">
            <AccountsHeader 
                onSearch={setSearchQuery}
                onAddAccount={handleAddAccount}
            />
            
            {/* Overview Cards */}
            <AccountsOverview accounts={accounts} />
            
            {/* Main Content */}
            <div className="grid gap-8 lg:grid-cols-3">
                {/* Left Column - Account List and Analytics */}
                <div className="space-y-8 lg:col-span-2">
                    <AccountsList 
                        accounts={filteredAccounts}
                        onEditAccount={handleEditAccount}
                        onRemoveAccount={handleRemoveAccount}
                    />
                    <AccountsAnalytics accounts={accounts} />
                </div>
                
                {/* Right Column - Activity */}
                <div className="lg:col-span-1">
                    <AccountsActivity accounts={accounts} />
                </div>
            </div>
        </div>
    );
} 