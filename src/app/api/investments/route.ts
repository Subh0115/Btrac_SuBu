import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        const { type, name, amount, currentValue, purchaseDate } = body;

        const investment = await db.investment.create({
            data: {
                userId,
                type,
                name,
                amount,
                currentValue,
                purchaseDate,
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

        const { searchParams } = new URL(req.url);
        const type = searchParams.get("type");

        const where: any = { userId };
        if (type) where.type = type;

        const investments = await db.investment.findMany({
            where,
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