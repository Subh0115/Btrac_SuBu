import { NextResponse } from 'next/server';

// Mock data - replace with your actual database
let connectedAccounts = [
    {
        id: "1",
        type: "bank",
        institution: "chase",
        name: "Chase Bank",
        accountNumber: "****1234",
        isPrimary: true,
        status: "active"
    },
    {
        id: "2",
        type: "credit",
        institution: "visa",
        name: "Visa",
        cardNumber: "****5678",
        isPrimary: false,
        status: "active"
    },
    {
        id: "3",
        type: "investment",
        institution: "fidelity",
        name: "Fidelity",
        accountNumber: "****9012",
        isPrimary: false,
        status: "active"
    },
    {
        id: "4",
        type: "crypto",
        institution: "coinbase",
        name: "Coinbase",
        walletAddress: "****3456",
        isPrimary: false,
        status: "active"
    }
];

export async function GET() {
    try {
        return NextResponse.json(connectedAccounts);
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to fetch connected accounts" },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();

        // Validate connection type
        const validTypes = ["bank", "credit", "investment", "crypto"];
        if (!validTypes.includes(data.type)) {
            return NextResponse.json(
                { message: "Invalid connection type" },
                { status: 400 }
            );
        }

        // Validate institution based on type
        const validInstitutions = {
            bank: ["chase", "bankofamerica", "wellsfargo"],
            credit: ["visa", "mastercard"],
            investment: ["fidelity", "vanguard", "schwab"],
            crypto: ["coinbase", "binance", "kraken"]
        };

        if (!validInstitutions[data.type].includes(data.institution)) {
            return NextResponse.json(
                { message: "Invalid institution for selected type" },
                { status: 400 }
            );
        }

        // Create new account connection
        const newAccount = {
            id: Date.now().toString(),
            type: data.type,
            institution: data.institution,
            name: data.name,
            accountNumber: "****" + Math.floor(Math.random() * 10000).toString().padStart(4, '0'),
            isPrimary: data.isPrimary || false,
            status: "active"
        };

        // If this is primary, update other accounts
        if (data.isPrimary) {
            connectedAccounts = connectedAccounts.map(account => ({
                ...account,
                isPrimary: account.id === newAccount.id
            }));
        }

        connectedAccounts.push(newAccount);
        return NextResponse.json(newAccount);
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to add connected account" },
            { status: 500 }
        );
    }
}

export async function PUT(request: Request) {
    try {
        const data = await request.json();

        // Validate account ID
        const accountIndex = connectedAccounts.findIndex(account => account.id === data.id);
        if (accountIndex === -1) {
            return NextResponse.json(
                { message: "Account not found" },
                { status: 404 }
            );
        }

        // Update account
        connectedAccounts[accountIndex] = {
            ...connectedAccounts[accountIndex],
            ...data
        };

        // If this is primary, update other accounts
        if (data.isPrimary) {
            connectedAccounts = connectedAccounts.map(account => ({
                ...account,
                isPrimary: account.id === data.id
            }));
        }

        return NextResponse.json(connectedAccounts[accountIndex]);
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to update connected account" },
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
                { message: "Account ID is required" },
                { status: 400 }
            );
        }

        // Find and remove account
        const accountIndex = connectedAccounts.findIndex(account => account.id === id);
        if (accountIndex === -1) {
            return NextResponse.json(
                { message: "Account not found" },
                { status: 404 }
            );
        }

        // If deleting primary account, make another account primary
        if (connectedAccounts[accountIndex].isPrimary && connectedAccounts.length > 1) {
            const nextAccount = connectedAccounts[accountIndex + 1] || connectedAccounts[0];
            nextAccount.isPrimary = true;
        }

        connectedAccounts.splice(accountIndex, 1);
        return NextResponse.json({ message: "Account removed successfully" });
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to remove connected account" },
            { status: 500 }
        );
    }
} 