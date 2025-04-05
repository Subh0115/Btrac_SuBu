import { NextResponse } from 'next/server';

// Mock data - replace with your actual database
let userPreferences = {
    currency: "usd",
    dateFormat: "mm/dd/yyyy",
    language: "en",
    timeFormat: "12h",
    numberFormat: "standard",
    defaultView: "dashboard"
};

export async function GET() {
    try {
        return NextResponse.json(userPreferences);
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to fetch preferences" },
            { status: 500 }
        );
    }
}

export async function PUT(request: Request) {
    try {
        const data = await request.json();

        // Validate currency
        const validCurrencies = [
            "usd", "eur", "gbp", "inr", "jpy", "cad", "aud", "sgd",
            "hkd", "nzd", "chf", "cny"
        ];
        if (data.currency && !validCurrencies.includes(data.currency)) {
            return NextResponse.json(
                { message: "Invalid currency selection" },
                { status: 400 }
            );
        }

        // Validate date format
        const validDateFormats = [
            "mm/dd/yyyy", "dd/mm/yyyy", "yyyy-mm-dd", "dd.mm.yyyy",
            "dd/mm/yy", "mm/dd/yy", "dd-mm-yyyy", "yyyy/mm/dd"
        ];
        if (data.dateFormat && !validDateFormats.includes(data.dateFormat)) {
            return NextResponse.json(
                { message: "Invalid date format selection" },
                { status: 400 }
            );
        }

        // Validate language
        const validLanguages = [
            "en", "es", "fr", "de", "hi", "bn", "ja", "ko",
            "zh", "ru", "pt", "it", "nl", "pl", "ar"
        ];
        if (data.language && !validLanguages.includes(data.language)) {
            return NextResponse.json(
                { message: "Invalid language selection" },
                { status: 400 }
            );
        }

        // Validate time format
        const validTimeFormats = ["12h", "24h"];
        if (data.timeFormat && !validTimeFormats.includes(data.timeFormat)) {
            return NextResponse.json(
                { message: "Invalid time format selection" },
                { status: 400 }
            );
        }

        // Validate number format
        const validNumberFormats = ["standard", "european", "indian"];
        if (data.numberFormat && !validNumberFormats.includes(data.numberFormat)) {
            return NextResponse.json(
                { message: "Invalid number format selection" },
                { status: 400 }
            );
        }

        // Validate default view
        const validDefaultViews = ["dashboard", "accounts", "transactions", "investments", "budget"];
        if (data.defaultView && !validDefaultViews.includes(data.defaultView)) {
            return NextResponse.json(
                { message: "Invalid default view selection" },
                { status: 400 }
            );
        }

        // Update the preferences
        userPreferences = {
            ...userPreferences,
            ...data
        };

        return NextResponse.json(userPreferences);
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to update preferences" },
            { status: 500 }
        );
    }
} 