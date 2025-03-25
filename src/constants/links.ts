import { ClockIcon, MessageSquare, BarChart2, FileTextIcon, UserPlusIcon, CreditCardIcon, SettingsIcon, LogOut, Headphones, ChartPieIcon, LucideIcon, MessagesSquareIcon, NewspaperIcon, MegaphoneIcon, LineChartIcon, MessageSquareTextIcon, UsersIcon, LayoutDashboard, Wallet, PiggyBank, LineChart, Settings, Receipt, Wallet2 } from 'lucide-react';

type Link = {
    href: string;
    label: string;
    icon: LucideIcon;
}

export const SIDEBAR_LINKS = [
    {
        label: "Overview",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        label: "Accounts",
        href: "/dashboard/accounts",
        icon: Wallet,
    },
    {
        label: "Transactions",
        href: "/dashboard/transactions",
        icon: Receipt,
    },
    {
        label: "Budgets",
        href: "/dashboard/budgets",
        icon: Wallet2,
    },
    {
        label: "Investments",
        href: "/dashboard/investments",
        icon: LineChart,
    },
    {
        label: "Savings",
        href: "/dashboard/savings",
        icon: PiggyBank,
    },
    {
        label: "Settings",
        href: "/dashboard/settings",
        icon: Settings,
    },
];

export const FOOTER_LINKS = [
    {
        title: "Banking",
        links: [
            { name: "Home", href: "/" },
            { name: "Features", href: "/" },
            { name: "Pricing", href: "/" },
            { name: "Contact", href: "/" },
            { name: "Mobile App", href: "/" },
        ],
    },
    {
        title: "Resources",
        links: [
            { name: "Financial Tips", href: "/blog" },
            { name: "Help Center", href: "/help-center" },
            { name: "Community", href: "/community" },
            { name: "Financial Guides", href: "/guides" },
        ],
    },
    {
        title: "Legal",
        links: [
            { name: "Privacy", href: "/privacy" },
            { name: "Terms", href: "/terms" },
            { name: "Security", href: "/security" },
        ],
    },
    {
        title: "Business",
        links: [
            { name: "Business Banking", href: "/business" },
            { name: "Merchant Services", href: "/merchant" },
            { name: "Corporate Solutions", href: "/corporate" },
            { name: "Partnership", href: "/partnership" },
            { name: "Careers", href: "/careers" },
        ],
    },
];
