import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        const { name, amount, currentValue, type, purchaseDate } = body;

        if (!name || !amount || !currentValue || !type || !purchaseDate) {
            return new NextResponse("Missing required fields", { status: 400 });
        }

        const investment = await db.investment.create({
            data: {
                userId,
                name,
                amount,
                currentValue,
                type,
                purchaseDate: new Date(purchaseDate),
            },
        });

        return NextResponse.json(investment);
    } catch (error) {
        console.error("[INVESTMENTS_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const investments = await db.investment.findMany({
            where: {
                userId,
            },
            orderBy: {
                purchaseDate: "desc",
            },
        });

        return NextResponse.json(investments);
    } catch (error) {
        console.error("[INVESTMENTS_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function PATCH(req: Request) {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        const { id, type, name, amount, currentValue, purchaseDate } = body;

        const investment = await db.investment.update({
            where: {
                id,
                userId,
            },
            data: {
                type,
                name,
                amount,
                currentValue,
                purchaseDate,
            },
        });

        return NextResponse.json(investment);
    } catch (error) {
        console.error("[INVESTMENTS_PATCH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return new NextResponse("Investment ID is required", { status: 400 });
        }

        await db.investment.delete({
            where: {
                id,
                userId,
            },
        });

        return new NextResponse(null, { status: 204 });
    } catch (error) {
        console.error("[INVESTMENTS_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
} 