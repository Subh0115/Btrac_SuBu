"use client";

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
    ShoppingBag, 
    Home, 
    Car, 
    Utensils, 
    Tv, 
    Plane,
    MoreHorizontal 
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

function formatAmount(amount: number) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
}

const categories = [
    {
        name: "Shopping",
        icon: ShoppingBag,
        spent: 450.75,
        budget: 600,
        color: "bg-blue-500",
    },
    {
        name: "Housing",
        icon: Home,
        spent: 1200,
        budget: 1500,
        color: "bg-green-500",
    },
    {
        name: "Transportation",
        icon: Car,
        spent: 280.50,
        budget: 400,
        color: "bg-purple-500",
    },
    {
        name: "Food & Dining",
        icon: Utensils,
        spent: 385.25,
        budget: 500,
        color: "bg-orange-500",
    },
    {
        name: "Entertainment",
        icon: Tv,
        spent: 150.99,
        budget: 200,
        color: "bg-pink-500",
    },
    {
        name: "Travel",
        icon: Plane,
        spent: 1200,
        budget: 2000,
        color: "bg-yellow-500",
    },
];

export function BudgetCategories() {
    return (
        <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium">Budget Categories</h3>
                <Button variant="outline" size="sm">View All</Button>
            </div>
            <div className="space-y-6">
                {categories.map((category) => {
                    const Icon = category.icon;
                    const progress = (category.spent / category.budget) * 100;
                    return (
                        <div key={category.name} className="space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className={`rounded-full p-2 bg-gray-100`}>
                                        <Icon className="h-4 w-4" />
                                    </div>
                                    <span className="font-medium">{category.name}</span>
                                </div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            className="h-8 w-8 p-0"
                                        >
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem>Edit Budget</DropdownMenuItem>
                                        <DropdownMenuItem>View Transactions</DropdownMenuItem>
                                        <DropdownMenuItem className="text-red-600">
                                            Delete Budget
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            <div className="space-y-1">
                                <Progress value={progress} className={category.color} />
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">
                                        {formatAmount(category.spent)} spent
                                    </span>
                                    <span className="font-medium">
                                        {formatAmount(category.budget)} budget
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </Card>
    );
} 