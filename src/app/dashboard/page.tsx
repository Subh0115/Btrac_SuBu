import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import DashboardSidebar from "@/components/dashboard/dashboard-sidebar";
import MobileSidebar from "@/components/dashboard/mobile-sidebar";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

export default async function DashboardPage() {
    const { userId } = auth();
    if (!userId) {
        redirect("/auth/signin");
    }

    const user = await db.user.findUnique({
        where: { clerkId: userId },
        include: {
            accounts: true,
            transactions: {
                orderBy: { date: "desc" },
                take: 5,
            },
            budgets: true,
            investments: true,
        },
    });

    if (!user) {
        redirect("/auth/signin");
    }

    const totalBalance = user.accounts.reduce((sum, account) => sum + account.balance, 0);
    const totalInvestments = user.investments.reduce((sum, investment) => sum + investment.currentValue, 0);
    const recentTransactions = user.transactions;
    const activeBudgets = user.budgets.filter(budget => new Date(budget.endDate) > new Date());

    return (
        <div className="flex h-screen">
            <DashboardSidebar />
            <MobileSidebar />
            <main className="flex-1 overflow-y-auto p-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <Card className="p-6">
                        <h3 className="text-sm font-medium text-gray-500">Total Balance</h3>
                        <p className="mt-2 text-2xl font-semibold">{formatCurrency(totalBalance)}</p>
                    </Card>
                    <Card className="p-6">
                        <h3 className="text-sm font-medium text-gray-500">Total Investments</h3>
                        <p className="mt-2 text-2xl font-semibold">{formatCurrency(totalInvestments)}</p>
                    </Card>
                    <Card className="p-6">
                        <h3 className="text-sm font-medium text-gray-500">Active Budgets</h3>
                        <p className="mt-2 text-2xl font-semibold">{activeBudgets.length}</p>
                    </Card>
                    <Card className="p-6">
                        <h3 className="text-sm font-medium text-gray-500">Accounts</h3>
                        <p className="mt-2 text-2xl font-semibold">{user.accounts.length}</p>
                    </Card>
                </div>

                <div className="mt-8 grid gap-6 md:grid-cols-2">
                    <Card className="p-6">
                        <h3 className="text-lg font-medium">Recent Transactions</h3>
                        <div className="mt-4 space-y-4">
                            {recentTransactions.map((transaction) => (
                                <div key={transaction.id} className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">{transaction.description}</p>
                                        <p className="text-sm text-gray-500">
                                            {new Date(transaction.date).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <p className={`font-medium ${
                                        transaction.type === "income" ? "text-green-600" : "text-red-600"
                                    }`}>
                                        {transaction.type === "income" ? "+" : "-"}
                                        {formatCurrency(transaction.amount)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </Card>

                    <Card className="p-6">
                        <h3 className="text-lg font-medium">Active Budgets</h3>
                        <div className="mt-4 space-y-4">
                            {activeBudgets.map((budget) => (
                                <div key={budget.id}>
                                    <div className="flex items-center justify-between">
                                        <p className="font-medium">{budget.category}</p>
                                        <p className="text-sm text-gray-500">
                                            {formatCurrency(budget.spent)} / {formatCurrency(budget.amount)}
                                        </p>
                                    </div>
                                    <div className="mt-2 h-2 rounded-full bg-gray-200">
                                        <div
                                            className="h-2 rounded-full bg-blue-600"
                                            style={{
                                                width: `${Math.min((budget.spent / budget.amount) * 100, 100)}%`,
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </main>
        </div>
    );
} 