"use client";

import { useState } from "react";
import { MoreHorizontal, Pencil, Trash, Eye } from "lucide-react";
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
import { Progress } from "@/components/ui/progress";

interface Budget {
    id: string;
    name: string;
    category: string;
    amount: number;
    spent: number;
    status: "active" | "completed" | "overdue";
    transactions: string[];
}

interface BudgetsListProps {
    budgets: Budget[];
    onDeleteBudget: (id: string) => void;
    onEditBudget: (id: string, budget: Partial<Budget>) => void;
}

export function BudgetsList({
    budgets,
    onDeleteBudget,
    onEditBudget,
}: BudgetsListProps) {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [selectedBudget, setSelectedBudget] = useState<Budget | null>(null);
    const [editForm, setEditForm] = useState<Partial<Budget>>({});

    const handleDelete = (budget: Budget) => {
        setSelectedBudget(budget);
        setDeleteDialogOpen(true);
    };

    const handleEdit = (budget: Budget) => {
        setSelectedBudget(budget);
        setEditForm({
            name: budget.name,
            category: budget.category,
            amount: budget.amount,
            status: budget.status,
        });
        setEditDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        if (selectedBudget) {
            onDeleteBudget(selectedBudget.id);
            setDeleteDialogOpen(false);
        }
    };

    const handleEditSubmit = () => {
        if (selectedBudget) {
            onEditBudget(selectedBudget.id, editForm);
            setEditDialogOpen(false);
        }
    };

    const getStatusColor = (status: Budget["status"]) => {
        switch (status) {
            case "active":
                return "bg-green-100 text-green-700";
            case "completed":
                return "bg-blue-100 text-blue-700";
            case "overdue":
                return "bg-red-100 text-red-700";
        }
    };

    return (
        <Card className="h-full flex flex-col">
            <CardHeader className="flex-none">
                <CardTitle>All Budgets</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 p-0">
                <ScrollArea className="h-full">
                    <div className="space-y-4 p-6">
                        {budgets.map((budget) => (
                            <div
                                key={budget.id}
                                className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted/50 transition-colors"
                            >
                                <div className="space-y-1 flex-1">
                                    <div className="flex items-center gap-2">
                                        <p className="font-medium">{budget.name}</p>
                                        <span
                                            className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(
                                                budget.status
                                            )}`}
                                        >
                                            {budget.status.charAt(0).toUpperCase() +
                                                budget.status.slice(1)}
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                        <span>{budget.category}</span>
                                        <span>•</span>
                                        <span>${budget.amount.toFixed(2)}</span>
                                    </div>
                                    <div className="mt-2">
                                        <div className="flex items-center justify-between text-sm mb-1">
                                            <span>Progress</span>
                                            <span>
                                                {formatAmount(budget.spent)} / {formatAmount(budget.amount)}
                                            </span>
                                        </div>
                                        <Progress
                                            value={(budget.spent / budget.amount) * 100}
                                            className="h-2"
                                        />
                                    </div>
                                </div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem onClick={() => handleEdit(budget)}>
                                            <Pencil className="mr-2 h-4 w-4" />
                                            Edit
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => handleDelete(budget)}>
                                            <Trash className="mr-2 h-4 w-4" />
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </CardContent>

            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Budget</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this budget? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDeleteConfirm}>
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Budget</DialogTitle>
                        <DialogDescription>
                            Make changes to your budget here. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Budget Name</Label>
                            <Input
                                id="name"
                                value={editForm.name}
                                onChange={(e) =>
                                    setEditForm({ ...editForm, name: e.target.value })
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
                                value={editForm.amount}
                                onChange={(e) =>
                                    setEditForm({ ...editForm, amount: parseFloat(e.target.value) })
                                }
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="status">Status</Label>
                            <Select
                                value={editForm.status}
                                onValueChange={(value) =>
                                    setEditForm({ ...editForm, status: value as Budget["status"] })
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="completed">Completed</SelectItem>
                                    <SelectItem value="overdue">Overdue</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleEditSubmit}>Save Changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </Card>
    );
} 