"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

interface InvestmentsFiltersProps {
    selectedType: string;
    onTypeChange: (type: string) => void;
    performanceFilter: string;
    onPerformanceFilterChange: (filter: string) => void;
    valueRange: [number, number];
    onValueRangeChange: (range: [number, number]) => void;
    sortBy: string;
    onSortChange: (sort: string) => void;
    showOnlyActive: boolean;
    onShowOnlyActiveChange: (show: boolean) => void;
}

export function InvestmentsFilters({
    selectedType,
    onTypeChange,
    performanceFilter,
    onPerformanceFilterChange,
    valueRange,
    onValueRangeChange,
    sortBy,
    onSortChange,
    showOnlyActive,
    onShowOnlyActiveChange,
}: InvestmentsFiltersProps) {
    return (
        <Card className="h-full flex flex-col">
            <CardHeader className="flex-none">
                <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 space-y-6">
                <div className="space-y-2">
                    <Label>Investment Type</Label>
                    <Select value={selectedType} onValueChange={onTypeChange}>
                        <SelectTrigger>
                            <SelectValue placeholder="All types" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Types</SelectItem>
                            <SelectItem value="stock">Stocks</SelectItem>
                            <SelectItem value="bond">Bonds</SelectItem>
                            <SelectItem value="mutual_fund">Mutual Funds</SelectItem>
                            <SelectItem value="crypto">Cryptocurrency</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label>Performance Range</Label>
                    <Select value={performanceFilter} onValueChange={onPerformanceFilterChange}>
                        <SelectTrigger>
                            <SelectValue placeholder="Any performance" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Any Performance</SelectItem>
                            <SelectItem value="positive">Positive Only</SelectItem>
                            <SelectItem value="negative">Negative Only</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label>Value Range</Label>
                    <div className="space-y-4">
                        <Slider
                            value={valueRange}
                            onValueChange={onValueRangeChange}
                            max={100}
                            step={1}
                            className="w-full"
                        />
                        <div className="flex justify-between text-sm text-muted-foreground">
                            <span>${valueRange[0]}K</span>
                            <span>${valueRange[1]}K+</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label>Sort By</Label>
                    <Select value={sortBy} onValueChange={onSortChange}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select sorting" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="name">Name</SelectItem>
                            <SelectItem value="value">Value</SelectItem>
                            <SelectItem value="performance">Performance</SelectItem>
                            <SelectItem value="type">Type</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex items-center justify-between">
                    <Label htmlFor="show-only-active">Show only active</Label>
                    <Switch
                        id="show-only-active"
                        checked={showOnlyActive}
                        onCheckedChange={onShowOnlyActiveChange}
                    />
                </div>
            </CardContent>
        </Card>
    );
} 