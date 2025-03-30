"use client";

import { useState, useEffect } from "react";
import { DateRange } from "react-day-picker";
import { BudgetsHeader } from "./header";
import { BudgetsFilters } from "./filters";
import { BudgetsOverview } from "./overview";
import { BudgetsList } from "./list";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";

interface Budget {
    id: string;
    name: string;
    category: string;
    amount: number;
    spent: number;
    startDate: string;
    endDate: string;
    status: "active" | "completed" | "overdue";
    transactions: string[];
}

interface Account {
    id: string;
    name: string;
    balance: number;
    type: string;
}

interface BudgetsContentProps {
    budgets: Budget[];
    accounts: Account[];
}

export function BudgetsContent({ budgets: initialBudgets, accounts }: BudgetsContentProps) {
    const [budgets, setBudgets] = useState(initialBudgets);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredBudgets, setFilteredBudgets] = useState(initialBudgets);

    // Update filtered budgets whenever filters change
    useEffect(() => {
        const filtered = budgets.filter((budget) => {
            const matchesSearch = budget.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                budget.category.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesSearch;
        });

        setFilteredBudgets(filtered);
    }, [budgets, searchQuery]);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    const handleFilterChange = (filters: { category: string; status: string }) => {
        const filtered = budgets.filter((budget) => {
            const matchesSearch = budget.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                budget.category.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = filters.category === "all" || budget.category === filters.category;
            const matchesStatus = filters.status === "all" || budget.status === filters.status;

            return matchesSearch && matchesCategory && matchesStatus;
        });

        setFilteredBudgets(filtered);
    };

    const handleAddBudget = (budget: any) => {
        const newBudget = {
            ...budget,
            id: Date.now().toString(),
            spent: 0,
            transactions: [],
        };
        setBudgets((prev) => [newBudget, ...prev]);
        toast.success("Budget added successfully");
    };

    const handleDeleteBudget = (id: string) => {
        setBudgets((prev) => prev.filter((b) => b.id !== id));
        toast.success("Budget deleted successfully");
    };

    const handleEditBudget = (id: string, updatedBudget: any) => {
        setBudgets((prev) =>
            prev.map((b) => (b.id === id ? { ...b, ...updatedBudget } : b))
        );
        toast.success("Budget updated successfully");
    };

    const handleDownload = (format: "csv" | "pdf") => {
        // Implement download functionality
        toast.success(`Downloading budgets as ${format.toUpperCase()}`);
    };

    return (
        <div className="flex h-full flex-col space-y-8 p-8">
            <div className="flex flex-col space-y-6">
                <BudgetsHeader
                    onSearch={handleSearch}
                    onAddBudget={handleAddBudget}
                    onDownload={handleDownload}
                />
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <BudgetsOverview budgets={filteredBudgets} />
                </div>
            </div>

            <div className="flex-1 grid gap-8 lg:grid-cols-12">
                <div className="lg:col-span-3">
                    <div className="sticky top-0 space-y-6">
                        <BudgetsFilters onFilterChange={handleFilterChange} />
                        <Card className="border-none shadow-sm bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/50 dark:to-violet-950/50">
                            <div className="p-4">
                                <h3 className="font-semibold mb-4 text-purple-900 dark:text-purple-100">Quick Stats</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-2 rounded-lg bg-white/50 dark:bg-purple-900/30">
                                        <p className="text-sm text-purple-700 dark:text-purple-300">Average Budget</p>
                                        <p className="text-lg font-semibold text-purple-900 dark:text-purple-100">
                                            ${(filteredBudgets.reduce((sum, b) => sum + b.amount, 0) / (filteredBudgets.length || 1)).toFixed(2)}
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-between p-2 rounded-lg bg-white/50 dark:bg-purple-900/30">
                                        <p className="text-sm text-purple-700 dark:text-purple-300">Total Categories</p>
                                        <p className="text-lg font-semibold text-purple-900 dark:text-purple-100">
                                            {new Set(filteredBudgets.map(b => b.category)).size}
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-between p-2 rounded-lg bg-white/50 dark:bg-purple-900/30">
                                        <p className="text-sm text-purple-700 dark:text-purple-300">Active Budgets</p>
                                        <p className="text-lg font-semibold text-purple-900 dark:text-purple-100">
                                            {filteredBudgets.filter(b => b.status === "active").length}
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-between p-2 rounded-lg bg-white/50 dark:bg-purple-900/30">
                                        <p className="text-sm text-purple-700 dark:text-purple-300">Total Spent</p>
                                        <p className="text-lg font-semibold text-purple-900 dark:text-purple-100">
                                            ${filteredBudgets.reduce((sum, b) => sum + b.spent, 0).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
                <div className="lg:col-span-9">
                    <BudgetsList
                        budgets={filteredBudgets}
                        onDeleteBudget={handleDeleteBudget}
                        onEditBudget={handleEditBudget}
                    />
                </div>
            </div>
        </div>
    );
} 