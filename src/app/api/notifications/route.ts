import { NextResponse } from 'next/server';

// Mock data - replace with your actual database
let notificationSettings = {
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    notificationCategories: {
        transactionAlerts: true,
        securityAlerts: true,
        savingsGoals: true,
        investmentUpdates: true,
        budgetAlerts: true,
        billReminders: true,
        marketUpdates: true,
        accountActivity: true
    },
    notificationSchedule: {
        dailySummary: "9:00 AM",
        weeklyReport: "Monday"
    }
};

export async function GET() {
    try {
        return NextResponse.json(notificationSettings);
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to fetch notification settings" },
            { status: 500 }
        );
    }
}

export async function PUT(request: Request) {
    try {
        const data = await request.json();

        // Validate notification schedule
        if (data.notificationSchedule) {
            const validTimes = ["8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM"];
            const validDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

            if (data.notificationSchedule.dailySummary && !validTimes.includes(data.notificationSchedule.dailySummary)) {
                return NextResponse.json(
                    { message: "Invalid daily summary time" },
                    { status: 400 }
                );
            }

            if (data.notificationSchedule.weeklyReport && !validDays.includes(data.notificationSchedule.weeklyReport)) {
                return NextResponse.json(
                    { message: "Invalid weekly report day" },
                    { status: 400 }
                );
            }
        }

        // Update the notification settings
        notificationSettings = {
            ...notificationSettings,
            ...data
        };

        return NextResponse.json(notificationSettings);
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to update notification settings" },
            { status: 500 }
        );
    }
} 