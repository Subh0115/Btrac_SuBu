import { Metadata } from "next";
import { SettingsContent } from "@/components/dashboard/settings/settings-content";

export const metadata: Metadata = {
    title: "Settings | BtrackiFiS",
    description: "Manage your account settings and preferences",
};

export default function SettingsPage() {
    return <SettingsContent />;
} 