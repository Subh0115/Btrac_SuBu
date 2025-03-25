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

export default async function AccountsPage() {
    const { userId } = auth();
    if (!userId) {
        redirect("/auth/signin");
    }

    const user = await db.user.findUnique({
        where: { clerkId: userId },
        include: {
            accounts: {
                include: {
                    transactions: {
                        orderBy: { date: "desc" },
                        take: 5,
                    },
                },
            },
        },
    });

    if (!user) {
        redirect("/auth/signin");
    }

    return (
        <div className="flex h-screen">
            <DashboardSidebar />
            <MobileSidebar />
            <main className="flex-1 overflow-y-auto p-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-semibold">Accounts</h1>
                    <Link href="/dashboard/accounts/new">
                        <Button>
                            <PlusIcon className="mr-2 h-4 w-4" />
                            Add Account
                        </Button>
                    </Link>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {user.accounts.map((account) => (
                        <Card key={account.id} className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h3 className="font-medium">{account.name}</h3>
                                    <p className="text-sm text-gray-500 capitalize">{account.type}</p>
                                </div>
                                <p className="text-2xl font-semibold">{formatCurrency(account.balance)}</p>
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-sm font-medium text-gray-500">Recent Transactions</h4>
                                {account.transactions.map((transaction) => (
                                    <div key={transaction.id} className="flex items-center justify-between text-sm">
                                        <div>
                                            <p className="font-medium">{transaction.description}</p>
                                            <p className="text-gray-500">
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
                    ))}
                </div>
            </main>
        </div>
    );
} 