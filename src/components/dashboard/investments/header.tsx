"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function InvestmentsHeader() {
    return (
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Investments</h2>
                <p className="text-sm text-muted-foreground">
                    Track your investment portfolio and performance
                </p>
            </div>
            <div className="flex items-center gap-2">
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Investment
                </Button>
            </div>
        </div>
    );
} 