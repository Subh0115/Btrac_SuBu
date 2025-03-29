"use client";

import { SettingsHeader } from "@/components/dashboard/settings/header";
import { ProfileSettings } from "@/components/dashboard/settings/profile-settings";
import { AccountPreferences } from "@/components/dashboard/settings/account-preferences";
import { NotificationSettings } from "@/components/dashboard/settings/notification-settings";
import { SecuritySettings } from "@/components/dashboard/settings/security-settings";

export function SettingsContent() {
    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <SettingsHeader />
            <div className="space-y-6">
                <ProfileSettings />
                <AccountPreferences />
                <NotificationSettings />
                <SecuritySettings />
            </div>
        </div>
    );
} 