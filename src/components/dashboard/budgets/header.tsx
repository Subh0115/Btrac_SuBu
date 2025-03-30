"use client";

import { useState } from "react";
import { Search, Plus, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
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

interface BudgetsHeaderProps {
    onSearch: (query: string) => void;
    onAddBudget: (budget: any) => void;
    onDownload: (format: "csv" | "pdf") => void;
}

export function BudgetsHeader({
    onSearch,
    onAddBudget,
    onDownload,
}: BudgetsHeaderProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        category: "",
        amount: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Create new budget
        const newBudget = {
            name: formData.name,
            category: formData.category,
            amount: parseFloat(formData.amount),
            status: "active" as const,
        };

        // Call the parent handler
        onAddBudget(newBudget);

        // Show success toast
        toast.success("Budget created successfully", {
            duration: 3000,
        });

        // Reset form and close dialog
        setFormData({
            name: "",
            category: "",
            amount: "",
        });
        setIsOpen(false);
    };

    return (
        <Card className="border-none shadow-sm bg-gradient-to-r from-blue-600 to-indigo-600">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <Wallet className="h-6 w-6 text-blue-100" />
                        <CardTitle className="text-2xl font-bold text-blue-50">
                            Budgets
                        </CardTitle>
                    </div>
                    <CardDescription className="text-blue-100">
                        Manage your spending limits and track your budget progress
                    </CardDescription>
                </div>
                <div className="flex items-center space-x-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-blue-400" />
                        <Input
                            placeholder="Search budgets..."
                            className="pl-9 w-[250px] bg-white/95 border-blue-200/50 text-gray-900 placeholder:text-gray-400 focus:border-blue-300 focus:ring-blue-200/50 shadow-sm"
                            onChange={(e) => onSearch(e.target.value)}
                        />
                    </div>
                    <Dialog open={isOpen} onOpenChange={setIsOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-gray-900 hover:bg-gray-800 text-white">
                                <Plus className="mr-2 h-4 w-4" />
                                Add Budget
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <form onSubmit={handleSubmit}>
                                <DialogHeader>
                                    <DialogTitle>Add New Budget</DialogTitle>
                                    <DialogDescription>
                                        Create a new budget to track your spending.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">Budget Name</Label>
                                        <Input
                                            id="name"
                                            value={formData.name}
                                            onChange={(e) =>
                                                setFormData({ ...formData, name: e.target.value })
                                            }
                                            required
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="category">Category</Label>
                                        <Select
                                            value={formData.category}
                                            onValueChange={(value) =>
                                                setFormData({ ...formData, category: value })
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="food">Food</SelectItem>
                                                <SelectItem value="transportation">Transportation</SelectItem>
                                                <SelectItem value="entertainment">Entertainment</SelectItem>
                                                <SelectItem value="utilities">Utilities</SelectItem>
                                                <SelectItem value="shopping">Shopping</SelectItem>
                                                <SelectItem value="other">Other</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="amount">Amount</Label>
                                        <Input
                                            id="amount"
                                            type="number"
                                            value={formData.amount}
                                            onChange={(e) =>
                                                setFormData({ ...formData, amount: e.target.value })
                                            }
                                            required
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-purple-50">
                                        Create Budget
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </CardHeader>
        </Card>
    );
} 