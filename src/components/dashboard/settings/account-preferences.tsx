"use client";

import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export function AccountPreferences() {
    return (
        <Card className="p-6">
            <div className="space-y-6">
                <div>
                    <h3 className="text-lg font-medium">Account Preferences</h3>
                    <p className="text-sm text-muted-foreground">
                        Customize your account display settings
                    </p>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                        <Label htmlFor="currency">Default Currency</Label>
                        <Select defaultValue="usd">
                            <SelectTrigger id="currency">
                                <SelectValue placeholder="Select currency" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="usd">USD ($)</SelectItem>
                                <SelectItem value="eur">EUR (€)</SelectItem>
                                <SelectItem value="gbp">GBP (£)</SelectItem>
                                <SelectItem value="jpy">JPY (¥)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="timezone">Time Zone</Label>
                        <Select defaultValue="auto">
                            <SelectTrigger id="timezone">
                                <SelectValue placeholder="Select timezone" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="auto">Auto (Browser)</SelectItem>
                                <SelectItem value="utc">UTC</SelectItem>
                                <SelectItem value="est">Eastern Time</SelectItem>
                                <SelectItem value="pst">Pacific Time</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="dateFormat">Date Format</Label>
                        <Select defaultValue="mm-dd-yyyy">
                            <SelectTrigger id="dateFormat">
                                <SelectValue placeholder="Select date format" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="mm-dd-yyyy">MM/DD/YYYY</SelectItem>
                                <SelectItem value="dd-mm-yyyy">DD/MM/YYYY</SelectItem>
                                <SelectItem value="yyyy-mm-dd">YYYY/MM/DD</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
        </Card>
    );
} 