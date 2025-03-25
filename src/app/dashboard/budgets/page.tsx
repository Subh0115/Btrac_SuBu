import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import DashboardSidebar from "@/components/dashboard/dashboard-sidebar";
import MobileSidebar from "@/components/dashboard/mobile-sidebar";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { motion } from "framer-motion";

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

    // Group budgets by status
    const activeBudgets = user.budgets.filter(budget => new Date(budget.endDate) > new Date());
    const expiredBudgets = user.budgets.filter(budget => new Date(budget.endDate) <= new Date());

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
                        <h2 className="text-xl font-semibold mb-4">Active Budgets</h2>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {activeBudgets.map((budget) => (
                                <Card key={budget.id} className="p-6 hover:shadow-lg transition-shadow">
                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <h3 className="font-medium">{budget.name}</h3>
                                            <p className="text-sm text-gray-500 capitalize">{budget.category.toLowerCase()}</p>
                                        </div>
                                        <span className="text-sm text-gray-500">{budget.period}</span>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between text-sm">
                                            <span>Progress</span>
                                            <span>{Math.round((budget.spent / budget.amount) * 100)}%</span>
                                        </div>
                                        <div className="h-2 rounded-full bg-gray-100">
                                            <div
                                                className={`h-2 rounded-full ${
                                                    (budget.spent / budget.amount) > 0.9
                                                        ? "bg-red-500"
                                                        : (budget.spent / budget.amount) > 0.7
                                                        ? "bg-yellow-500"
                                                        : "bg-green-500"
                                                }`}
                                                style={{
                                                    width: `${Math.min((budget.spent / budget.amount) * 100, 100)}%`,
                                                }}
                                            />
                                        </div>
                                        <div className="flex items-center justify-between font-medium">
                                            <span>{formatCurrency(budget.spent)}</span>
                                            <span>{formatCurrency(budget.amount)}</span>
                                        </div>
                                        <p className="text-sm text-gray-500">
                                            Ends on {new Date(budget.endDate).toLocaleDateString()}
                                        </p>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </motion.div>

                    {expiredBudgets.length > 0 && (
                        <motion.div variants={item}>
                            <h2 className="text-xl font-semibold mb-4">Past Budgets</h2>
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {expiredBudgets.map((budget) => (
                                    <Card key={budget.id} className="p-6 opacity-75">
                                        <div className="flex items-center justify-between mb-4">
                                            <div>
                                                <h3 className="font-medium">{budget.name}</h3>
                                                <p className="text-sm text-gray-500 capitalize">{budget.category.toLowerCase()}</p>
                                            </div>
                                            <span className="text-sm text-gray-500">{budget.period}</span>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between text-sm">
                                                <span>Final Status</span>
                                                <span>{Math.round((budget.spent / budget.amount) * 100)}%</span>
                                            </div>
                                            <div className="h-2 rounded-full bg-gray-100">
                                                <div
                                                    className="h-2 rounded-full bg-gray-400"
                                                    style={{
                                                        width: `${Math.min((budget.spent / budget.amount) * 100, 100)}%`,
                                                    }}
                                                />
                                            </div>
                                            <div className="flex items-center justify-between font-medium">
                                                <span>{formatCurrency(budget.spent)}</span>
                                                <span>{formatCurrency(budget.amount)}</span>
                                            </div>
                                            <p className="text-sm text-gray-500">
                                                Ended on {new Date(budget.endDate).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </motion.div>
            </main>
        </div>
    );
} 