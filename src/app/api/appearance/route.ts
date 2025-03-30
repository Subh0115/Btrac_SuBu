import { NextResponse } from 'next/server';

// Mock data - replace with your actual database
let appearanceSettings = {
    theme: "system",
    accentColor: "blue",
    fontSize: "medium",
    fontFamily: "system",
    layoutDensity: "comfortable",
    animationSpeed: "normal"
};

export async function GET() {
    try {
        return NextResponse.json(appearanceSettings);
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to fetch appearance settings" },
            { status: 500 }
        );
    }
}

export async function PUT(request: Request) {
    try {
        const data = await request.json();

        // Validate theme
        const validThemes = ["light", "dark", "system"];
        if (data.theme && !validThemes.includes(data.theme)) {
            return NextResponse.json(
                { message: "Invalid theme selection" },
                { status: 400 }
            );
        }

        // Validate accent color
        const validAccentColors = [
            "blue", "green", "purple", "red", "orange", "pink",
            "yellow", "teal", "indigo", "violet", "cyan", "emerald"
        ];
        if (data.accentColor && !validAccentColors.includes(data.accentColor)) {
            return NextResponse.json(
                { message: "Invalid accent color selection" },
                { status: 400 }
            );
        }

        // Validate font size
        const validFontSizes = ["small", "medium", "large", "xlarge"];
        if (data.fontSize && !validFontSizes.includes(data.fontSize)) {
            return NextResponse.json(
                { message: "Invalid font size selection" },
                { status: 400 }
            );
        }

        // Validate font family
        const validFontFamilies = [
            "system", "inter", "roboto", "open-sans", "lato", "montserrat"
        ];
        if (data.fontFamily && !validFontFamilies.includes(data.fontFamily)) {
            return NextResponse.json(
                { message: "Invalid font family selection" },
                { status: 400 }
            );
        }

        // Validate layout density
        const validLayoutDensities = ["compact", "comfortable", "spacious"];
        if (data.layoutDensity && !validLayoutDensities.includes(data.layoutDensity)) {
            return NextResponse.json(
                { message: "Invalid layout density selection" },
                { status: 400 }
            );
        }

        // Validate animation speed
        const validAnimationSpeeds = ["fast", "normal", "slow", "none"];
        if (data.animationSpeed && !validAnimationSpeeds.includes(data.animationSpeed)) {
            return NextResponse.json(
                { message: "Invalid animation speed selection" },
                { status: 400 }
            );
        }

        // Update the appearance settings
        appearanceSettings = {
            ...appearanceSettings,
            ...data
        };

        return NextResponse.json(appearanceSettings);
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to update appearance settings" },
            { status: 500 }
        );
    }
} 