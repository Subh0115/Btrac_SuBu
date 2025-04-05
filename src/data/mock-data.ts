import { CreditCard, Wallet, PiggyBank, Building2, Landmark } from "lucide-react";

export const mockAccounts = [
    {
        id: "1",
        name: "Main Account",
        type: "checking",
        icon: Wallet,
        balance: 5000,
        accountNumber: "****1234",
        bank: "Chase Bank",
        color: "#3B82F6"
    },
    {
        id: "2",
        name: "Savings Account",
        type: "savings",
        icon: PiggyBank,
        balance: 10000,
        accountNumber: "****5678",
        bank: "Chase Bank",
        color: "#10B981"
    },
    {
        id: "3",
        name: "Credit Card",
        type: "credit",
        icon: CreditCard,
        balance: -2000,
        accountNumber: "****9012",
        bank: "Chase Bank",
        color: "#F59E0B"
    },
    {
        id: "4",
        name: "Investment Account",
        type: "investment",
        icon: Building2,
        balance: 25000,
        accountNumber: "****3456",
        bank: "Fidelity",
        color: "#8B5CF6"
    },
    {
        id: "5",
        name: "Business Account",
        type: "business",
        icon: Landmark,
        balance: 15000,
        accountNumber: "****7890",
        bank: "Bank of America",
        color: "#EC4899"
    }
];

export const mockTransactions = [
    {
        id: "1",
        date: "2024-03-15",
        description: "Grocery Shopping",
        amount: -150.50,
        category: "food",
        accountId: "1",
        accountName: "Main Account",
        status: "completed" as const,
        tags: ["groceries", "food"],
        receipt: "receipt_1.pdf"
    },
    {
        id: "2",
        date: "2024-03-14",
        description: "Salary Deposit",
        amount: 5000,
        category: "income",
        accountId: "1",
        accountName: "Main Account",
        status: "completed" as const,
        tags: ["salary", "income"]
    },
    {
        id: "3",
        date: "2024-03-13",
        description: "Netflix Subscription",
        amount: -15.99,
        category: "entertainment",
        accountId: "3",
        accountName: "Credit Card",
        status: "completed" as const,
        tags: ["subscription", "entertainment"]
    },
    {
        id: "4",
        date: "2024-03-12",
        description: "Gas Station",
        amount: -45.00,
        category: "transport",
        accountId: "1",
        accountName: "Main Account",
        status: "completed" as const,
        tags: ["gas", "transport"]
    },
    {
        id: "5",
        date: "2024-03-11",
        description: "Investment Dividend",
        amount: 250.00,
        category: "income",
        accountId: "4",
        accountName: "Investment Account",
        status: "completed" as const,
        tags: ["dividend", "investment"]
    },
    {
        id: "6",
        date: "2024-03-10",
        description: "Restaurant Dinner",
        amount: -85.50,
        category: "food",
        accountId: "3",
        accountName: "Credit Card",
        status: "completed" as const,
        tags: ["dining", "food"]
    },
    {
        id: "7",
        date: "2024-03-09",
        description: "Utility Bill",
        amount: -120.00,
        category: "bills",
        accountId: "1",
        accountName: "Main Account",
        status: "pending" as const,
        tags: ["utilities", "bills"]
    },
    {
        id: "8",
        date: "2024-03-08",
        description: "Gym Membership",
        amount: -29.99,
        category: "health",
        accountId: "3",
        accountName: "Credit Card",
        status: "completed" as const,
        tags: ["health", "subscription"]
    },
    {
        id: "9",
        date: "2024-03-07",
        description: "Online Shopping",
        amount: -75.25,
        category: "shopping",
        accountId: "3",
        accountName: "Credit Card",
        status: "completed" as const,
        tags: ["shopping", "clothes"]
    },
    {
        id: "10",
        date: "2024-03-06",
        description: "Transfer to Savings",
        amount: -500,
        category: "transfer",
        accountId: "1",
        accountName: "Main Account",
        status: "completed" as const,
        tags: ["transfer", "savings"]
    }
];

export const mockBudgets = [
    {
        id: "1",
        name: "Monthly Groceries",
        category: "food",
        amount: 500,
        spent: 350,
        startDate: "2024-03-01",
        endDate: "2024-03-31",
        status: "active" as const,
        transactions: ["1", "2", "3"],
    },
    {
        id: "2",
        name: "Entertainment",
        category: "entertainment",
        amount: 200,
        spent: 180,
        startDate: "2024-03-01",
        endDate: "2024-03-31",
        status: "active" as const,
        transactions: ["4", "5"],
    },
    {
        id: "3",
        name: "Transportation",
        category: "transportation",
        amount: 300,
        spent: 320,
        startDate: "2024-03-01",
        endDate: "2024-03-31",
        status: "overdue" as const,
        transactions: ["6", "7"],
    },
    {
        id: "4",
        name: "Utilities",
        category: "utilities",
        amount: 250,
        spent: 250,
        startDate: "2024-03-01",
        endDate: "2024-03-31",
        status: "completed" as const,
        transactions: ["8"],
    },
    {
        id: "5",
        name: "Shopping",
        category: "shopping",
        amount: 400,
        spent: 150,
        startDate: "2024-03-01",
        endDate: "2024-03-31",
        status: "active" as const,
        transactions: ["9", "10"],
    },
]; 