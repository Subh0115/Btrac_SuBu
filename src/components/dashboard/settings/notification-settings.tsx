"use client";

import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export function NotificationSettings() {
    return (
        <Card className="p-6">
            <div className="space-y-6">
                <div>
                    <h3 className="text-lg font-medium">Notification Settings</h3>
                    <p className="text-sm text-muted-foreground">
                        Choose what notifications you want to receive
                    </p>
                </div>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label>Email Notifications</Label>
                            <p className="text-sm text-muted-foreground">
                                Receive email updates about your account activity
                            </p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label>Budget Alerts</Label>
                            <p className="text-sm text-muted-foreground">
                                Get notified when you're close to your budget limits
                            </p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label>Savings Goals Updates</Label>
                            <p className="text-sm text-muted-foreground">
                                Receive updates on your savings goals progress
                            </p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label>Investment Reports</Label>
                            <div className="space-y-2">
                                <p className="text-sm text-muted-foreground">
                                    Choose how often you want to receive investment reports
                                </p>
                                <Select defaultValue="weekly">
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select frequency" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="daily">Daily</SelectItem>
                                        <SelectItem value="weekly">Weekly</SelectItem>
                                        <SelectItem value="monthly">Monthly</SelectItem>
                                        <SelectItem value="never">Never</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
} 