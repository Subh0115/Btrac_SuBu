"use client";

import { useState } from "react";
import { format } from "date-fns";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { formatAmount } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Transaction {
    id: string;
    date: string;
    description: string;
    amount: number;
    category: string;
    accountId: string;
    accountName: string;
    status: "completed" | "pending" | "failed";
    tags: string[];
    receipt?: string;
}

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

interface TransactionsListProps {
    transactions: Transaction[];
    accounts: Account[];
    onDeleteTransaction: (id: string) => void;
    onEditTransaction: (id: string, transaction: Partial<Transaction>) => void;
}

export function TransactionsList({
    transactions,
    accounts,
    onDeleteTransaction,
    onEditTransaction,
}: TransactionsListProps) {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
    const [editForm, setEditForm] = useState<Partial<Transaction>>({});

    const handleDelete = (transaction: Transaction) => {
        setSelectedTransaction(transaction);
        setDeleteDialogOpen(true);
    };

    const handleEdit = (transaction: Transaction) => {
        setSelectedTransaction(transaction);
        setEditForm({
            description: transaction.description,
            amount: transaction.amount,
            category: transaction.category,
            accountId: transaction.accountId,
            status: transaction.status,
        });
        setEditDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        if (selectedTransaction) {
            onDeleteTransaction(selectedTransaction.id);
            setDeleteDialogOpen(false);
        }
    };

    const handleEditSubmit = () => {
        if (selectedTransaction) {
            onEditTransaction(selectedTransaction.id, editForm);
            setEditDialogOpen(false);
        }
    };

    return (
        <Card className="h-full flex flex-col">
            <CardHeader className="flex-none">
                <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 p-0">
                <ScrollArea className="h-full">
                    <div className="space-y-4 p-6">
                        {transactions.map((transaction) => (
                            <div
                                key={transaction.id}
                                className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted/50 transition-colors"
                            >
                                <div className="space-y-1">
                                    <p className="font-medium">{transaction.description}</p>
                                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                        <span>{format(new Date(transaction.date), "MMM dd, yyyy")}</span>
                                        <span>•</span>
                                        <span>{transaction.category}</span>
                                        <span>•</span>
                                        <span>{transaction.accountName}</span>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <span
                                        className={`font-medium ${
                                            transaction.amount >= 0
                                                ? "text-green-600"
                                                : "text-red-600"
                                        }`}
                                    >
                                        {formatAmount(transaction.amount)}
                                    </span>
                                    <span
                                        className={`rounded-full px-2 py-1 text-xs font-medium ${
                                            transaction.status === "completed"
                                                ? "bg-green-100 text-green-700"
                                                : transaction.status === "pending"
                                                ? "bg-yellow-100 text-yellow-700"
                                                : "bg-red-100 text-red-700"
                                        }`}
                                    >
                                        {transaction.status.charAt(0).toUpperCase() +
                                            transaction.status.slice(1)}
                                    </span>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                className="h-8 w-8 p-0"
                                            >
                                                <span className="sr-only">
                                                    Open menu
                                                </span>
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem
                                                onClick={() => handleEdit(transaction)}
                                            >
                                                <Pencil className="mr-2 h-4 w-4" />
                                                Edit
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={() => handleDelete(transaction)}
                                                className="text-red-600"
                                            >
                                                <Trash className="mr-2 h-4 w-4" />
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </CardContent>

            {/* Delete Dialog */}
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Transaction</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this transaction? This action cannot be
                            undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setDeleteDialogOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleDeleteConfirm}
                        >
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Edit Dialog */}
            <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Transaction</DialogTitle>
                        <DialogDescription>
                            Make changes to the transaction details below.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Input
                                id="description"
                                value={editForm.description}
                                onChange={(e) =>
                                    setEditForm({ ...editForm, description: e.target.value })
                                }
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="amount">Amount</Label>
                            <Input
                                id="amount"
                                type="number"
                                value={editForm.amount}
                                onChange={(e) =>
                                    setEditForm({
                                        ...editForm,
                                        amount: parseFloat(e.target.value),
                                    })
                                }
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="category">Category</Label>
                            <Select
                                value={editForm.category}
                                onValueChange={(value) =>
                                    setEditForm({ ...editForm, category: value })
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Food & Dining">
                                        Food & Dining
                                    </SelectItem>
                                    <SelectItem value="Transportation">
                                        Transportation
                                    </SelectItem>
                                    <SelectItem value="Shopping">Shopping</SelectItem>
                                    <SelectItem value="Entertainment">
                                        Entertainment
                                    </SelectItem>
                                    <SelectItem value="Bills & Utilities">
                                        Bills & Utilities
                                    </SelectItem>
                                    <SelectItem value="Healthcare">
                                        Healthcare
                                    </SelectItem>
                                    <SelectItem value="Travel">Travel</SelectItem>
                                    <SelectItem value="Education">Education</SelectItem>
                                    <SelectItem value="Gifts & Donations">
                                        Gifts & Donations
                                    </SelectItem>
                                    <SelectItem value="Other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="account">Account</Label>
                            <Select
                                value={editForm.accountId}
                                onValueChange={(value) =>
                                    setEditForm({ ...editForm, accountId: value })
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select an account" />
                                </SelectTrigger>
                                <SelectContent>
                                    {accounts.map((account) => (
                                        <SelectItem key={account.id} value={account.id}>
                                            {account.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="status">Status</Label>
                            <Select
                                value={editForm.status}
                                onValueChange={(value: "completed" | "pending" | "failed") =>
                                    setEditForm({ ...editForm, status: value })
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="completed">Completed</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="failed">Failed</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setEditDialogOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button onClick={handleEditSubmit}>Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </Card>
    );
} 