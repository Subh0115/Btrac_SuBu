"use client";

import { useState, useEffect } from "react";
import { DateRange } from "react-day-picker";
import { TransactionsHeader } from "./header";
import { TransactionsFilters } from "./filters";
import { TransactionsOverview } from "./overview";
import { TransactionsList } from "./list";
import { mockTransactions, mockAccounts } from "@/data/mock-data";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Download, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export function TransactionsContent() {
    const [transactions, setTransactions] = useState(mockTransactions);
    const [searchQuery, setSearchQuery] = useState("");
    const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedAccounts, setSelectedAccounts] = useState<string[]>([]);
    const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
    const [filteredTransactions, setFilteredTransactions] = useState(mockTransactions);

    // Update filtered transactions whenever filters change
    useEffect(() => {
        const filtered = transactions.filter((transaction) => {
            const matchesSearch = transaction.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesDateRange = !dateRange || (
                (!dateRange.from || new Date(transaction.date) >= dateRange.from) &&
                (!dateRange.to || new Date(transaction.date) <= dateRange.to)
            );
            const matchesCategory =
                selectedCategories.length === 0 || selectedCategories.includes(transaction.category);
            const matchesAccount =
                selectedAccounts.length === 0 || selectedAccounts.includes(transaction.accountId);
            const matchesStatus =
                selectedStatus.length === 0 || selectedStatus.includes(transaction.status);

            return matchesSearch && matchesDateRange && matchesCategory && matchesAccount && matchesStatus;
        });

        setFilteredTransactions(filtered);
    }, [transactions, searchQuery, dateRange, selectedCategories, selectedAccounts, selectedStatus]);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    const handleAddTransaction = (transaction: any) => {
        const newTransaction = {
            ...transaction,
            id: Date.now().toString(),
            date: new Date().toISOString(),
        };
        setTransactions((prev) => [newTransaction, ...prev]);
        toast.success("Transaction added successfully");
    };

    const handleDeleteTransaction = (id: string) => {
        setTransactions((prev) => prev.filter((t) => t.id !== id));
        toast.success("Transaction deleted successfully");
    };

    const handleEditTransaction = (id: string, updatedTransaction: any) => {
        setTransactions((prev) =>
            prev.map((t) => (t.id === id ? { ...t, ...updatedTransaction } : t))
        );
        toast.success("Transaction updated successfully");
    };

    const handleDownload = (format: "csv" | "pdf") => {
        if (format === "csv") {
            const headers = [
                "Date",
                "Description",
                "Amount",
                "Category",
                "Account",
                "Status",
            ];
            const csvContent = [
                headers.join(","),
                ...filteredTransactions.map((t) =>
                    [
                        t.date,
                        t.description,
                        t.amount,
                        t.category,
                        t.accountName,
                        t.status,
                    ].join(",")
                ),
            ].join("\n");

            const blob = new Blob([csvContent], { type: "text/csv" });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "transactions.csv";
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } else if (format === "pdf") {
            try {
                // Create HTML content for PDF
                const htmlContent = `
                    <html>
                        <head>
                            <style>
                                body { font-family: Arial, sans-serif; padding: 20px; }
                                h1 { font-size: 24px; margin-bottom: 10px; }
                                .date { font-size: 14px; color: #666; margin-bottom: 20px; }
                                .summary { margin-bottom: 20px; }
                                table { width: 100%; border-collapse: collapse; }
                                th, td { padding: 8px; text-align: left; border-bottom: 1px solid #ddd; }
                                th { background-color: #2980b9; color: white; }
                                .amount { text-align: right; }
                            </style>
                        </head>
                        <body>
                            <h1>Transactions Report</h1>
                            <div class="date">Generated on: ${new Date().toLocaleDateString()}</div>
                            ${dateRange?.from && dateRange?.to ? `
                                <div class="date">Period: ${dateRange.from.toLocaleDateString()} - ${dateRange.to.toLocaleDateString()}</div>
                            ` : ''}
                            <div class="summary">
                                <p>Total Transactions: ${filteredTransactions.length}</p>
                                <p>Total Amount: $${filteredTransactions.reduce((sum, t) => sum + t.amount, 0).toFixed(2)}</p>
                            </div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Description</th>
                                        <th>Amount</th>
                                        <th>Category</th>
                                        <th>Account</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${filteredTransactions.map(t => `
                                        <tr>
                                            <td>${new Date(t.date).toLocaleDateString()}</td>
                                            <td>${t.description}</td>
                                            <td class="amount">$${t.amount.toFixed(2)}</td>
                                            <td>${t.category}</td>
                                            <td>${t.accountName}</td>
                                            <td>${t.status.charAt(0).toUpperCase() + t.status.slice(1)}</td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </body>
                    </html>
                `;

                // Create a Blob from the HTML content
                const blob = new Blob([htmlContent], { type: 'text/html' });
                const url = window.URL.createObjectURL(blob);

                // Open in a new window for printing
                const printWindow = window.open(url, '_blank');
                if (printWindow) {
                    printWindow.onload = () => {
                        printWindow.print();
                        window.URL.revokeObjectURL(url);
                    };
                } else {
                    toast.error("Please allow pop-ups to download PDF");
                }
            } catch (error) {
                console.error("Error generating PDF:", error);
                toast.error("Failed to generate PDF. Please try again.");
            }
        }
    };

    return (
        <div className="flex h-full flex-col space-y-6 p-6">
            <TransactionsHeader
                onSearch={handleSearch}
                onAddTransaction={handleAddTransaction}
                onDownload={handleDownload}
                accounts={mockAccounts}
            />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <TransactionsOverview transactions={filteredTransactions} />
            </div>
            <div className="flex-1 grid gap-6 lg:grid-cols-12">
                <div className="lg:col-span-3">
                    <TransactionsFilters
                        dateRange={dateRange}
                        onDateRangeChange={setDateRange}
                        selectedCategories={selectedCategories}
                        onCategoriesChange={setSelectedCategories}
                        accounts={mockAccounts}
                        selectedAccounts={selectedAccounts}
                        onAccountsChange={setSelectedAccounts}
                        selectedStatus={selectedStatus}
                        onStatusChange={setSelectedStatus}
                        currentTransactions={transactions}
                    />
                </div>
                <div className="lg:col-span-9">
                    <TransactionsList
                        transactions={filteredTransactions}
                        accounts={mockAccounts}
                        onDeleteTransaction={handleDeleteTransaction}
                        onEditTransaction={handleEditTransaction}
                    />
                </div>
            </div>
        </div>
    );
} 