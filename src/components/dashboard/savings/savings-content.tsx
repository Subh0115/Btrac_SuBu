"use client";

import { useState, useEffect } from "react";
import { SavingsHeader } from "./header";
import { SavingsOverview } from "./overview";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { formatAmount } from "@/lib/utils";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { SavingsFilters } from "./filters";
import { SavingsProgress } from "./savings-progress";

interface SavingsGoal {
    id: string;
    name: string;
    targetAmount: number;
    currentAmount: number;
    deadline: string;
    category: string;
    status: "active" | "completed" | "overdue";
}

export function SavingsContent() {
    const [goals, setGoals] = useState<SavingsGoal[]>([
        {
            id: "1",
            name: "Emergency Fund",
            targetAmount: 10000,
            currentAmount: 7500,
            deadline: "2024-12-31",
            category: "emergency",
            status: "active"
        },
        {
            id: "2",
            name: "Vacation to Europe",
            targetAmount: 5000,
            currentAmount: 3000,
            deadline: "2025-06-30",
            category: "vacation",
            status: "active"
        },
        {
            id: "3",
            name: "House Down Payment",
            targetAmount: 50000,
            currentAmount: 25000,
            deadline: "2026-12-31",
            category: "house",
            status: "active"
        },
        {
            id: "4",
            name: "New Car",
            targetAmount: 30000,
            currentAmount: 30000,
            deadline: "2024-03-31",
            category: "other",
            status: "completed"
        },
        {
            id: "5",
            name: "Retirement Fund",
            targetAmount: 100000,
            currentAmount: 45000,
            deadline: "2025-12-31",
            category: "retirement",
            status: "active"
        },
        {
            id: "6",
            name: "Education Fund",
            targetAmount: 20000,
            currentAmount: 15000,
            deadline: "2024-08-31",
            category: "education",
            status: "overdue"
        }
    ]);
    const [searchQuery, setSearchQuery] = useState("");
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [selectedGoal, setSelectedGoal] = useState<SavingsGoal | null>(null);
    const [editFormData, setEditFormData] = useState({
        name: "",
        targetAmount: "",
        deadline: "",
        category: "",
    });
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const [valueRange, setValueRange] = useState<[number, number]>([0, 100000]);
    const [sortBy, setSortBy] = useState("");
    const [showOnlyActive, setShowOnlyActive] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleAddGoal = (newGoal: Omit<SavingsGoal, "id" | "currentAmount" | "status">) => {
        const goal: SavingsGoal = {
            ...newGoal,
            id: Math.random().toString(36).substr(2, 9),
            currentAmount: 0,
            status: "active",
        };
        setGoals([...goals, goal]);
    };

    const handleDeleteGoal = (id: string) => {
        setGoals(goals.filter((goal) => goal.id !== id));
        setDeleteDialogOpen(false);
        toast.success("Goal deleted successfully");
    };

    const handleEditGoal = (id: string, updatedGoal: Partial<SavingsGoal>) => {
        setGoals(
            goals.map((goal) =>
                goal.id === id ? { ...goal, ...updatedGoal } : goal
            )
        );
        setEditDialogOpen(false);
        toast.success("Goal updated successfully");
    };

    const filteredGoals = goals
        .filter((goal) => {
            // Search filter
            const matchesSearch = goal.name.toLowerCase().includes(searchQuery.toLowerCase());
            
            // Category filter
            const matchesCategory = selectedCategory === "all" || !selectedCategory || goal.category === selectedCategory;
            
            // Status filter
            const matchesStatus = selectedStatus === "all" || !selectedStatus || goal.status === selectedStatus;
            
            // Value range filter
            const matchesValueRange = goal.targetAmount >= valueRange[0] && goal.targetAmount <= valueRange[1];
            
            // Active filter
            const matchesActive = !showOnlyActive || goal.status === "active";

            return matchesSearch && matchesCategory && matchesStatus && matchesValueRange && matchesActive;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case "name":
                    return a.name.localeCompare(b.name);
                case "deadline":
                    return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
                case "progress":
                    return (b.currentAmount / b.targetAmount) - (a.currentAmount / a.targetAmount);
                case "amount":
                    return b.targetAmount - a.targetAmount;
                default:
                    return 0;
            }
        });

    const calculateDaysUntilDeadline = (deadline: string) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const deadlineDate = new Date(deadline);
        deadlineDate.setHours(0, 0, 0, 0);
        const diffTime = deadlineDate.getTime() - today.getTime();
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };

    if (!mounted) {
        return null;
    }

    return (
        <div className="flex h-full flex-col space-y-6 p-6">
            <SavingsHeader
                onSearch={setSearchQuery}
                onAddGoal={handleAddGoal}
            />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <SavingsOverview goals={filteredGoals} />
            </div>
            <div className="grid gap-4 md:grid-cols-7">
                <div className="col-span-4">
                    <Card className="h-full">
                        <div className="p-6">
                            <h2 className="text-lg font-semibold mb-4">Savings Goals</h2>
                            <div className="space-y-4">
                                {filteredGoals.map((goal) => {
                                    const progress = (goal.currentAmount / goal.targetAmount) * 100;
                                    const daysUntilDeadline = calculateDaysUntilDeadline(goal.deadline);

                                    return (
                                        <div
                                            key={goal.id}
                                            className="flex items-center justify-between rounded-lg border p-4 hover:bg-accent/50 transition-colors"
                                        >
                                            <div className="space-y-1 flex-1">
                                                <div className="flex items-center gap-2">
                                                    <p className="font-medium">{goal.name}</p>
                                                    <span
                                                        className={`rounded-full px-2 py-1 text-xs font-medium ${
                                                            goal.status === "completed"
                                                                ? "bg-green-100 text-green-700"
                                                                : goal.status === "overdue"
                                                                ? "bg-red-100 text-red-700"
                                                                : "bg-blue-100 text-blue-700"
                                                        }`}
                                                    >
                                                        {goal.status.charAt(0).toUpperCase() +
                                                            goal.status.slice(1)}
                                                    </span>
                                                </div>
                                                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                                    <span>{goal.category}</span>
                                                    <span>•</span>
                                                    <span>{formatAmount(goal.currentAmount)} / {formatAmount(goal.targetAmount)}</span>
                                                    <span>•</span>
                                                    <span>{daysUntilDeadline} days left</span>
                                                </div>
                                                <Progress 
                                                    value={progress} 
                                                    className="h-2 bg-blue-100 dark:bg-blue-900"
                                                    indicatorClassName="bg-blue-600 dark:bg-blue-400"
                                                />
                                            </div>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem
                                                        onClick={() => {
                                                            setSelectedGoal(goal);
                                                            setEditFormData({
                                                                name: goal.name,
                                                                targetAmount: goal.targetAmount.toString(),
                                                                deadline: goal.deadline,
                                                                category: goal.category,
                                                            });
                                                            setEditDialogOpen(true);
                                                        }}
                                                    >
                                                        <Pencil className="mr-2 h-4 w-4" />
                                                        Edit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() => {
                                                            setSelectedGoal(goal);
                                                            setDeleteDialogOpen(true);
                                                        }}
                                                    >
                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    );
                                })}
                                {filteredGoals.length === 0 && (
                                    <div className="text-center py-8 text-muted-foreground">
                                        No savings goals found. Create one to get started!
                                    </div>
                                )}
                            </div>
                        </div>
                    </Card>
                </div>
                <div className="col-span-3">
                    <SavingsFilters
                        selectedCategory={selectedCategory}
                        onCategoryChange={setSelectedCategory}
                        selectedStatus={selectedStatus}
                        onStatusChange={setSelectedStatus}
                        valueRange={valueRange}
                        onValueRangeChange={setValueRange}
                        sortBy={sortBy}
                        onSortChange={setSortBy}
                        showOnlyActive={showOnlyActive}
                        onShowOnlyActiveChange={setShowOnlyActive}
                    />
                    <SavingsProgress goals={filteredGoals} />
                </div>
            </div>

            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Savings Goal</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete this savings goal? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => selectedGoal && handleDeleteGoal(selectedGoal.id)}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Savings Goal</DialogTitle>
                        <DialogDescription>
                            Update your savings goal details.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="edit-name">Goal Name</Label>
                            <Input
                                id="edit-name"
                                value={editFormData.name}
                                onChange={(e) =>
                                    setEditFormData({ ...editFormData, name: e.target.value })
                                }
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="edit-targetAmount">Target Amount</Label>
                            <Input
                                id="edit-targetAmount"
                                type="number"
                                min="0"
                                step="0.01"
                                value={editFormData.targetAmount}
                                onChange={(e) =>
                                    setEditFormData({ ...editFormData, targetAmount: e.target.value })
                                }
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="edit-deadline">Target Date</Label>
                            <Input
                                id="edit-deadline"
                                type="date"
                                value={editFormData.deadline}
                                onChange={(e) =>
                                    setEditFormData({ ...editFormData, deadline: e.target.value })
                                }
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="edit-category">Category</Label>
                            <Select
                                value={editFormData.category}
                                onValueChange={(value) =>
                                    setEditFormData({ ...editFormData, category: value })
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="emergency">Emergency Fund</SelectItem>
                                    <SelectItem value="vacation">Vacation</SelectItem>
                                    <SelectItem value="house">House Down Payment</SelectItem>
                                    <SelectItem value="education">Education</SelectItem>
                                    <SelectItem value="retirement">Retirement</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setEditDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            onClick={() => {
                                if (selectedGoal) {
                                    handleEditGoal(selectedGoal.id, {
                                        name: editFormData.name,
                                        targetAmount: parseFloat(editFormData.targetAmount),
                                        deadline: editFormData.deadline,
                                        category: editFormData.category,
                                    });
                                }
                            }}
                            className="bg-blue-600 hover:bg-blue-700"
                        >
                            Save Changes
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
} 