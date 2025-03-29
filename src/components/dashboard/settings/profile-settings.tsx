"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera } from "lucide-react";

export function ProfileSettings() {
    return (
        <Card className="p-6">
            <div className="space-y-6">
                <div>
                    <h3 className="text-lg font-medium">Profile Settings</h3>
                    <p className="text-sm text-muted-foreground">
                        Update your personal information and profile picture
                    </p>
                </div>
                <div className="flex items-center gap-6">
                    <Avatar className="h-24 w-24">
                        <AvatarImage src="/placeholder-avatar.jpg" />
                        <AvatarFallback>JP</AvatarFallback>
                    </Avatar>
                    <div>
                        <Button variant="outline" size="sm" className="mb-2">
                            <Camera className="mr-2 h-4 w-4" />
                            Change Picture
                        </Button>
                        <p className="text-xs text-muted-foreground">
                            JPG, GIF or PNG. Max size of 2MB.
                        </p>
                    </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                            id="firstName"
                            placeholder="John"
                            defaultValue="John"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                            id="lastName"
                            placeholder="Doe"
                            defaultValue="Doe"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="john@example.com"
                            defaultValue="john@example.com"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                            id="phone"
                            type="tel"
                            placeholder="+1 (555) 000-0000"
                            defaultValue="+1 (555) 000-0000"
                        />
                    </div>
                </div>
            </div>
        </Card>
    );
} 