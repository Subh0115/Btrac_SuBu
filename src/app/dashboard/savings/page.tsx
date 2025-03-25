import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import DashboardSidebar from "@/components/dashboard/dashboard-sidebar";
import MobileSidebar from "@/components/dashboard/mobile-sidebar";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

export default async function SavingsPage() {
    const { userId } = auth();
    if (!userId) {
        redirect("/auth/signin");
    }

    const user = await db.user.findUnique({
        where: { clerkId: userId },
        include: {
            accounts: {
                where: {
                    type: "savings",
                },
            },
        },
    });

    if (!user) {
        redirect("/auth/signin");
    }

    const totalSavings = user.accounts.reduce((sum, account) => sum + account.balance, 0);

    return (
        <div className="flex h-screen">
            <DashboardSidebar />
            <MobileSidebar />
            <main className="flex-1 overflow-y-auto p-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-semibold">Savings</h1>
                    <Link href="/dashboard/savings/new">
                        <Button>
                            <PlusIcon className="mr-2 h-4 w-4" />
                            Add Savings Goal
                        </Button>
                    </Link>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
                    <Card className="p-6">
                        <h3 className="text-sm font-medium text-gray-500">Total Savings</h3>
                        <p className="mt-2 text-2xl font-semibold">{formatCurrency(totalSavings)}</p>
                    </Card>
                    <Card className="p-6">
                        <h3 className="text-sm font-medium text-gray-500">Savings Accounts</h3>
                        <p className="mt-2 text-2xl font-semibold">{user.accounts.length}</p>
                    </Card>
                    <Card className="p-6">
                        <h3 className="text-sm font-medium text-gray-500">Monthly Savings</h3>
                        <p className="mt-2 text-2xl font-semibold">Coming Soon</p>
                    </Card>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {user.accounts.map((account) => (
                        <Card key={account.id} className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h3 className="font-medium">{account.name}</h3>
                                    <p className="text-sm text-gray-500">Savings Account</p>
                                </div>
                                <p className="text-2xl font-semibold">{formatCurrency(account.balance)}</p>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-500">Currency</span>
                                    <span className="font-medium">{account.currency}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-500">Created</span>
                                    <span className="font-medium">
                                        {new Date(account.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </main>
        </div>
    );
} 