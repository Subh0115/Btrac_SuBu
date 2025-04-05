"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Building2 } from "lucide-react";
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
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";

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
        accountNumber: "",
        balance: "",
        color: "",
    });

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Create new account
        const newAccount = {
            name: formData.name,
            type: formData.type,
            bank: formData.bank,
            accountNumber: formData.accountNumber,
            balance: parseFloat(formData.balance),
            color: formData.color,
            icon: formData.type === "checking" ? CreditCard : formData.type === "savings" ? Building : Briefcase,
        };

        // Call the parent handler
        onAddAccount(newAccount);

        // Show success toast
        toast.success("Account created successfully", {
            duration: 3000,
        });

        // Reset form and close dialog
        setFormData({
            name: "",
            type: "",
            bank: "",
            accountNumber: "",
            balance: "",
            color: "",
        });
        setIsOpen(false);
    };

    if (!mounted) {
        return null;
    }

    return (
        <Card className="border-none shadow-sm bg-gradient-to-r from-blue-600 to-indigo-600">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <Building2 className="h-6 w-6 text-blue-100" />
                        <CardTitle className="text-2xl font-bold text-blue-50">
                            Accounts
                        </CardTitle>
                    </div>
                    <CardDescription className="text-blue-100">
                        Manage your financial accounts and track balances
                    </CardDescription>
                </div>
                <div className="flex items-center space-x-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-blue-400" />
                        <Input
                            placeholder="Search accounts..."
                            className="pl-9 w-[250px] bg-white/95 border-blue-200/50 text-gray-900 placeholder:text-gray-400 focus:border-blue-300 focus:ring-blue-200/50 shadow-sm"
                            onChange={(e) => onSearch(e.target.value)}
                        />
                    </div>
                    <Dialog open={isOpen} onOpenChange={setIsOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-gray-900 hover:bg-gray-800 text-white">
                                <Plus className="mr-2 h-4 w-4" />
                                Add Account
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <DialogHeader>
                                    <DialogTitle>Add New Account</DialogTitle>
                                    <DialogDescription>
                                        Create a new account to track your finances.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-2">
                                    <Label htmlFor="name">Account Name</Label>
                                    <Input
                                        id="name"
                                        value={formData.name}
                                        onChange={(e) =>
                                            setFormData({ ...formData, name: e.target.value })
                                        }
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="type">Account Type</Label>
                                    <Select
                                        value={formData.type}
                                        onValueChange={(value) =>
                                            setFormData({ ...formData, type: value })
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select account type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="checking">Checking</SelectItem>
                                            <SelectItem value="savings">Savings</SelectItem>
                                            <SelectItem value="investment">Investment</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="bank">Bank</Label>
                                    <Input
                                        id="bank"
                                        value={formData.bank}
                                        onChange={(e) =>
                                            setFormData({ ...formData, bank: e.target.value })
                                        }
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="accountNumber">Account Number</Label>
                                    <Input
                                        id="accountNumber"
                                        value={formData.accountNumber}
                                        onChange={(e) =>
                                            setFormData({ ...formData, accountNumber: e.target.value })
                                        }
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="balance">Initial Balance</Label>
                                    <Input
                                        id="balance"
                                        type="number"
                                        value={formData.balance}
                                        onChange={(e) =>
                                            setFormData({ ...formData, balance: e.target.value })
                                        }
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="color">Color Theme</Label>
                                    <Select
                                        value={formData.color}
                                        onValueChange={(value) =>
                                            setFormData({ ...formData, color: value })
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select color theme" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="bg-blue-500">Blue</SelectItem>
                                            <SelectItem value="bg-green-500">Green</SelectItem>
                                            <SelectItem value="bg-purple-500">Purple</SelectItem>
                                            <SelectItem value="bg-orange-500">Orange</SelectItem>
                                            <SelectItem value="bg-pink-500">Pink</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-purple-50">
                                    Create Account
                                </Button>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </CardHeader>
        </Card>
    );
} 