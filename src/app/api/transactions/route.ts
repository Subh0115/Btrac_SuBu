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
        const { accountId, type, amount, category, description, date } = body;

        // Create transaction
        const transaction = await db.transaction.create({
            data: {
                userId,
                accountId,
                type,
                amount,
                category,
                description,
                date,
            },
        });

        // Update account balance
        const account = await db.account.findUnique({
            where: { id: accountId },
        });

        if (!account) {
            return new NextResponse("Account not found", { status: 404 });
        }

        const newBalance = type === "income" 
            ? account.balance + amount 
            : account.balance - amount;

        await db.account.update({
            where: { id: accountId },
            data: { balance: newBalance },
        });

        return NextResponse.json(transaction);
    } catch (error) {
        console.error("[TRANSACTIONS_POST]", error);
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
        const accountId = searchParams.get("accountId");
        const type = searchParams.get("type");
        const category = searchParams.get("category");
        const startDate = searchParams.get("startDate");
        const endDate = searchParams.get("endDate");

        const where: any = { userId };

        if (accountId) where.accountId = accountId;
        if (type) where.type = type;
        if (category) where.category = category;
        if (startDate && endDate) {
            where.date = {
                gte: new Date(startDate),
                lte: new Date(endDate),
            };
        }

        const transactions = await db.transaction.findMany({
            where,
            include: {
                account: true,
            },
            orderBy: {
                date: "desc",
            },
        });

        return NextResponse.json(transactions);
    } catch (error) {
        console.error("[TRANSACTIONS_GET]", error);
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
        const { id, accountId, type, amount, category, description, date } = body;

        const transaction = await db.transaction.findUnique({
            where: { id, userId },
            include: { account: true },
        });

        if (!transaction) {
            return new NextResponse("Transaction not found", { status: 404 });
        }

        // Revert old transaction's effect on balance
        const oldAmount = transaction.amount;
        const oldType = transaction.type;
        const oldBalance = transaction.account.balance;
        const revertedBalance = oldType === "income"
            ? oldBalance - oldAmount
            : oldBalance + oldAmount;

        // Apply new transaction's effect on balance
        const newBalance = type === "income"
            ? revertedBalance + amount
            : revertedBalance - amount;

        // Update transaction and account
        const [updatedTransaction] = await Promise.all([
            db.transaction.update({
                where: { id },
                data: {
                    type,
                    amount,
                    category,
                    description,
                    date,
                },
            }),
            db.account.update({
                where: { id: accountId },
                data: { balance: newBalance },
            }),
        ]);

        return NextResponse.json(updatedTransaction);
    } catch (error) {
        console.error("[TRANSACTIONS_PATCH]", error);
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
            return new NextResponse("Transaction ID is required", { status: 400 });
        }

        const transaction = await db.transaction.findUnique({
            where: { id, userId },
            include: { account: true },
        });

        if (!transaction) {
            return new NextResponse("Transaction not found", { status: 404 });
        }

        // Revert transaction's effect on balance
        const amount = transaction.amount;
        const type = transaction.type;
        const accountId = transaction.accountId;
        const currentBalance = transaction.account.balance;
        const newBalance = type === "income"
            ? currentBalance - amount
            : currentBalance + amount;

        // Delete transaction and update account balance
        await Promise.all([
            db.transaction.delete({
                where: { id },
            }),
            db.account.update({
                where: { id: accountId },
                data: { balance: newBalance },
            }),
        ]);

        return new NextResponse(null, { status: 204 });
    } catch (error) {
        console.error("[TRANSACTIONS_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
} 