"use client";

import { useState } from "react";
import { Search, Plus, PiggyBank } from "lucide-react";
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

interface SavingsHeaderProps {
    onSearch: (query: string) => void;
    onAddGoal: (goal: any) => void;
}

export function SavingsHeader({ onSearch, onAddGoal }: SavingsHeaderProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        targetAmount: "",
        deadline: "",
        category: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Create new savings goal
        const newGoal = {
            name: formData.name,
            targetAmount: parseFloat(formData.targetAmount),
            deadline: formData.deadline,
            category: formData.category,
            currentAmount: 0,
            status: "active" as const,
        };

        // Call the parent handler
        onAddGoal(newGoal);

        // Show success toast
        toast.success("Savings goal created successfully", {
            duration: 3000,
        });

        // Reset form and close dialog
        setFormData({
            name: "",
            targetAmount: "",
            deadline: "",
            category: "",
        });
        setIsOpen(false);
    };

    return (
        <Card className="border-none shadow-sm bg-gradient-to-r from-blue-600 to-indigo-600">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <PiggyBank className="h-6 w-6 text-blue-100" />
                        <CardTitle className="text-2xl font-bold text-blue-50">
                            Savings
                        </CardTitle>
                    </div>
                    <CardDescription className="text-blue-100">
                        Track your savings goals and watch your money grow
                    </CardDescription>
                </div>
                <div className="flex items-center space-x-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-blue-400" />
                        <Input
                            placeholder="Search savings goals..."
                            className="pl-9 w-[250px] bg-white/95 border-blue-200/50 text-gray-900 placeholder:text-gray-400 focus:border-blue-300 focus:ring-blue-200/50 shadow-sm"
                            onChange={(e) => onSearch(e.target.value)}
                        />
                    </div>
                    <Dialog open={isOpen} onOpenChange={setIsOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-blue-50 text-blue-600 hover:bg-blue-100">
                                <Plus className="mr-2 h-4 w-4" />
                                Add Goal
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <form onSubmit={handleSubmit}>
                                <DialogHeader>
                                    <DialogTitle>Add New Savings Goal</DialogTitle>
                                    <DialogDescription>
                                        Create a new savings goal to track your progress.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">Goal Name</Label>
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
                                        <Label htmlFor="targetAmount">Target Amount</Label>
                                        <Input
                                            id="targetAmount"
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            value={formData.targetAmount}
                                            onChange={(e) =>
                                                setFormData({ ...formData, targetAmount: e.target.value })
                                            }
                                            required
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="deadline">Target Date</Label>
                                        <Input
                                            id="deadline"
                                            type="date"
                                            value={formData.deadline}
                                            onChange={(e) =>
                                                setFormData({ ...formData, deadline: e.target.value })
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
                                    <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                                        Create Goal
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