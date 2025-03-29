"use client";

import { format, subDays, startOfDay, endOfDay } from "date-fns";
import { Calendar as CalendarIcon, Filter, X, ChevronDown, Calendar as CalendarIcon2 } from "lucide-react";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { mockTransactions } from "@/data/mock-data";
import { useState } from "react";

interface TransactionsFiltersProps {
    dateRange: DateRange | undefined;
    onDateRangeChange: (range: DateRange | undefined) => void;
    selectedCategories: string[];
    onCategoriesChange: (categories: string[]) => void;
    accounts: {
        id: string;
        name: string;
        type: string;
        icon: any;
        balance: number;
        accountNumber: string;
        bank: string;
        color: string;
    }[];
    selectedAccounts: string[];
    onAccountsChange: (accounts: string[]) => void;
    selectedStatus: string[];
    onStatusChange: (status: string[]) => void;
    currentTransactions: {
        id: string;
        date: string;
        description: string;
        amount: number;
        category: string;
        accountId: string;
        accountName: string;
        status: string;
        tags: string[];
        receipt?: string;
    }[];
}

const statuses = ["completed", "pending", "failed"];

const dateRangePresets = [
    {
        label: "Last 7 days",
        value: "7",
        getValue: () => ({
            from: startOfDay(subDays(new Date(), 7)),
            to: endOfDay(new Date()),
        }),
    },
    {
        label: "Last 30 days",
        value: "30",
        getValue: () => ({
            from: startOfDay(subDays(new Date(), 30)),
            to: endOfDay(new Date()),
        }),
    },
    {
        label: "Last 90 days",
        value: "90",
        getValue: () => ({
            from: startOfDay(subDays(new Date(), 90)),
            to: endOfDay(new Date()),
        }),
    },
    {
        label: "Last 6 months",
        value: "180",
        getValue: () => ({
            from: startOfDay(subDays(new Date(), 180)),
            to: endOfDay(new Date()),
        }),
    },
    {
        label: "Last year",
        value: "365",
        getValue: () => ({
            from: startOfDay(subDays(new Date(), 365)),
            to: endOfDay(new Date()),
        }),
    },
];

