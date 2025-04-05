import { NextResponse } from 'next/server';

// Mock FAQ data - replace with your actual database
const faqs = [
    {
        id: "1",
        question: "How do I change my password?",
        answer: "To change your password, go to Settings > Security > Password. Enter your current password and choose a new one. Make sure it's strong and unique."
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
    },
    {
        id: "7",
        question: "How do I export my data?",
        answer: "Go to Settings > Account Management > Download Account Data to export your information in various formats."
    },
    {
        id: "8",
        question: "How do I manage my subscriptions?",
        answer: "Visit Settings > Subscriptions to view, modify, or cancel your subscription plans."
    },
    {
        id: "9",
        question: "How do I set up recurring payments?",
        answer: "Navigate to Payments > Recurring to set up automatic payments for your regular bills."
    },
    {
        id: "10",
        question: "How do I track my investments?",
        answer: "Go to the Investments section to view your portfolio, track performance, and manage your investments."
    },
    {
        id: "11",
        question: "How do I create a budget?",
        answer: "Access the Budget section to create and manage your monthly budgets and track spending."
    },
    {
        id: "12",
        question: "How do I set up savings goals?",
        answer: "Visit the Savings section to create goals, set targets, and track your progress."
    }
];

export async function GET() {
    try {
        return NextResponse.json(faqs);
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to fetch FAQs" },
            { status: 500 }
        );
    }
} 