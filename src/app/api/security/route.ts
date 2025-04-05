import { NextResponse } from 'next/server';

// Mock data - replace with your actual database
let securitySettings = {
    twoFactorEnabled: false,
    loginNotifications: false,
    securityQuestions: [
        { question: "What was your first pet's name?", answer: "" },
        { question: "What city were you born in?", answer: "" },
        { question: "What is your mother's maiden name?", answer: "" }
    ],
    activeSessions: [
        { device: "Chrome on Windows", location: "New York, USA", lastActive: "2 minutes ago" },
        { device: "Safari on iPhone", location: "San Francisco, USA", lastActive: "1 hour ago" }
    ]
};

export async function GET() {
    try {
        return NextResponse.json(securitySettings);
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to fetch security settings" },
            { status: 500 }
        );
    }
}

export async function PUT(request: Request) {
    try {
        const data = await request.json();

        // Validate security questions
        if (data.securityQuestions) {
            for (const question of data.securityQuestions) {
                if (!question.question || !question.answer) {
                    return NextResponse.json(
                        { message: "All security questions must have both question and answer" },
                        { status: 400 }
                    );
                }
            }
        }

        // Update the security settings
        securitySettings = {
            ...securitySettings,
            ...data
        };

        return NextResponse.json(securitySettings);
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to update security settings" },
            { status: 500 }
        );
    }
}

export async function DELETE(request: Request) {
    try {
        const { sessionId } = await request.json();

        if (!sessionId) {
            return NextResponse.json(
                { message: "Session ID is required" },
                { status: 400 }
            );
        }

        // Remove the session from active sessions
        securitySettings.activeSessions = securitySettings.activeSessions.filter(
            session => session.device !== sessionId
        );

        return NextResponse.json(securitySettings);
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to end session" },
            { status: 500 }
        );
    }
} 