export interface Investment {
    id: string;
    name: string;
    type: "stock" | "bond" | "mutual_fund" | "crypto";
    symbol: string;
    quantity: number;
    purchasePrice: number;
    currentPrice: number;
    performance: number;
    lastUpdated: string;
}

export const mockInvestments: Investment[] = [
    {
        id: "1",
        name: "Apple Inc.",
        type: "stock",
        symbol: "AAPL",
        quantity: 10,
        purchasePrice: 150.25,
        currentPrice: 175.50,
        performance: 16.80,
        lastUpdated: "2024-03-20T10:30:00Z"
    },
    {
        id: "2",
        name: "US Treasury Bond",
        type: "bond",
        symbol: "USTB",
        quantity: 5,
        purchasePrice: 1000,
        currentPrice: 1025,
        performance: 2.50,
        lastUpdated: "2024-03-20T10:30:00Z"
    },
    {
        id: "3",
        name: "Vanguard S&P 500 ETF",
        type: "mutual_fund",
        symbol: "VOO",
        quantity: 25,
        purchasePrice: 350.75,
        currentPrice: 385.25,
        performance: 9.85,
        lastUpdated: "2024-03-20T10:30:00Z"
    },
    {
        id: "4",
        name: "Bitcoin",
        type: "crypto",
        symbol: "BTC",
        quantity: 0.5,
        purchasePrice: 45000,
        currentPrice: 52000,
        performance: 15.56,
        lastUpdated: "2024-03-20T10:30:00Z"
    },
    {
        id: "5",
        name: "Microsoft Corporation",
        type: "stock",
        symbol: "MSFT",
        quantity: 15,
        purchasePrice: 280.50,
        currentPrice: 325.75,
        performance: 16.13,
        lastUpdated: "2024-03-20T10:30:00Z"
    },
    {
        id: "6",
        name: "Corporate Bond Fund",
        type: "bond",
        symbol: "CORP",
        quantity: 100,
        purchasePrice: 100,
        currentPrice: 98.50,
        performance: -1.50,
        lastUpdated: "2024-03-20T10:30:00Z"
    },
    {
        id: "7",
        name: "Ethereum",
        type: "crypto",
        symbol: "ETH",
        quantity: 2,
        purchasePrice: 2500,
        currentPrice: 3200,
        performance: 28.00,
        lastUpdated: "2024-03-20T10:30:00Z"
    },
    {
        id: "8",
        name: "Growth Stock Fund",
        type: "mutual_fund",
        symbol: "GROW",
        quantity: 50,
        purchasePrice: 25.75,
        currentPrice: 28.50,
        performance: 10.68,
        lastUpdated: "2024-03-20T10:30:00Z"
    }
]; 