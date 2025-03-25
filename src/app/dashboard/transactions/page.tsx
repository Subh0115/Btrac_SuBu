import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import DashboardSidebar from "@/components/dashboard/dashboard-sidebar";
import MobileSidebar from "@/components/dashboard/mobile-sidebar";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { motion } from "framer-motion";

export default async function TransactionsPage() {
    const { userId } = auth();
    if (!userId) {
        redirect("/auth/signin");
    }

    const user = await db.user.findUnique({
        where: { clerkId: userId },
        include: {
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

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05
            }
        }
    };

    const item = {
        hidden: { opacity: 0, x: -20 },
        show: { opacity: 1, x: 0 }
    };

    // Group transactions by month
    const groupedTransactions = user.transactions.reduce((groups, transaction) => {
        const date = new Date(transaction.date);
        const monthYear = date.toLocaleString('default', { month: 'long', year: 'numeric' });
        
        if (!groups[monthYear]) {
            groups[monthYear] = [];
        }
        groups[monthYear].push(transaction);
        return groups;
    }, {} as Record<string, typeof user.transactions>);

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
                    {Object.entries(groupedTransactions).map(([monthYear, transactions]) => (
                        <motion.div key={monthYear} variants={item}>
                            <h2 className="text-xl font-semibold mb-4">{monthYear}</h2>
                            <Card className="overflow-hidden">
                                <div className="divide-y">
                                    {transactions.map((transaction) => (
                                        <div 
                                            key={transaction.id} 
                                            className="p-4 hover:bg-gray-50 transition-colors"
                                        >
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="font-medium">{transaction.description}</p>
                                                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                                                        <span>{transaction.account.name}</span>
                                                        <span>•</span>
                                                        <span>{new Date(transaction.date).toLocaleDateString()}</span>
                                                        <span>•</span>
                                                        <span className="capitalize">{transaction.category.toLowerCase()}</span>
                                                    </div>
                                                </div>
                                                <p className={`font-medium ${
                                                    transaction.type === "income" ? "text-green-600" : "text-red-600"
                                                }`}>
                                                    {transaction.type === "income" ? "+" : "-"}
                                                    {formatCurrency(transaction.amount)}
                                                </p>
                                            </div>
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