export function TransactionsFilters({
    dateRange,
    onDateRangeChange,
    selectedCategories,
    onCategoriesChange,
    accounts,
    selectedAccounts,
    onAccountsChange,
    selectedStatus,
    onStatusChange,
    currentTransactions = [],
}: TransactionsFiltersProps) {
    // Get unique categories from current transactions, safely handle undefined
    const categories = Array.from(
        new Set(currentTransactions?.map(t => t.category) || [])
    ).sort();

    const handleClearFilters = () => {
        onDateRangeChange(undefined);
        onCategoriesChange([]);
        onAccountsChange([]);
        onStatusChange([]);
    };

    const handlePresetChange = (value: string) => {
        const preset = dateRangePresets.find((p) => p.value === value);
        if (preset) {
            onDateRangeChange(preset.getValue());
        }
    };

    const hasActiveFilters = 
        dateRange?.from || 
        selectedCategories.length > 0 || 
        selectedAccounts.length > 0 || 
        selectedStatus.length > 0;

    const formatDateRange = (range: DateRange | undefined) => {
        if (!range?.from) return "Select time period";
        return `${format(range.from, "MMM dd, yyyy")} - ${format(range.to, "MMM dd, yyyy")}`;
    };

    // Get the date range of recent transactions
    const recentTransactionsDates = currentTransactions.map(t => new Date(t.date));
    const minDate = recentTransactionsDates.length > 0 ? new Date(Math.min(...recentTransactionsDates.map(d => d.getTime()))) : new Date();
    const maxDate = recentTransactionsDates.length > 0 ? new Date(Math.max(...recentTransactionsDates.map(d => d.getTime()))) : new Date();

    return (
        <Card className="h-full flex flex-col border-none shadow-sm">
            <CardHeader className="flex-none flex flex-row items-center justify-between space-y-0 pb-4">
                <div className="flex items-center space-x-2">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <CardTitle className="text-lg font-semibold">Filters</CardTitle>
                </div>
                {hasActiveFilters && (
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-2 text-xs text-muted-foreground hover:text-foreground"
                        onClick={handleClearFilters}
                    >
                        <X className="mr-1 h-3 w-3" />
                        Clear
                    </Button>
                )}
            </CardHeader>
            <CardContent className="flex-1 p-0">
                <ScrollArea className="h-full">
                    <div className="space-y-6 p-6">
                        {/* Time Period Filter */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label className="text-sm font-medium">Time Period</Label>
                                {dateRange?.from && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground"
                                        onClick={() => onDateRangeChange(undefined)}
                                    >
                                        <X className="mr-1 h-3 w-3" />
                                        Clear
                                    </Button>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Select onValueChange={handlePresetChange}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select time period" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {dateRangePresets.map((preset) => (
                                            <SelectItem key={preset.value} value={preset.value}>
                                                {preset.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className={cn(
                                                "w-full justify-start text-left font-normal transition-colors hover:bg-accent/50",
                                                !dateRange && "text-muted-foreground",
                                                dateRange?.from && "bg-accent/50"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {formatDateRange(dateRange)}
                                            <ChevronDown className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <div className="p-3 border-b bg-gradient-to-r from-primary/5 to-primary/10">
                                            <div className="flex items-center space-x-2 text-sm font-medium">
                                                <CalendarIcon2 className="h-4 w-4 text-primary" />
                                                <span>Select Time Period</span>
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <Calendar
                                                initialFocus
                                                mode="range"
                                                defaultMonth={dateRange?.from}
                                                selected={dateRange}
                                                onSelect={onDateRangeChange}
                                                numberOfMonths={2}
                                                disabled={(date) => date > new Date()}
                                                fromDate={minDate}
                                                toDate={maxDate}
                                                classNames={{
                                                    months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                                                    month: "space-y-4 w-full",
                                                    caption: "flex justify-center pt-1 relative items-center mb-4",
                                                    caption_label: "text-sm font-medium",
                                                    nav: "space-x-1 flex items-center",
                                                    nav_button: cn(
                                                        "h-8 w-8 bg-transparent p-0 opacity-50 hover:opacity-100 transition-opacity rounded-md hover:bg-accent/50"
                                                    ),
                                                    nav_button_previous: "absolute left-1",
                                                    nav_button_next: "absolute right-1",
                                                    table: "w-full border-collapse space-y-1",
                                                    head_row: "flex justify-between",
                                                    head_cell: "text-muted-foreground rounded-md w-10 font-normal text-[0.8rem]",
                                                    row: "flex w-full mt-2 justify-between",
                                                    cell: cn(
                                                        "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md",
                                                        "hover:bg-accent/50 transition-colors"
                                                    ),
                                                    day: cn(
                                                        "h-10 w-10 p-0 font-normal aria-selected:opacity-100 rounded-md transition-colors"
                                                    ),
                                                    day_selected:
                                                        "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                                                    day_today: "bg-accent text-accent-foreground",
                                                    day_outside:
                                                        "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
                                                    day_disabled: "text-muted-foreground opacity-50",
                                                    day_hidden: "invisible",
                                                    day_range_end: "day-range-end",
                                                    day_range_middle:
                                                        "aria-selected:bg-accent aria-selected:text-accent-foreground",
                                                }}
                                            />
                                        </div>
                                        {dateRange?.from && (
                                            <div className="p-3 border-t bg-muted/50">
                                                <div className="text-xs text-muted-foreground">
                                                    Selected period: {formatDateRange(dateRange)}
                                                </div>
                                            </div>
                                        )}
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>

                        {/* Categories Filter */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label className="text-sm font-medium">Categories</Label>
                                {selectedCategories.length > 0 && (
                                    <Badge variant="secondary" className="text-xs">
                                        {selectedCategories.length} selected
                                    </Badge>
                                )}
                            </div>
                            <div className="space-y-2">
                                {categories.map((category) => (
                                    <div
                                        key={category}
                                        className={cn(
                                            "flex items-center space-x-2 rounded-md p-2 transition-colors hover:bg-muted/50",
                                            selectedCategories.includes(category) && "bg-muted"
                                        )}
                                    >
                                        <Checkbox
                                            id={category}
                                            checked={selectedCategories.includes(category)}
                                            onCheckedChange={(checked) => {
                                                if (checked) {
                                                    onCategoriesChange([...selectedCategories, category]);
                                                } else {
                                                    onCategoriesChange(
                                                        selectedCategories.filter((c) => c !== category)
                                                    );
                                                }
                                            }}
                                        />
                                        <Label
                                            htmlFor={category}
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            {category}
                                        </Label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Accounts Filter */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label className="text-sm font-medium">Accounts</Label>
                                {selectedAccounts.length > 0 && (
                                    <Badge variant="secondary" className="text-xs">
                                        {selectedAccounts.length} selected
                                    </Badge>
                                )}
                            </div>
                            <div className="space-y-2">
                                {accounts.map((account) => (
                                    <div
                                        key={account.id}
                                        className={cn(
                                            "flex items-center space-x-2 rounded-md p-2 transition-colors hover:bg-muted/50",
                                            selectedAccounts.includes(account.id) && "bg-muted"
                                        )}
                                    >
                                        <Checkbox
                                            id={account.id}
                                            checked={selectedAccounts.includes(account.id)}
                                            onCheckedChange={(checked) => {
                                                if (checked) {
                                                    onAccountsChange([...selectedAccounts, account.id]);
                                                } else {
                                                    onAccountsChange(
                                                        selectedAccounts.filter((id) => id !== account.id)
                                                    );
                                                }
                                            }}
                                        />
                                        <Label
                                            htmlFor={account.id}
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            {account.name}
                                        </Label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Status Filter */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label className="text-sm font-medium">Status</Label>
                                {selectedStatus.length > 0 && (
                                    <Badge variant="secondary" className="text-xs">
                                        {selectedStatus.length} selected
                                    </Badge>
                                )}
                            </div>
                            <div className="space-y-2">
                                {statuses.map((status) => (
                                    <div
                                        key={status}
                                        className={cn(
                                            "flex items-center space-x-2 rounded-md p-2 transition-colors hover:bg-muted/50",
                                            selectedStatus.includes(status) && "bg-muted"
                                        )}
                                    >
                                        <Checkbox
                                            id={status}
                                            checked={selectedStatus.includes(status)}
                                            onCheckedChange={(checked) => {
                                                if (checked) {
                                                    onStatusChange([...selectedStatus, status]);
                                                } else {
                                                    onStatusChange(
                                                        selectedStatus.filter((s) => s !== status)
                                                    );
                                                }
                                            }}
                                        />
                                        <Label
                                            htmlFor={status}
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            {status.charAt(0).toUpperCase() + status.slice(1)}
                                        </Label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    );
} 