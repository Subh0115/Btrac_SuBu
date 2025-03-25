type PLAN = {
    id: string;
    title: string;
    desc: string;
    monthlyPrice: number;
    yearlyPrice: number;
    badge?: string;
    buttonText: string;
    features: string[];
    link: string;
};

export const PLANS: PLAN[] = [
    {
        id: "free",
        title: "Basic",
        desc: "Get started with essential banking features and basic financial tools",
        monthlyPrice: 0,
        yearlyPrice: 0,
        buttonText: "Open Account",
        features: [
            "Basic account management",
            "Mobile banking access",
            "Bill payments",
            "Basic transaction history",
            "Email support",
            "Standard security features"
        ],
        link: "https://stripe.com/free-plan-link"
    },
    {
        id: "pro",
        title: "Premium",
        desc: "Unlock advanced banking features and smart financial management tools",
        monthlyPrice: 10,
        yearlyPrice: 120,
        badge: "Most Popular",
        buttonText: "Upgrade to Premium",
        features: [
            "Advanced account management",
            "Priority customer support",
            "Unlimited transactions",
            "Smart budgeting tools",
            "Investment portfolio tracking",
            "Enhanced security features",
            "Family account management",
            "Premium rewards program"
        ],
        link: "https://stripe.com/pro-plan-link"
    },
    {
        id: "enterprise",
        title: "Business",
        desc: "Comprehensive banking solutions for businesses and organizations",
        monthlyPrice: 15,
        yearlyPrice: 180,
        badge: "Contact Sales",
        buttonText: "Upgrade to Business",
        features: [
            "Unlimited business accounts",
            "Dedicated relationship manager",
            "Advanced business analytics",
            "Custom reporting tools",
            "Enterprise-grade security",
            "Multi-user access",
            "Priority transaction processing",
            "Business rewards program"
        ],
        link: "https://stripe.com/enterprise-plan-link"
    }
];
