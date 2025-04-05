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
        const { name, category, amount, period, startDate, endDate } = body;

        if (!name) {
            return new NextResponse("Name is required", { status: 400 });
        }

        const budget = await db.budget.create({
            data: {
                userId,
                name,
                category,
                amount,
                period,
                startDate,
                endDate,
            },
        });

        return NextResponse.json(budget);
    } catch (error) {
        console.error("[BUDGETS_POST]", error);
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
        const category = searchParams.get("category");
        const period = searchParams.get("period");
        const startDate = searchParams.get("startDate");
        const endDate = searchParams.get("endDate");

        const where: any = { userId };

        if (category) where.category = category;
        if (period) where.period = period;
        if (startDate && endDate) {
            where.startDate = {
                gte: new Date(startDate),
                lte: new Date(endDate),
            };
        }

        const budgets = await db.budget.findMany({
            where,
            orderBy: {
                startDate: "desc",
            },
        });

        return NextResponse.json(budgets);
    } catch (error) {
        console.error("[BUDGETS_GET]", error);
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
        const { id, category, amount, period, startDate, endDate } = body;

        const budget = await db.budget.update({
            where: {
                id,
                userId,
            },
            data: {
                category,
                amount,
                period,
                startDate,
                endDate,
            },
        });

        return NextResponse.json(budget);
    } catch (error) {
        console.error("[BUDGETS_PATCH]", error);
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
            return new NextResponse("Budget ID is required", { status: 400 });
        }

        await db.budget.delete({
            where: {
                id,
                userId,
            },
        });

        return new NextResponse(null, { status: 204 });
    } catch (error) {
        console.error("[BUDGETS_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
} 