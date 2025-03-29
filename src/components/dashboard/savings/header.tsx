"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function SavingsHeader() {
    return (
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Savings</h2>
                <p className="text-sm text-muted-foreground">
                    Track your savings goals and progress
                </p>
            </div>
            <div className="flex items-center gap-2">
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Savings Goal
                </Button>
            </div>
        </div>
    );
} 