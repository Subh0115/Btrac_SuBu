"use client";

import { Search, Plus, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Investment } from "@/data/mock-investments";
import { useState } from "react";

interface InvestmentsHeaderProps {
    onAddInvestment: (investment: Omit<Investment, "id" | "performance" | "lastUpdated">) => void;
    searchQuery: string;
    onSearchChange: (query: string) => void;
}

export function InvestmentsHeader({ onAddInvestment, searchQuery, onSearchChange }: InvestmentsHeaderProps) {
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [newInvestment, setNewInvestment] = useState({
        name: "",
        type: "stock" as Investment["type"],
        symbol: "",
        quantity: 0,
        purchasePrice: 0,
        currentPrice: 0
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Basic validation
        if (!newInvestment.name || !newInvestment.symbol || 
            newInvestment.quantity <= 0 || 
            newInvestment.purchasePrice <= 0 || 
            newInvestment.currentPrice <= 0) {
            alert("Please fill in all fields with valid values");
            return;
        }

        onAddInvestment(newInvestment);
        setIsAddDialogOpen(false);
        setNewInvestment({
            name: "",
            type: "stock",
            symbol: "",
            quantity: 0,
            purchasePrice: 0,
            currentPrice: 0
        });
    };

    return (
        <Card className="bg-gradient-to-r from-blue-600 to-indigo-600">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <TrendingUp className="h-6 w-6 text-blue-100" />
                    <div>
                        <CardTitle className="text-2xl font-bold text-blue-50">
                            Investments
                        </CardTitle>
                        <CardDescription className="text-blue-100">
                            Track and manage your investment portfolio
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-100" />
                        <Input
                            placeholder="Search investments..."
                            className="pl-9 bg-blue-500/30 border-blue-400/50 text-blue-50 placeholder:text-blue-100 focus:ring-blue-200"
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                        />
                    </div>
                    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-blue-50 text-blue-600 hover:bg-blue-100">
                                <Plus className="mr-2 h-4 w-4" />
                                Add Investment
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                            <form onSubmit={handleSubmit}>
                                <DialogHeader>
                                    <DialogTitle>Add New Investment</DialogTitle>
                                    <DialogDescription>
                                        Enter the details of your new investment.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">Investment Name</Label>
                                        <Input
                                            id="name"
                                            placeholder="e.g., Apple Inc."
                                            value={newInvestment.name}
                                            onChange={(e) => setNewInvestment({
                                                ...newInvestment,
                                                name: e.target.value
                                            })}
                                            required
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="type">Investment Type</Label>
                                        <Select
                                            value={newInvestment.type}
                                            onValueChange={(value: Investment["type"]) =>
                                                setNewInvestment({
                                                    ...newInvestment,
                                                    type: value
                                                })
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="stock">Stock</SelectItem>
                                                <SelectItem value="bond">Bond</SelectItem>
                                                <SelectItem value="mutual_fund">Mutual Fund</SelectItem>
                                                <SelectItem value="crypto">Cryptocurrency</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="symbol">Symbol</Label>
                                        <Input
                                            id="symbol"
                                            placeholder="e.g., AAPL"
                                            value={newInvestment.symbol}
                                            onChange={(e) => setNewInvestment({
                                                ...newInvestment,
                                                symbol: e.target.value
                                            })}
                                            required
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="quantity">Quantity</Label>
                                        <Input
                                            id="quantity"
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            placeholder="Enter quantity"
                                            value={newInvestment.quantity}
                                            onChange={(e) => setNewInvestment({
                                                ...newInvestment,
                                                quantity: parseFloat(e.target.value) || 0
                                            })}
                                            required
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="purchasePrice">Purchase Price</Label>
                                        <Input
                                            id="purchasePrice"
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            placeholder="Enter purchase price"
                                            value={newInvestment.purchasePrice}
                                            onChange={(e) => setNewInvestment({
                                                ...newInvestment,
                                                purchasePrice: parseFloat(e.target.value) || 0
                                            })}
                                            required
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="currentPrice">Current Price</Label>
                                        <Input
                                            id="currentPrice"
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            placeholder="Enter current price"
                                            value={newInvestment.currentPrice}
                                            onChange={(e) => setNewInvestment({
                                                ...newInvestment,
                                                currentPrice: parseFloat(e.target.value) || 0
                                            })}
                                            required
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                                        Add Investment
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </CardContent>
        </Card>
    );
} 