import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import DashboardSidebar from "@/components/dashboard/dashboard-sidebar";
import MobileSidebar from "@/components/dashboard/mobile-sidebar";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { motion } from "framer-motion";

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
                        take: 3,
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

    return (
        <div className="flex h-screen">
            <DashboardSidebar />
            <MobileSidebar />
            <main className="flex-1 overflow-y-auto p-6">
                <motion.div
                    initial="hidden"
                    animate="show"
                    variants={container}
                    className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                >
                    {user.accounts.map((account) => (
                        <motion.div key={account.id} variants={item}>
                            <Card className="p-6 hover:shadow-lg transition-shadow">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-medium">{account.name}</h3>
                                    <span className="text-sm text-gray-500">{account.type}</span>
                                </div>
                                <p className="text-2xl font-semibold mb-4">
                                    {formatCurrency(account.balance)}
                                </p>
                                <div className="space-y-3">
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
                        </motion.div>
                    ))}
                </motion.div>
            </main>
        </div>
    );
} 