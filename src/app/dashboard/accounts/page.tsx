import { Metadata } from "next";
import { AccountsContent } from "@/components/dashboard/accounts/accounts-content";

export const metadata: Metadata = {
    title: "Accounts | BtrackiFiS",
    description: "Manage your financial accounts and track your transactions",
};

export default function AccountsPage() {
    return <AccountsContent />;
} 