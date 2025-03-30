import { NextResponse } from 'next/server';

// Mock data - replace with your actual database
let supportTickets = [
    {
        id: "1",
        subject: "Password Reset Issue",
        message: "Unable to reset password",
        status: "open",
        createdAt: "2024-03-15T10:00:00Z",
        priority: "high"
    },
    {
        id: "2",
        subject: "Account Connection",
        message: "Need help connecting bank account",
        status: "in_progress",
        createdAt: "2024-03-14T15:30:00Z",
        priority: "medium"
    }
];

// FAQ data
const faqs = [
    {
        id: "1",
        question: "How do I change my password?",
        answer: "Go to Settings > Security > Password. Enter your current password and choose a new one. Make sure it's strong and unique."
    },
    {
        id: "2",
        question: "How do I update my profile?",
        answer: "Navigate to Settings > Profile. You can update your personal information, profile picture, and other details there."
    },
    {
        id: "3",
        question: "How do I manage notifications?",
        answer: "Visit Settings > Notifications to customize your notification preferences for different types of alerts."
    },
    {
        id: "4",
        question: "How do I connect my bank account?",
        answer: "Go to Settings > Connected Accounts > Add New Connection. Follow the secure connection process for your bank."
    },
    {
        id: "5",
        question: "How do I change my theme?",
        answer: "Access Settings > Appearance to choose between light, dark, or system theme."
    },
    {
        id: "6",
        question: "How do I set up 2FA?",
        answer: "In Settings > Security, enable Two-Factor Authentication and follow the setup process."
    }
];

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const type = searchParams.get('type');

        if (type === 'tickets') {
            return NextResponse.json(supportTickets);
        } else if (type === 'faqs') {
            return NextResponse.json(faqs);
        }

        return NextResponse.json({ message: "Invalid request type" }, { status: 400 });
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to fetch help data" },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();

        // Validate required fields for support ticket
        if (!data.subject || !data.message) {
            return NextResponse.json(
                { message: "Subject and message are required" },
                { status: 400 }
            );
        }

        // Create new support ticket
        const newTicket = {
            id: Date.now().toString(),
            subject: data.subject,
            message: data.message,
            status: "open",
            createdAt: new Date().toISOString(),
            priority: data.priority || "medium"
        };

        supportTickets.push(newTicket);
        return NextResponse.json(newTicket);
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to create support ticket" },
            { status: 500 }
        );
    }
}

export async function PUT(request: Request) {
    try {
        const data = await request.json();

        // Validate ticket ID
        const ticketIndex = supportTickets.findIndex(ticket => ticket.id === data.id);
        if (ticketIndex === -1) {
            return NextResponse.json(
                { message: "Ticket not found" },
                { status: 404 }
            );
        }

        // Update ticket
        supportTickets[ticketIndex] = {
            ...supportTickets[ticketIndex],
            ...data
        };

        return NextResponse.json(supportTickets[ticketIndex]);
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to update support ticket" },
            { status: 500 }
        );
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { message: "Ticket ID is required" },
                { status: 400 }
            );
        }

        // Find and remove ticket
        const ticketIndex = supportTickets.findIndex(ticket => ticket.id === id);
        if (ticketIndex === -1) {
            return NextResponse.json(
                { message: "Ticket not found" },
                { status: 404 }
            );
        }

        supportTickets.splice(ticketIndex, 1);
        return NextResponse.json({ message: "Ticket removed successfully" });
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to remove support ticket" },
            { status: 500 }
        );
    }
} 