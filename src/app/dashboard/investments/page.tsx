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

export default async function InvestmentsPage() {
    const { userId } = auth();
    if (!userId) {
        redirect("/auth/signin");
    }

    const user = await db.user.findUnique({
        where: { clerkId: userId },
        include: {
            investments: {
                orderBy: { purchaseDate: "desc" },
            },
        },
    });

    if (!user) {
        redirect("/auth/signin");
    }

    const totalValue = user.investments.reduce((sum, investment) => sum + investment.currentValue, 0);
    const totalGain = user.investments.reduce((sum, investment) => sum + (investment.currentValue - investment.amount), 0);
    const gainPercentage = totalValue > 0 ? (totalGain / totalValue) * 100 : 0;

    return (
        <div className="flex h-screen">
            <DashboardSidebar />
            <MobileSidebar />
            <main className="flex-1 overflow-y-auto p-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-semibold">Investments</h1>
                    <Link href="/dashboard/investments/new">
                        <Button>
                            <PlusIcon className="mr-2 h-4 w-4" />
                            Add Investment
                        </Button>
                    </Link>
                </div>

                <div className="grid gap-6 md:grid-cols-3 mb-8">
                    <Card className="p-6">
                        <h3 className="text-sm font-medium text-gray-500">Total Value</h3>
                        <p className="mt-2 text-2xl font-semibold">{formatCurrency(totalValue)}</p>
                    </Card>
                    <Card className="p-6">
                        <h3 className="text-sm font-medium text-gray-500">Total Gain/Loss</h3>
                        <p className={`mt-2 text-2xl font-semibold ${
                            totalGain >= 0 ? "text-green-600" : "text-red-600"
                        }`}>
                            {totalGain >= 0 ? "+" : ""}{formatCurrency(totalGain)}
                        </p>
                    </Card>
                    <Card className="p-6">
                        <h3 className="text-sm font-medium text-gray-500">Return Rate</h3>
                        <p className={`mt-2 text-2xl font-semibold ${
                            gainPercentage >= 0 ? "text-green-600" : "text-red-600"
                        }`}>
                            {gainPercentage >= 0 ? "+" : ""}{gainPercentage.toFixed(2)}%
                        </p>
                    </Card>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {user.investments.map((investment) => {
                        const gain = investment.currentValue - investment.amount;
                        const gainPercentage = (gain / investment.amount) * 100;

                        return (
                            <Card key={investment.id} className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <h3 className="font-medium">{investment.name}</h3>
                                        <p className="text-sm text-gray-500 capitalize">{investment.type}</p>
                                    </div>
                                    <p className="text-2xl font-semibold">{formatCurrency(investment.currentValue)}</p>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-500">Initial Investment</span>
                                        <span className="font-medium">{formatCurrency(investment.amount)}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-500">Gain/Loss</span>
                                        <span className={`font-medium ${
                                            gain >= 0 ? "text-green-600" : "text-red-600"
                                        }`}>
                                            {gain >= 0 ? "+" : ""}{formatCurrency(gain)}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-500">Return Rate</span>
                                        <span className={`font-medium ${
                                            gainPercentage >= 0 ? "text-green-600" : "text-red-600"
                                        }`}>
                                            {gainPercentage >= 0 ? "+" : ""}{gainPercentage.toFixed(2)}%
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-500">Purchase Date</span>
                                        <span className="font-medium">
                                            {new Date(investment.purchaseDate).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            </main>
        </div>
    );
} 