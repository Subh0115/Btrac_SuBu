import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import DashboardSidebar from "@/components/dashboard/dashboard-sidebar";
import MobileSidebar from "@/components/dashboard/mobile-sidebar";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { motion } from "framer-motion";

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
                    type: "savings"
                },
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

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    // Calculate total savings and monthly growth
    const totalSavings = user.accounts.reduce((sum, account) => sum + account.balance, 0);
    const monthlyTransactions = user.accounts.flatMap(account => 
        account.transactions.filter(t => {
            const date = new Date(t.date);
            const now = new Date();
            return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
        })
    );
    const monthlyGrowth = monthlyTransactions.reduce((sum, t) => 
        sum + (t.type === "income" ? t.amount : -t.amount), 0
    );

    return (
        <div className="flex h-screen">
            <DashboardSidebar />
            <MobileSidebar />
            <main className="flex-1 overflow-y-auto p-6">
                <motion.div
                    initial="hidden"
                    animate="show"
                    variants={container}
                    className="space-y-8"
                >
                    <motion.div variants={item}>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            <Card className="p-6">
                                <h3 className="text-sm font-medium text-gray-500">Total Savings</h3>
                                <p className="mt-2 text-2xl font-semibold">{formatCurrency(totalSavings)}</p>
                            </Card>
                            <Card className="p-6">
                                <h3 className="text-sm font-medium text-gray-500">Monthly Growth</h3>
                                <p className={`mt-2 text-2xl font-semibold ${
                                    monthlyGrowth >= 0 ? "text-green-600" : "text-red-600"
                                }`}>
                                    {monthlyGrowth >= 0 ? "+" : ""}{formatCurrency(monthlyGrowth)}
                                </p>
                            </Card>
                            <Card className="p-6">
                                <h3 className="text-sm font-medium text-gray-500">Savings Accounts</h3>
                                <p className="mt-2 text-2xl font-semibold">{user.accounts.length}</p>
                            </Card>
                        </div>
                    </motion.div>

                    <motion.div variants={item}>
                        <h2 className="text-xl font-semibold mb-4">Savings Accounts</h2>
                        <div className="grid gap-6 md:grid-cols-2">
                            {user.accounts.map((account) => (
                                <Card key={account.id} className="p-6 hover:shadow-lg transition-shadow">
                                    <div className="flex items-center justify-between mb-6">
                                        <div>
                                            <h3 className="font-medium">{account.name}</h3>
                                            <p className="text-sm text-gray-500">{account.currency}</p>
                                        </div>
                                        <p className="text-2xl font-semibold">{formatCurrency(account.balance)}</p>
                                    </div>
                                    <div className="space-y-4">
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
                    </motion.div>
                </motion.div>
            </main>
        </div>
    );
} 