"use client";

import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

export function SettingsHeader() {
    return (
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
                <p className="text-sm text-muted-foreground">
                    Manage your account settings and preferences
                </p>
            </div>
            <div className="flex items-center gap-2">
                <Button>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                </Button>
            </div>
        </div>
    );
} 