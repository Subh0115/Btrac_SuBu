import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import DashboardSidebar from "@/components/dashboard/dashboard-sidebar";
import MobileSidebar from "@/components/dashboard/mobile-sidebar";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

export default async function SettingsPage() {
    const { userId } = auth();
    if (!userId) {
        redirect("/auth/signin");
    }

    const user = await db.user.findUnique({
        where: { clerkId: userId },
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

    const settingsSections = [
        {
            title: "Profile Settings",
            description: "Manage your personal information and preferences",
            items: [
                { name: "Name", value: user.name || "Not set" },
                { name: "Email", value: user.email },
                { name: "Account Created", value: new Date(user.createdAt).toLocaleDateString() }
            ]
        },
        {
            title: "Account Preferences",
            description: "Customize your account settings",
            items: [
                { name: "Default Currency", value: "USD" },
                { name: "Time Zone", value: "Auto (Browser)" },
                { name: "Date Format", value: "MM/DD/YYYY" }
            ]
        },
        {
            title: "Notifications",
            description: "Configure your notification preferences",
            items: [
                { name: "Email Notifications", value: "Enabled" },
                { name: "Budget Alerts", value: "Enabled" },
                { name: "Investment Updates", value: "Weekly" }
            ]
        },
        {
            title: "Security",
            description: "Manage your account security settings",
            items: [
                { name: "Two-Factor Authentication", value: "Disabled" },
                { name: "Last Login", value: "Now" },
                { name: "Active Sessions", value: "1 device" }
            ]
        }
    ];

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
                    {settingsSections.map((section, index) => (
                        <motion.div key={section.title} variants={item}>
                            <Card className="p-6 hover:shadow-lg transition-shadow">
                                <div className="mb-4">
                                    <h2 className="text-xl font-semibold">{section.title}</h2>
                                    <p className="text-sm text-gray-500">{section.description}</p>
                                </div>
                                <div className="space-y-4">
                                    {section.items.map((item) => (
                                        <div key={item.name} className="flex items-center justify-between border-b pb-2 last:border-0">
                                            <span className="text-sm font-medium text-gray-500">{item.name}</span>
                                            <span className="text-sm font-medium">{item.value}</span>
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