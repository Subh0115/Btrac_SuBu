import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import DashboardSidebar from "@/components/dashboard/dashboard-sidebar";
import MobileSidebar from "@/components/dashboard/mobile-sidebar";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { motion } from "framer-motion";

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

    // Calculate total portfolio value and returns
    const totalInvested = user.investments.reduce((sum, inv) => sum + inv.amount, 0);
    const totalCurrentValue = user.investments.reduce((sum, inv) => sum + inv.currentValue, 0);
    const totalReturn = totalCurrentValue - totalInvested;
    const returnPercentage = (totalReturn / totalInvested) * 100;

    // Group investments by type
    const investmentsByType = user.investments.reduce((groups, investment) => {
        if (!groups[investment.type]) {
            groups[investment.type] = [];
        }
        groups[investment.type].push(investment);
        return groups;
    }, {} as Record<string, typeof user.investments>);

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
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                            <Card className="p-6">
                                <h3 className="text-sm font-medium text-gray-500">Total Invested</h3>
                                <p className="mt-2 text-2xl font-semibold">{formatCurrency(totalInvested)}</p>
                            </Card>
                            <Card className="p-6">
                                <h3 className="text-sm font-medium text-gray-500">Current Value</h3>
                                <p className="mt-2 text-2xl font-semibold">{formatCurrency(totalCurrentValue)}</p>
                            </Card>
                            <Card className="p-6">
                                <h3 className="text-sm font-medium text-gray-500">Total Return</h3>
                                <p className={`mt-2 text-2xl font-semibold ${totalReturn >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {totalReturn >= 0 ? '+' : ''}{formatCurrency(totalReturn)}
                                </p>
                            </Card>
                            <Card className="p-6">
                                <h3 className="text-sm font-medium text-gray-500">Return %</h3>
                                <p className={`mt-2 text-2xl font-semibold ${returnPercentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {returnPercentage >= 0 ? '+' : ''}{returnPercentage.toFixed(2)}%
                                </p>
                            </Card>
                        </div>
                    </motion.div>

                    {Object.entries(investmentsByType).map(([type, investments]) => (
                        <motion.div key={type} variants={item}>
                            <h2 className="text-xl font-semibold mb-4 capitalize">{type}</h2>
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {investments.map((investment) => (
                                    <Card key={investment.id} className="p-6 hover:shadow-lg transition-shadow">
                                        <div className="flex items-center justify-between mb-4">
                                            <div>
                                                <h3 className="font-medium">{investment.name}</h3>
                                                <p className="text-sm text-gray-500">
                                                    Purchased on {new Date(investment.purchaseDate).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-gray-500">Purchase Amount</span>
                                                <span className="font-medium">{formatCurrency(investment.amount)}</span>
                                            </div>
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-gray-500">Current Value</span>
                                                <span className="font-medium">{formatCurrency(investment.currentValue)}</span>
                                            </div>
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-gray-500">Return</span>
                                                <span className={`font-medium ${
                                                    investment.currentValue >= investment.amount ? 'text-green-600' : 'text-red-600'
                                                }`}>
                                                    {investment.currentValue >= investment.amount ? '+' : ''}
                                                    {formatCurrency(investment.currentValue - investment.amount)}
                                                    {' '}
                                                    ({((investment.currentValue - investment.amount) / investment.amount * 100).toFixed(2)}%)
                                                </span>
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </main>
        </div>
    );
} 