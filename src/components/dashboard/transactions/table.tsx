"use client";

import { Card } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { MoreHorizontal, ArrowUpRight, ArrowDownRight } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

function formatDate(dateString: string) {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    };
    return new Intl.DateTimeFormat('en-US', options).format(new Date(dateString));
}

const transactions = [
    {
        id: "1",
        description: "Salary Deposit",
        category: "Income",
        amount: 5000,
        type: "income",
        date: "2024-03-29",
        account: "Main Account",
    },
    {
        id: "2",
        description: "Grocery Shopping",
        category: "Food",
        amount: 150.50,
        type: "expense",
        date: "2024-03-28",
        account: "Credit Card",
    },
    {
        id: "3",
        description: "Netflix Subscription",
        category: "Entertainment",
        amount: 15.99,
        type: "expense",
        date: "2024-03-27",
        account: "Main Account",
    },
    {
        id: "4",
        description: "Freelance Payment",
        category: "Income",
        amount: 1200,
        type: "income",
        date: "2024-03-26",
        account: "Savings",
    },
    {
        id: "5",
        description: "Restaurant Dinner",
        category: "Food",
        amount: 85.75,
        type: "expense",
        date: "2024-03-25",
        account: "Credit Card",
    },
];

export function TransactionsTable() {
    return (
        <Card>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Description</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Account</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {transactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <div className={`rounded-full p-2 ${
                                        transaction.type === "income"
                                            ? "bg-green-100 text-green-600"
                                            : "bg-red-100 text-red-600"
                                    }`}>
                                        {transaction.type === "income" ? (
                                            <ArrowUpRight className="h-4 w-4" />
                                        ) : (
                                            <ArrowDownRight className="h-4 w-4" />
                                        )}
                                    </div>
                                    {transaction.description}
                                </div>
                            </TableCell>
                            <TableCell>{transaction.category}</TableCell>
                            <TableCell>{transaction.account}</TableCell>
                            <TableCell>{formatDate(transaction.date)}</TableCell>
                            <TableCell className={`text-right font-medium ${
                                transaction.type === "income"
                                    ? "text-green-600"
                                    : "text-red-600"
                            }`}>
                                {transaction.type === "income" ? "+" : "-"}$
                                {transaction.amount.toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                })}
                            </TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            className="h-8 w-8 p-0"
                                        >
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem>
                                            Edit Transaction
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="text-red-600">
                                            Delete Transaction
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Card>
    );
} 