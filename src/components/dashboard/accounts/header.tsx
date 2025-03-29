"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
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

interface AccountsHeaderProps {
    onSearch: (query: string) => void;
    onAddAccount: (account: Omit<Account, "id" | "transactions">) => void;
}

export function AccountsHeader({ onSearch, onAddAccount }: AccountsHeaderProps) {
    const [mounted, setMounted] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        type: "",
        bank: "",
        balance: "",
    });

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const iconMap: { [key: string]: any } = {
            checking: Building,
            savings: Building,
            credit: CreditCard,
            investment: Briefcase,
        };

        const colorMap: { [key: string]: string } = {
            checking: "bg-blue-500",
            savings: "bg-green-500",
            credit: "bg-purple-500",
            investment: "bg-orange-500",
        };

        const newAccount = {
            name: formData.name,
            type: formData.type,
            icon: iconMap[formData.type],
            balance: parseFloat(formData.balance),
            accountNumber: `**** ${Math.floor(Math.random() * 9000) + 1000}`,
            bank: formData.bank,
            color: colorMap[formData.type],
        };

        onAddAccount(newAccount);
        setIsOpen(false);
        setFormData({ name: "", type: "", bank: "", balance: "" });
    };

    if (!mounted) {
        return null;
    }

    return (
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Accounts</h2>
                <p className="text-muted-foreground">
                    Manage your financial accounts and track balances
                </p>
            </div>
            <div className="flex items-center gap-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search accounts..."
                        className="pl-9 w-[300px]"
                        onChange={(e) => onSearch(e.target.value)}
                    />
                </div>
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Account
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New Account</DialogTitle>
                            <DialogDescription>
                                Add a new financial account to track your finances.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Account Name</Label>
                                <Input 
                                    id="name" 
                                    placeholder="Enter account name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="type">Account Type</Label>
                                <Select 
                                    value={formData.type}
                                    onValueChange={(value) => setFormData({ ...formData, type: value })}
                                    required
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select account type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="checking">Checking</SelectItem>
                                        <SelectItem value="savings">Savings</SelectItem>
                                        <SelectItem value="credit">Credit Card</SelectItem>
                                        <SelectItem value="investment">Investment</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="bank">Bank/Institution</Label>
                                <Input 
                                    id="bank" 
                                    placeholder="Enter bank or institution name"
                                    value={formData.bank}
                                    onChange={(e) => setFormData({ ...formData, bank: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="balance">Initial Balance</Label>
                                <Input 
                                    id="balance" 
                                    type="number" 
                                    placeholder="Enter initial balance"
                                    value={formData.balance}
                                    onChange={(e) => setFormData({ ...formData, balance: e.target.value })}
                                    required
                                />
                            </div>
                            <Button type="submit" className="mt-4">Add Account</Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
} 