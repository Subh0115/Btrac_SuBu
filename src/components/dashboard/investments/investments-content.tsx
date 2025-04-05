"use client";

import { InvestmentsHeader } from "./header";
import { InvestmentsOverview } from "./overview";
import { InvestmentsList } from "./list";
import { InvestmentsAnalytics } from "./analytics";
import { InvestmentsFilters } from "./filters";
import { Investment } from "@/data/mock-investments";

interface InvestmentsContentProps {
    investments: Investment[];
    onAddInvestment: (investment: Omit<Investment, "id" | "performance" | "lastUpdated">) => void;
    onEditInvestment: (id: string, investment: Partial<Investment>) => void;
    onDeleteInvestment: (id: string) => void;
    searchQuery: string;
    onSearchChange: (query: string) => void;
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

export function InvestmentsContent({
    investments,
    onAddInvestment,
    onEditInvestment,
    onDeleteInvestment,
    searchQuery,
    onSearchChange,
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
}: InvestmentsContentProps) {
    return (
        <div className="flex flex-col h-full p-8 space-y-8">
            <InvestmentsHeader 
                onAddInvestment={onAddInvestment}
                searchQuery={searchQuery}
                onSearchChange={onSearchChange}
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-3 space-y-6">
                    <InvestmentsOverview investments={investments} />
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2">
                            <InvestmentsList
                                investments={investments}
                                onEditInvestment={onEditInvestment}
                                onDeleteInvestment={onDeleteInvestment}
                            />
                        </div>
                        <div className="lg:col-span-1">
                            <InvestmentsFilters
                                selectedType={selectedType}
                                onTypeChange={onTypeChange}
                                performanceFilter={performanceFilter}
                                onPerformanceFilterChange={onPerformanceFilterChange}
                                valueRange={valueRange}
                                onValueRangeChange={onValueRangeChange}
                                sortBy={sortBy}
                                onSortChange={onSortChange}
                                showOnlyActive={showOnlyActive}
                                onShowOnlyActiveChange={onShowOnlyActiveChange}
                            />
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-1">
                    <InvestmentsAnalytics investments={investments} />
                </div>
            </div>
        </div>
    );
} 