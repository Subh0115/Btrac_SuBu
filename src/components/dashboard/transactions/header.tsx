"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Download, Plus, ChevronDown, Receipt } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
}

interface TransactionsHeaderProps {
    onSearch: (query: string) => void;
    onDownload: (format: "csv" | "pdf") => void;
    onAddTransaction: (transaction: any) => void;
    accounts?: Account[];
}

export function TransactionsHeader({
    onSearch,
    onDownload,
    onAddTransaction,
    accounts = [],
}: TransactionsHeaderProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        description: "",
        amount: "",
        category: "",
        accountId: "",
        date: new Date().toISOString().split("T")[0],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Create new transaction
        const newTransaction = {
            description: formData.description,
            amount: parseFloat(formData.amount),
            category: formData.category,
            accountId: formData.accountId,
            accountName: accounts.find(acc => acc.id === formData.accountId)?.name || "",
            date: formData.date,
            status: "completed" as const,
            tags: [],
        };

        // Call the parent handler
        onAddTransaction(newTransaction);

        // Show success toast
        toast.success("Transaction added successfully", {
            duration: 3000,
        });

        // Reset form and close dialog
        setFormData({
            description: "",
            amount: "",
            category: "",
            accountId: "",
            date: new Date().toISOString().split("T")[0],
        });
        setIsOpen(false);
    };

    const handleDownload = (format: "csv" | "pdf") => {
        onDownload(format);
        toast.success(`Downloaded as ${format.toUpperCase()}`, {
            duration: 3000,
        });
    };

    return (
        <Card className="border-none shadow-sm bg-gradient-to-r from-blue-600 to-indigo-600">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <Receipt className="h-6 w-6 text-blue-100" />
                        <CardTitle className="text-2xl font-bold text-blue-50">
                            Transactions
                        </CardTitle>
                    </div>
                    <CardDescription className="text-blue-100">
                        Track and manage your financial transactions
                    </CardDescription>
                </div>
                <div className="flex items-center space-x-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-blue-400" />
                        <Input
                            placeholder="Search transactions..."
                            className="pl-9 w-[250px] bg-white/95 border-blue-200/50 text-gray-900 placeholder:text-gray-400 focus:border-blue-300 focus:ring-blue-200/50 shadow-sm"
                            onChange={(e) => onSearch(e.target.value)}
                        />
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="bg-purple-500/20 border-purple-300 text-purple-50 hover:bg-purple-500/30">
                                <Download className="mr-2 h-4 w-4" />
                                Download
                                <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleDownload("csv")}>
                                Download as CSV
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDownload("pdf")}>
                                Download as PDF
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Dialog open={isOpen} onOpenChange={setIsOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-gray-900 hover:bg-gray-800 text-white">
                                <Plus className="mr-2 h-4 w-4" />
                                Add Transaction
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <DialogHeader>
                                    <DialogTitle>Add New Transaction</DialogTitle>
                                    <DialogDescription>
                                        Enter the details of your new transaction.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Input
                                        id="description"
                                        placeholder="Enter description"
                                        value={formData.description}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                description: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="amount">Amount</Label>
                                    <Input
                                        id="amount"
                                        type="number"
                                        placeholder="Enter amount"
                                        value={formData.amount}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                amount: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="category">Category</Label>
                                    <Input
                                        id="category"
                                        placeholder="Enter category"
                                        value={formData.category}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                category: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="account">Account</Label>
                                    <Select
                                        value={formData.accountId}
                                        onValueChange={(value) =>
                                            setFormData({
                                                ...formData,
                                                accountId: value,
                                            })
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select account" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {accounts.map((account) => (
                                                <SelectItem
                                                    key={account.id}
                                                    value={account.id}
                                                >
                                                    {account.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="date">Date</Label>
                                    <Input
                                        id="date"
                                        type="date"
                                        value={formData.date}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                date: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-purple-50">
                                    Add Transaction
                                </Button>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </CardHeader>
        </Card>
    );
} 