import { NextResponse } from 'next/server';

// This is a mock database - replace with your actual database
let mockProfileData = {
    firstName: "Rahul",
    lastName: "Sharma",
    email: "rahul.sharma@example.com",
    phone: "+91 98765 43210",
    address: "123, Main Street, Mumbai, Maharashtra 400001",
    bio: "Financial advisor and tech enthusiast",
    timezone: "UTC+5:30",
    dateOfBirth: "1990-01-01",
    occupation: "Software Engineer",
    company: "Tech Solutions India",
    website: "https://rahulsharma.com",
    profileImage: "/avatars/01.png", // Add default profile image
    socialLinks: {
        twitter: "@rahulsharma",
        linkedin: "linkedin.com/in/rahulsharma",
        github: "github.com/rahulsharma"
    }
};

export async function GET() {
    try {
        return NextResponse.json(mockProfileData);
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to fetch profile data" },
            { status: 500 }
        );
    }
}

export async function PUT(request: Request) {
    try {
        const data = await request.json();

        // Validate required fields
        if (!data.firstName || !data.lastName || !data.email) {
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            return NextResponse.json(
                { message: "Invalid email format" },
                { status: 400 }
            );
        }

        // Update the mock data
        mockProfileData = {
            ...mockProfileData,
            ...data,
            // Preserve the profile image if it's not being updated
            profileImage: data.profileImage || mockProfileData.profileImage
        };

        return NextResponse.json(mockProfileData);
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to update profile" },
            { status: 500 }
        );
    }
} 