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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default async function TransactionsPage() {
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
                include: {
                    account: true,
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
                    <h1 className="text-2xl font-semibold">Transactions</h1>
                    <Link href="/dashboard/transactions/new">
                        <Button>
                            <PlusIcon className="mr-2 h-4 w-4" />
                            Add Transaction
                        </Button>
                    </Link>
                </div>

                <div className="flex gap-4 mb-6">
                    <Select defaultValue="all">
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filter by type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Types</SelectItem>
                            <SelectItem value="income">Income</SelectItem>
                            <SelectItem value="expense">Expense</SelectItem>
                            <SelectItem value="transfer">Transfer</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select defaultValue="all">
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filter by account" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Accounts</SelectItem>
                            {user.accounts.map((account) => (
                                <SelectItem key={account.id} value={account.id}>
                                    {account.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <Card className="p-6">
                    <div className="space-y-4">
                        {user.transactions.map((transaction) => (
                            <div key={transaction.id} className="flex items-center justify-between py-4 border-b last:border-0">
                                <div>
                                    <p className="font-medium">{transaction.description}</p>
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        <span>{transaction.account.name}</span>
                                        <span>•</span>
                                        <span>{new Date(transaction.date).toLocaleDateString()}</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className={`font-medium ${
                                        transaction.type === "income" ? "text-green-600" : "text-red-600"
                                    }`}>
                                        {transaction.type === "income" ? "+" : "-"}
                                        {formatCurrency(transaction.amount)}
                                    </p>
                                    <p className="text-sm text-gray-500 capitalize">{transaction.category}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </main>
        </div>
    );
} 