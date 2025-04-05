import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('image') as File;

        if (!file) {
            return NextResponse.json(
                { message: "No image file provided" },
                { status: 400 }
            );
        }

        // Validate file type
        if (!file.type.startsWith('image/')) {
            return NextResponse.json(
                { message: "File must be an image" },
                { status: 400 }
            );
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            return NextResponse.json(
                { message: "Image size must be less than 5MB" },
                { status: 400 }
            );
        }

        // In a real application, you would:
        // 1. Upload the file to a storage service (e.g., AWS S3, Cloudinary)
        // 2. Get back a URL for the uploaded file
        // For now, we'll create a data URL from the file
        const buffer = await file.arrayBuffer();
        const base64 = Buffer.from(buffer).toString('base64');
        const dataUrl = `data:${file.type};base64,${base64}`;

        return NextResponse.json({ imageUrl: dataUrl });
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to upload image" },
            { status: 500 }
        );
    }
} 