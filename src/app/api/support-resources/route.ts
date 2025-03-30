import { NextResponse } from 'next/server';

// Mock data - replace with your actual database
const supportResources = {
    documentation: [
        {
            id: "1",
            title: "Getting Started Guide",
            description: "Learn the basics of using our platform",
            url: "/docs/getting-started",
            category: "documentation"
        },
        {
            id: "2",
            title: "API Reference",
            description: "Complete API documentation and examples",
            url: "/docs/api",
            category: "documentation"
        }
    ],
    community: [
        {
            id: "3",
            title: "Community Forum",
            description: "Connect with other users and share experiences",
            url: "/community/forum",
            category: "community"
        },
        {
            id: "4",
            title: "Release Notes",
            description: "Latest updates and improvements",
            url: "/updates",
            category: "community"
        }
    ],
    account: [
        {
            id: "5",
            title: "Download Account Data",
            description: "Export your account information",
            url: "/account/export",
            category: "account"
        },
        {
            id: "6",
            title: "Privacy Settings",
            description: "Manage your privacy preferences",
            url: "/account/privacy",
            category: "account"
        },
        {
            id: "7",
            title: "Account Recovery",
            description: "Recover your account if you've lost access",
            url: "/account/recovery",
            category: "account"
        },
        {
            id: "8",
            title: "Security Settings",
            description: "Manage your security preferences",
            url: "/account/security",
            category: "account"
        }
    ],
    training: [
        {
            id: "9",
            title: "Video Tutorials",
            description: "Watch step-by-step video guides",
            url: "/tutorials/videos",
            category: "training"
        },
        {
            id: "10",
            title: "Best Practices",
            description: "Learn recommended usage patterns",
            url: "/tutorials/best-practices",
            category: "training"
        },
        {
            id: "11",
            title: "Tips & Tricks",
            description: "Discover useful tips and shortcuts",
            url: "/tutorials/tips",
            category: "training"
        }
    ]
};

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category');

        if (category) {
            return NextResponse.json(supportResources[category] || []);
        }

        return NextResponse.json(supportResources);
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to fetch support resources" },
            { status: 500 }
        );
    }
} 