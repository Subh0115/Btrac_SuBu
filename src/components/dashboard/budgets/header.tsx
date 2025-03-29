"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function BudgetsHeader() {
    return (
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Budgets</h2>
                <p className="text-sm text-muted-foreground">
                    Set and manage your spending limits across categories
                </p>
            </div>
            <div className="flex items-center gap-2">
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Budget
                </Button>
            </div>
        </div>
    );
} 