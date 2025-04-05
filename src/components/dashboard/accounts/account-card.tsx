"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, CreditCard } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AccountCardProps {
    account: {
        id: string;
        name: string;
        type: string;
        balance: number;
        currency: string;
        lastTransaction: string;
        cardNumber: string;
    };
}

export function AccountCard({ account }: AccountCardProps) {
    return (
        <Card className="p-6">
            <div className="flex items-start justify-between">
                <div className="space-y-1">
                    <h3 className="font-medium">{account.name}</h3>
                    <p className="text-sm text-muted-foreground capitalize">
                        {account.type}
                    </p>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit Account</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                            Delete Account
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="mt-6">
                <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">Balance</p>
                    <p className="text-2xl font-bold">
                        {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: account.currency,
                        }).format(account.balance)}
                    </p>
                </div>
                <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                    <CreditCard className="h-4 w-4" />
                    <span>{account.cardNumber}</span>
                </div>
                <div className="mt-4 text-sm text-muted-foreground">
                    Last transaction: {new Date(account.lastTransaction).toLocaleDateString()}
                </div>
            </div>

            <div className="mt-6 flex gap-2">
                <Button variant="outline" className="flex-1">
                    Transfer
                </Button>
                <Button variant="outline" className="flex-1">
                    Pay
                </Button>
            </div>
        </Card>
    );
} 