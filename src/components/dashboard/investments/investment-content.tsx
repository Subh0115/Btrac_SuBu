"use client";

import { InvestmentsHeader } from "@/components/dashboard/investments/header";
import { PortfolioOverview } from "@/components/dashboard/investments/portfolio-overview";
import { AssetAllocation } from "@/components/dashboard/investments/asset-allocation";
import { InvestmentsList } from "@/components/dashboard/investments/investments-list";

export function InvestmentContent() {
    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <InvestmentsHeader />
            <PortfolioOverview />
            <div className="grid gap-4 md:grid-cols-7">
                <div className="col-span-4">
                    <InvestmentsList />
                </div>
                <div className="col-span-3">
                    <AssetAllocation />
                </div>
            </div>
        </div>
    );
} 