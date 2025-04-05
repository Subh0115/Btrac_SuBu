"use client";

import { useState } from "react";
import { InvestmentsContent } from "@/components/dashboard/investments/investments-content";
import { Investment, mockInvestments } from "@/data/mock-investments";

export default function InvestmentsPage() {
    const [investments, setInvestments] = useState<Investment[]>(mockInvestments);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedType, setSelectedType] = useState<string>("all");
    const [performanceFilter, setPerformanceFilter] = useState<string>("all");
    const [valueRange, setValueRange] = useState<[number, number]>([0, 100]);
    const [sortBy, setSortBy] = useState<string>("name");
    const [showOnlyActive, setShowOnlyActive] = useState(false);

    // Filter and sort investments
    const filteredInvestments = investments.filter((investment) => {
        const matchesSearch = 
            investment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            investment.symbol.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesType = selectedType === "all" || investment.type === selectedType;
        
        const matchesPerformance = 
            performanceFilter === "all" ||
            (performanceFilter === "positive" && investment.performance > 0) ||
            (performanceFilter === "negative" && investment.performance < 0);

        const investmentValue = investment.quantity * investment.currentPrice;
        const matchesValueRange = 
            investmentValue >= (valueRange[0] * 1000) && 
            investmentValue <= (valueRange[1] * 1000);

        return matchesSearch && matchesType && matchesPerformance && matchesValueRange;
    }).sort((a, b) => {
        switch (sortBy) {
            case "name":
                return a.name.localeCompare(b.name);
            case "value":
                return (b.quantity * b.currentPrice) - (a.quantity * a.currentPrice);
            case "performance":
                return b.performance - a.performance;
            case "type":
                return a.type.localeCompare(b.type);
            default:
                return 0;
        }
    });

    const handleAddInvestment = (newInvestment: Omit<Investment, "id" | "performance" | "lastUpdated">) => {
        const investment: Investment = {
            ...newInvestment,
            id: (investments.length + 1).toString(),
            performance: ((newInvestment.currentPrice - newInvestment.purchasePrice) / newInvestment.purchasePrice) * 100,
            lastUpdated: new Date().toISOString()
        };
        setInvestments([...investments, investment]);
    };

    const handleEditInvestment = (id: string, updatedInvestment: Partial<Investment>) => {
        setInvestments(investments.map(investment => {
            if (investment.id === id) {
                const newInvestment = {
                    ...investment,
                    ...updatedInvestment,
                    performance: updatedInvestment.currentPrice 
                        ? ((updatedInvestment.currentPrice - (updatedInvestment.purchasePrice || investment.purchasePrice)) / (updatedInvestment.purchasePrice || investment.purchasePrice)) * 100
                        : investment.performance,
                    lastUpdated: new Date().toISOString()
                };
                return newInvestment;
            }
            return investment;
        }));
    };

    const handleDeleteInvestment = (id: string) => {
        setInvestments(investments.filter(investment => investment.id !== id));
    };

    return (
        <InvestmentsContent
            investments={filteredInvestments}
            onAddInvestment={handleAddInvestment}
            onEditInvestment={handleEditInvestment}
            onDeleteInvestment={handleDeleteInvestment}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedType={selectedType}
            onTypeChange={setSelectedType}
            performanceFilter={performanceFilter}
            onPerformanceFilterChange={setPerformanceFilter}
            valueRange={valueRange}
            onValueRangeChange={setValueRange}
            sortBy={sortBy}
            onSortChange={setSortBy}
            showOnlyActive={showOnlyActive}
            onShowOnlyActiveChange={setShowOnlyActive}
        />
    );
} 