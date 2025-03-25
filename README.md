# 🔗 BtrackiFiS - Smart Personal Finance Management Platform

<img src="/public/images/dashboard.png" alt="BtrackiFiS Dashboard" style="border-radius: 12px;" width="1280">

## 🎯 About
BtrackiFiS is your all-in-one personal finance management solution, designed to empower individuals to take control of their financial journey. Our platform combines intuitive design with powerful features to help you:

- 📊 Track and manage your budgets effectively
- 💰 Monitor your investments in real-time
- 💳 Keep tabs on your expenses
- 🎯 Set and achieve savings goals
- 📈 Get valuable financial insights
- 🔒 Securely manage your banking information
- 🤖 Receive AI-powered financial recommendations

Whether you're saving for a dream home, planning for retirement, or just wanting to get better at managing your money, BtrackiFiS provides the tools and insights you need to make informed financial decisions.

## 🌟 Introduction
BtrackiFiS is a comprehensive personal finance management platform designed to help you take control of your financial future. Built with Next.js, Tailwind CSS, Shadcn UI, Prisma, MongoDB, Clerk, React Hook Form, and TypeScript, BtrackiFiS provides powerful analytics and user-friendly features to enhance your financial management experience.

## 🚀 Features

- Smart budget tracking and management
- Investment portfolio monitoring
- Expense tracking and categorization
- Savings goals and progress tracking
- Financial insights and analytics
- Secure banking integration
- Custom report generation
- AI-powered financial recommendations

## 💻 Tech Stack

* Next.js 14 (App Router)
* Tailwind CSS
* Shadcn UI
* Prisma
* MongoDB
* Clerk Authentication
* Recharts
* Framer Motion
* TypeScript

## 🛠️ Installation
To run BtrackiFiS locally, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/Subh0115/Btrac_SuBu.git
    cd Btrac_SuBu
    ```
2. Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```
3. Set up environment variables:
    - Copy the `.env.example` file to `.env`
    - Update the environment variables with your credentials:
    ```env
    # app
    NEXT_PUBLIC_APP_NAME=BtrackiFiS
    NEXT_PUBLIC_APP_DOMAIN=your-domain.com

    # database
    DATABASE_URL=your-mongodb-url

    # auth (from Clerk Dashboard)
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-publishable-key
    CLERK_SECRET_KEY=your-secret-key
    NEXT_PUBLIC_CLERK_SIGN_IN_URL="/signin"
    NEXT_PUBLIC_CLERK_SIGN_UP_URL="/signup"
    NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_URL="/"
    NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_URL="/"
    ```

4. Initialize and generate Prisma client:
    ```bash
    npx prisma generate
    npx prisma db push
    ```

5. Run the development server:
    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📜 License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 💬 Contact
If you have any questions or feedback, feel free to reach out:
- GitHub Issues: [Create an issue](https://github.com/Subh0115/Btrac_SuBu/issues)
- Website: [btracsubu.vercel.app](https://btracsubu.vercel.app)

---

Built with ❤️ by [Subhadeep Banerjee](https://btracsubu.vercel.app)
