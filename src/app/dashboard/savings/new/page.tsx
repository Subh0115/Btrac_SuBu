import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import DashboardSidebar from "@/components/dashboard/dashboard-sidebar";
import MobileSidebar from "@/components/dashboard/mobile-sidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewSavingsPage() {
    return (
        <div className="flex h-screen">
            <DashboardSidebar />
            <MobileSidebar />
            <main className="flex-1 overflow-y-auto p-6">
                <div className="flex items-center gap-4 mb-6">
                    <Link href="/dashboard/savings">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <h1 className="text-2xl font-semibold">Add New Savings Goal</h1>
                </div>

                <Card className="max-w-2xl mx-auto p-6">
                    <form className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="name">Goal Name</Label>
                            <Input id="name" placeholder="e.g., Emergency Fund" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="targetAmount">Target Amount</Label>
                            <Input id="targetAmount" type="number" step="0.01" placeholder="0.00" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="currentAmount">Current Amount</Label>
                            <Input id="currentAmount" type="number" step="0.01" placeholder="0.00" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="currency">Currency</Label>
                            <Select defaultValue="USD">
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="USD">USD</SelectItem>
                                    <SelectItem value="EUR">EUR</SelectItem>
                                    <SelectItem value="GBP">GBP</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="targetDate">Target Date</Label>
                            <Input id="targetDate" type="date" />
                        </div>

                        <div className="flex justify-end gap-4">
                            <Link href="/dashboard/savings">
                                <Button variant="outline">Cancel</Button>
                            </Link>
                            <Button type="submit">Create Savings Goal</Button>
                        </div>
                    </form>
                </Card>
            </main>
        </div>
    );
} 