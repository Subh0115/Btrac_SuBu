"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";

interface BudgetsFiltersProps {
    onFilterChange: (filters: {
        category: string;
        status: string;
    }) => void;
}

export function BudgetsFilters({ onFilterChange }: BudgetsFiltersProps) {
    const [filters, setFilters] = useState({
        category: "all",
        status: "all",
    });

    const handleFilterChange = (key: string, value: string) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    return (
        <Card className="p-4">
            <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-[200px]">
                    <Select
                        value={filters.category}
                        onValueChange={(value) => handleFilterChange("category", value)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            <SelectItem value="food">Food</SelectItem>
                            <SelectItem value="transportation">Transportation</SelectItem>
                            <SelectItem value="entertainment">Entertainment</SelectItem>
                            <SelectItem value="utilities">Utilities</SelectItem>
                            <SelectItem value="shopping">Shopping</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex-1 min-w-[200px]">
                    <Select
                        value={filters.status}
                        onValueChange={(value) => handleFilterChange("status", value)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="overdue">Overdue</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <Button
                    variant="outline"
                    onClick={() => {
                        setFilters({ category: "all", status: "all" });
                        onFilterChange({ category: "all", status: "all" });
                    }}
                >
                    Reset Filters
                </Button>
            </div>
        </Card>
    );
} 