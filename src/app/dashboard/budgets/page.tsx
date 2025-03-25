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

export default async function BudgetsPage() {
    const { userId } = auth();
    if (!userId) {
        redirect("/auth/signin");
    }

    const user = await db.user.findUnique({
        where: { clerkId: userId },
        include: {
            budgets: {
                orderBy: { startDate: "desc" },
            },
        },
    });

    if (!user) {
        redirect("/auth/signin");
    }

    const activeBudgets = user.budgets.filter(budget => new Date(budget.endDate) > new Date());
    const pastBudgets = user.budgets.filter(budget => new Date(budget.endDate) <= new Date());

    return (
        <div className="flex h-screen">
            <DashboardSidebar />
            <MobileSidebar />
            <main className="flex-1 overflow-y-auto p-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-semibold">Budgets</h1>
                    <Link href="/dashboard/budgets/new">
                        <Button>
                            <PlusIcon className="mr-2 h-4 w-4" />
                            Add Budget
                        </Button>
                    </Link>
                </div>

                <div className="space-y-6">
                    <div>
                        <h2 className="text-lg font-medium mb-4">Active Budgets</h2>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {activeBudgets.map((budget) => (
                                <Card key={budget.id} className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <h3 className="font-medium capitalize">{budget.category}</h3>
                                            <p className="text-sm text-gray-500 capitalize">{budget.period}</p>
                                        </div>
                                        <p className="text-2xl font-semibold">{formatCurrency(budget.amount)}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-500">Spent</span>
                                            <span className="font-medium">{formatCurrency(budget.spent)}</span>
                                        </div>
                                        <div className="h-2 rounded-full bg-gray-200">
                                            <div
                                                className="h-2 rounded-full bg-blue-600"
                                                style={{
                                                    width: `${Math.min((budget.spent / budget.amount) * 100, 100)}%`,
                                                }}
                                            />
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-500">Remaining</span>
                                            <span className="font-medium">{formatCurrency(budget.amount - budget.spent)}</span>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h2 className="text-lg font-medium mb-4">Past Budgets</h2>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {pastBudgets.map((budget) => (
                                <Card key={budget.id} className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <h3 className="font-medium capitalize">{budget.category}</h3>
                                            <p className="text-sm text-gray-500 capitalize">{budget.period}</p>
                                        </div>
                                        <p className="text-2xl font-semibold">{formatCurrency(budget.amount)}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-500">Spent</span>
                                            <span className="font-medium">{formatCurrency(budget.spent)}</span>
                                        </div>
                                        <div className="h-2 rounded-full bg-gray-200">
                                            <div
                                                className="h-2 rounded-full bg-blue-600"
                                                style={{
                                                    width: `${Math.min((budget.spent / budget.amount) * 100, 100)}%`,
                                                }}
                                            />
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-500">Remaining</span>
                                            <span className="font-medium">{formatCurrency(budget.amount - budget.spent)}</span>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
} 