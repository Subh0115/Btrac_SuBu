"use client";

import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

interface SavingsFiltersProps {
    selectedCategory: string;
    onCategoryChange: (value: string) => void;
    selectedStatus: string;
    onStatusChange: (value: string) => void;
    valueRange: [number, number];
    onValueRangeChange: (value: [number, number]) => void;
    sortBy: string;
    onSortChange: (value: string) => void;
    showOnlyActive: boolean;
    onShowOnlyActiveChange: (value: boolean) => void;
}

export function SavingsFilters({
    selectedCategory,
    onCategoryChange,
    selectedStatus,
    onStatusChange,
    valueRange,
    onValueRangeChange,
    sortBy,
    onSortChange,
    showOnlyActive,
    onShowOnlyActiveChange,
}: SavingsFiltersProps) {
    return (
        <Card className="p-4">
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label>Category</Label>
                    <Select value={selectedCategory} onValueChange={onCategoryChange}>
                        <SelectTrigger>
                            <SelectValue placeholder="All Categories" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            <SelectItem value="emergency">Emergency Fund</SelectItem>
                            <SelectItem value="vacation">Vacation</SelectItem>
                            <SelectItem value="house">House Down Payment</SelectItem>
                            <SelectItem value="education">Education</SelectItem>
                            <SelectItem value="retirement">Retirement</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label>Status</Label>
                    <Select value={selectedStatus} onValueChange={onStatusChange}>
                        <SelectTrigger>
                            <SelectValue placeholder="All Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="overdue">Overdue</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label>Value Range</Label>
                    <Slider
                        value={valueRange}
                        onValueChange={onValueRangeChange}
                        min={0}
                        max={100000}
                        step={1000}
                        className="w-full"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                        <span>${valueRange[0].toLocaleString()}</span>
                        <span>${valueRange[1].toLocaleString()}</span>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label>Sort By</Label>
                    <Select value={sortBy} onValueChange={onSortChange}>
                        <SelectTrigger>
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="name">Name</SelectItem>
                            <SelectItem value="deadline">Deadline</SelectItem>
                            <SelectItem value="progress">Progress</SelectItem>
                            <SelectItem value="amount">Amount</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex items-center justify-between">
                    <Label htmlFor="show-only-active">Show Only Active</Label>
                    <Switch
                        id="show-only-active"
                        checked={showOnlyActive}
                        onCheckedChange={onShowOnlyActiveChange}
                    />
                </div>
            </div>
        </Card>
    );
} 