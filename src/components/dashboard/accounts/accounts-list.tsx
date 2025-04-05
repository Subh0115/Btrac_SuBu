"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MoreHorizontal, Pencil, Trash2, Eye } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { formatAmount } from "@/lib/utils";
import { Building, CreditCard, Briefcase } from "lucide-react";

interface Account {
    id: string;
    name: string;
    type: string;
    icon: any;
    balance: number;
    accountNumber: string;
    bank: string;
    color: string;
    transactions: Array<{
        date: string;
        description: string;
        amount: number;
    }>;
}

interface AccountsListProps {
    accounts: Account[];
    onEditAccount: (account: Account) => void;
    onRemoveAccount: (accountId: string) => void;
}

export function AccountsList({ accounts, onEditAccount, onRemoveAccount }: AccountsListProps) {
    const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [editFormData, setEditFormData] = useState<Partial<Account>>({});

    const handleDeleteClick = (account: Account) => {
        setSelectedAccount(account);
        setIsDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        if (selectedAccount) {
            onRemoveAccount(selectedAccount.id);
            setIsDeleteDialogOpen(false);
            setSelectedAccount(null);
        }
    };

    const handleEditClick = (account: Account) => {
        setSelectedAccount(account);
        setEditFormData({
            name: account.name,
            type: account.type,
            bank: account.bank,
            balance: account.balance,
        });
        setIsEditDialogOpen(true);
    };

    const handleEditSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedAccount && editFormData) {
            const iconMap: { [key: string]: any } = {
                checking: Building,
                savings: Building,
                credit: CreditCard,
                investment: Briefcase,
            };

            const colorMap: { [key: string]: string } = {
                checking: "bg-blue-500",
                savings: "bg-green-500",
                credit: "bg-purple-500",
                investment: "bg-orange-500",
            };

            const updatedAccount: Account = {
                ...selectedAccount,
                ...editFormData,
                icon: iconMap[editFormData.type || selectedAccount.type],
                color: colorMap[editFormData.type || selectedAccount.type],
            };

            onEditAccount(updatedAccount);
            setIsEditDialogOpen(false);
            setSelectedAccount(null);
            setEditFormData({});
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>All Accounts</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {accounts.map((account) => (
                        <div
                            key={account.id}
                            className="flex items-center justify-between rounded-lg border p-4 hover:bg-accent/50 transition-colors"
                        >
                            <div className="flex items-center gap-4">
                                <div className={`rounded-full p-2 ${account.color}`}>
                                    <account.icon className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-medium">{account.name}</h3>
                                    <p className="text-sm text-muted-foreground">
                                        {account.bank} • {account.accountNumber}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="text-right">
                                    <p className="font-medium">
                                        {formatAmount(account.balance)}
                                    </p>
                                    <p className="text-sm text-muted-foreground capitalize">
                                        {account.type}
                                    </p>
                                </div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem>
                                            <Eye className="mr-2 h-4 w-4" />
                                            View Details
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => handleEditClick(account)}>
                                            <Pencil className="mr-2 h-4 w-4" />
                                            Edit Account
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            className="text-destructive"
                                            onClick={() => handleDeleteClick(account)}
                                        >
                                            <Trash2 className="mr-2 h-4 w-4" />
                                            Remove Account
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>

            {/* Delete Account Dialog */}
            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Remove Account</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to remove this account? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteConfirm}>
                            Remove
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Edit Account Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Account</DialogTitle>
                        <DialogDescription>
                            Update your account information.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleEditSubmit} className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="edit-name">Account Name</Label>
                            <Input 
                                id="edit-name" 
                                placeholder="Enter account name"
                                value={editFormData.name || ""}
                                onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="edit-type">Account Type</Label>
                            <Select 
                                value={editFormData.type || ""}
                                onValueChange={(value) => setEditFormData({ ...editFormData, type: value })}
                                required
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select account type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="checking">Checking</SelectItem>
                                    <SelectItem value="savings">Savings</SelectItem>
                                    <SelectItem value="credit">Credit Card</SelectItem>
                                    <SelectItem value="investment">Investment</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="edit-bank">Bank/Institution</Label>
                            <Input 
                                id="edit-bank" 
                                placeholder="Enter bank or institution name"
                                value={editFormData.bank || ""}
                                onChange={(e) => setEditFormData({ ...editFormData, bank: e.target.value })}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="edit-balance">Current Balance</Label>
                            <Input 
                                id="edit-balance" 
                                type="number" 
                                placeholder="Enter current balance"
                                value={editFormData.balance || ""}
                                onChange={(e) => setEditFormData({ ...editFormData, balance: parseFloat(e.target.value) })}
                                required
                            />
                        </div>
                        <Button type="submit" className="mt-4">Save Changes</Button>
                    </form>
                </DialogContent>
            </Dialog>
        </Card>
    );
} 