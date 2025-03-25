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
        const { name, type, balance, currency, isDefault } = body;

        const account = await db.account.create({
            data: {
                userId,
                name,
                type,
                balance,
                currency,
                isDefault,
            },
        });

        return NextResponse.json(account);
    } catch (error) {
        console.error("[ACCOUNTS_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const accounts = await db.account.findMany({
            where: {
                userId,
            },
            include: {
                transactions: {
                    orderBy: {
                        date: "desc",
                    },
                },
            },
        });

        return NextResponse.json(accounts);
    } catch (error) {
        console.error("[ACCOUNTS_GET]", error);
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
        const { id, name, type, balance, currency, isDefault } = body;

        const account = await db.account.update({
            where: {
                id,
                userId,
            },
            data: {
                name,
                type,
                balance,
                currency,
                isDefault,
            },
        });

        return NextResponse.json(account);
    } catch (error) {
        console.error("[ACCOUNTS_PATCH]", error);
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
            return new NextResponse("Account ID is required", { status: 400 });
        }

        await db.account.delete({
            where: {
                id,
                userId,
            },
        });

        return new NextResponse(null, { status: 204 });
    } catch (error) {
        console.error("[ACCOUNTS_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
} 