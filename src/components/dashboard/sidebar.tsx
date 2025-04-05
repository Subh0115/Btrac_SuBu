"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    Search,
    LayoutDashboard,
    CreditCard,
    Receipt,
    Wallet,
    LineChart,
    PiggyBank,
    Settings,
    LogOut
} from "lucide-react";
import { Input } from "@/components/ui/input";

const routes = [
    {
        label: "Overview",
        icon: LayoutDashboard,
        href: "/dashboard",
    },
    {
        label: "Accounts",
        icon: CreditCard,
        href: "/dashboard/accounts",
    },
    {
        label: "Transactions",
        icon: Receipt,
        href: "/dashboard/transactions",
    },
    {
        label: "Budgets",
        icon: Wallet,
        href: "/dashboard/budgets",
    },
    {
        label: "Investments",
        icon: LineChart,
        href: "/dashboard/investments",
    },
    {
        label: "Savings",
        icon: PiggyBank,
        href: "/dashboard/savings",
    },
    {
        label: "Settings",
        icon: Settings,
        href: "/dashboard/settings",
    },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="flex h-full w-60 flex-col border-r bg-black">
            <div className="flex h-14 items-center border-b px-4">
                <div className="relative flex-1">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search..."
                        className="pl-8 bg-transparent border-0"
                    />
                </div>
            </div>
            <div className="flex-1 overflow-auto py-2">
                <nav className="grid gap-1 px-2">
                    {routes.map((route) => {
                        const Icon = route.icon;
                        return (
                            <Link
                                key={route.href}
                                href={route.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                                    pathname === route.href 
                                        ? "bg-gray-800 text-white" 
                                        : "text-gray-400 hover:bg-gray-800 hover:text-white"
                                )}
                            >
                                <Icon className="h-4 w-4" />
                                {route.label}
                            </Link>
                        );
                    })}
                </nav>
            </div>
            <div className="mt-auto border-t p-4">
                <Link
                    href="/auth/signout"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-400 transition-colors hover:bg-gray-800 hover:text-white"
                >
                    <LogOut className="h-4 w-4" />
                    Logout
                </Link>
            </div>
        </div>
    );
} 