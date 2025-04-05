"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Shield, Key, Smartphone } from "lucide-react";

export function SecuritySettings() {
    return (
        <Card className="p-6">
            <div className="space-y-6">
                <div>
                    <h3 className="text-lg font-medium">Security Settings</h3>
                    <p className="text-sm text-muted-foreground">
                        Manage your account security preferences
                    </p>
                </div>
                <div className="space-y-6">
                    <div className="flex items-start gap-4">
                        <div className="rounded-full p-2 bg-blue-100 text-blue-600">
                            <Shield className="h-4 w-4" />
                        </div>
                        <div className="space-y-4 flex-1">
                            <div>
                                <h4 className="text-sm font-medium">Two-Factor Authentication</h4>
                                <p className="text-sm text-muted-foreground">
                                    Add an extra layer of security to your account
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Switch />
                                <Label>Enable 2FA</Label>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="rounded-full p-2 bg-green-100 text-green-600">
                            <Key className="h-4 w-4" />
                        </div>
                        <div className="space-y-4 flex-1">
                            <div>
                                <h4 className="text-sm font-medium">Change Password</h4>
                                <p className="text-sm text-muted-foreground">
                                    Update your password regularly to keep your account secure
                                </p>
                            </div>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="currentPassword">Current Password</Label>
                                    <Input
                                        id="currentPassword"
                                        type="password"
                                        placeholder="Enter current password"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="newPassword">New Password</Label>
                                    <Input
                                        id="newPassword"
                                        type="password"
                                        placeholder="Enter new password"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                                    <Input
                                        id="confirmPassword"
                                        type="password"
                                        placeholder="Confirm new password"
                                    />
                                </div>
                                <Button>Update Password</Button>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="rounded-full p-2 bg-purple-100 text-purple-600">
                            <Smartphone className="h-4 w-4" />
                        </div>
                        <div className="space-y-4 flex-1">
                            <div>
                                <h4 className="text-sm font-medium">Active Sessions</h4>
                                <p className="text-sm text-muted-foreground">
                                    Manage and monitor your active sessions
                                </p>
                            </div>
                            <div className="space-y-4">
                                <div className="rounded-lg border p-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium">Current Device</p>
                                            <p className="text-sm text-muted-foreground">
                                                Windows • Chrome • IP: 192.168.1.1
                                            </p>
                                        </div>
                                        <Button variant="outline" size="sm">
                                            Current
                                        </Button>
                                    </div>
                                </div>
                                <Button variant="destructive">Sign Out All Devices</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
} 