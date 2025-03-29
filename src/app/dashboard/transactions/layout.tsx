import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Transactions | BtrackiFiS",
    description: "View and manage your financial transactions",
};

export default function TransactionsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
} 