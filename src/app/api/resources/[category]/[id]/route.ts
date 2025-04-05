import { NextResponse } from 'next/server';

// Mock data - replace with your actual database
const resources = {
    documentation: {
        "1": {
            id: "1",
            title: "Getting Started Guide",
            description: "Learn the basics of using our platform",
            content: `
                <h2>Welcome to Our Platform</h2>
                <p>This guide will help you get started with our platform. Let's go through the essential features and how to use them.</p>
                
                <h3>1. Dashboard Overview</h3>
                <p>Your dashboard is the central hub for all your financial activities. Here you can:</p>
                <ul>
                    <li>View your account balances</li>
                    <li>Track your spending</li>
                    <li>Monitor your investments</li>
                    <li>Set and track financial goals</li>
                </ul>

                <h3>2. Account Management</h3>
                <p>Managing your accounts is simple:</p>
                <ul>
                    <li>Add new accounts</li>
                    <li>Link external accounts</li>
                    <li>Set up automatic categorization</li>
                    <li>Configure account alerts</li>
                </ul>

                <h3>3. Transaction Management</h3>
                <p>Keep track of your transactions with our powerful tools:</p>
                <ul>
                    <li>View transaction history</li>
                    <li>Set up recurring transactions</li>
                    <li>Create custom categories</li>
                    <li>Export transaction data</li>
                </ul>
            `,
            type: "document"
        },
        "2": {
            id: "2",
            title: "API Reference",
            description: "Complete API documentation and examples",
            content: `
                <h2>API Documentation</h2>
                <p>Our API allows you to integrate our platform's features into your applications.</p>
                
                <h3>Authentication</h3>
                <pre><code>POST /api/auth/token
{
    "client_id": "your_client_id",
    "client_secret": "your_client_secret"
}</code></pre>

                <h3>Endpoints</h3>
                <h4>Accounts</h4>
                <pre><code>GET /api/v1/accounts
GET /api/v1/accounts/{id}
POST /api/v1/accounts
PUT /api/v1/accounts/{id}
DELETE /api/v1/accounts/{id}</code></pre>

                <h4>Transactions</h4>
                <pre><code>GET /api/v1/transactions
GET /api/v1/transactions/{id}
POST /api/v1/transactions
PUT /api/v1/transactions/{id}
DELETE /api/v1/transactions/{id}</code></pre>
            `,
            type: "document"
        }
    },
    account: {
        "5": {
            id: "5",
            title: "Download Account Data",
            description: "Export your account information",
            content: `
                <h2>Exporting Your Account Data</h2>
                <p>Learn how to export your account data for backup or analysis purposes.</p>
                
                <h3>Available Export Formats</h3>
                <ul>
                    <li>CSV (Comma Separated Values)</li>
                    <li>JSON (JavaScript Object Notation)</li>
                    <li>PDF (Portable Document Format)</li>
                    <li>Excel (XLSX)</li>
                </ul>

                <h3>How to Export</h3>
                <ol>
                    <li>Go to Account Settings</li>
                    <li>Click on "Export Data"</li>
                    <li>Select your preferred format</li>
                    <li>Choose the date range</li>
                    <li>Click "Export"</li>
                </ol>

                <h3>Data Included in Export</h3>
                <ul>
                    <li>Account information</li>
                    <li>Transaction history</li>
                    <li>Investment portfolio</li>
                    <li>Budget data</li>
                    <li>Financial goals</li>
                </ul>
            `,
            type: "document"
        },
        "6": {
            id: "6",
            title: "Privacy Settings",
            description: "Manage your privacy preferences",
            content: `
                <h2>Privacy Settings Guide</h2>
                <p>Take control of your data privacy with our comprehensive privacy settings.</p>
                
                <h3>Data Sharing Preferences</h3>
                <ul>
                    <li>Third-party integrations</li>
                    <li>Analytics data</                    <li>Marketing communications</li>
                    <li>Research participation</li>
                </ul>

                <h3>Security Features</h3>
                <ul>
                    <li>Two-factor authentication</li>
                    <li>Login notifications</li>
                    <li>Device management</li>
                    <li>Session control</li>
                </ul>

                <h3>Data Retention</h3>
                <p>Learn about our data retention policies and how to manage your data:</p>
                <ul>
                    <li>Account deletion</li>
                    <li>Data archiving</li>
                    <li>Backup options</li>
                    <li>Data recovery</li>
                </ul>
            `,
            type: "document"
        }
    },
    training: {
        "9": {
            id: "9",
            title: "Video Tutorials",
            description: "Watch step-by-step video guides",
            content: `
                <h2>Video Tutorial Library</h2>
                <p>Access our comprehensive collection of video tutorials to learn how to use our platform effectively.</p>
                
                <h3>Getting Started Series</h3>
                <div class="video-container">
                    <iframe 
                        width="100%" 
                        height="400" 
                        src="https://www.youtube.com/embed/example1" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen
                    ></iframe>
                </div>

                <h3>Advanced Features</h3>
                <div class="video-container">
                    <iframe 
                        width="100%" 
                        height="400" 
                        src="https://www.youtube.com/embed/example2" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen
                    ></iframe>
                </div>
            `,
            type: "video",
            duration: "45 minutes"
        },
        "10": {
            id: "10",
            title: "Best Practices",
            description: "Learn recommended usage patterns",
            content: `
                <h2>Platform Best Practices</h2>
                <p>Follow these best practices to make the most of our platform.</p>
                
                <h3>Account Security</h3>
                <ul>
                    <li>Use strong passwords</li>
                    <li>Enable two-factor authentication</li>
                    <li>Regular security audits</li>
                    <li>Monitor account activity</li>
                </ul>

                <h3>Financial Management</h3>
                <ul>
                    <li>Regular account reconciliation</li>
                    <li>Budget planning</li>
                    <li>Investment diversification</li>
                    <li>Emergency fund management</li>
                </ul>

                <h3>Platform Features</h3>
                <ul>
                    <li>Automate recurring transactions</li>
                    <li>Use categories effectively</li>
                    <li>Set up alerts and notifications</li>
                    <li>Regular data backups</li>
                </ul>
            `,
            type: "document"
        },
        "11": {
            id: "11",
            title: "Tips & Tricks",
            description: "Discover useful tips and shortcuts",
            type: "tutorial",
            steps: [
                "Use keyboard shortcuts for faster navigation",
                "Set up custom categories for better organization",
                "Create saved searches for frequently accessed data",
                "Use the mobile app for quick access on the go",
                "Enable notifications for important updates",
                "Use the export feature for regular backups",
                "Customize your dashboard layout",
                "Set up recurring transactions for automation"
            ]
        }
    }
};

export async function GET(
    request: Request,
    { params }: { params: { category: string; id: string } }
) {
    try {
        const resource = resources[params.category]?.[params.id];
        
        if (!resource) {
            return NextResponse.json(
                { message: "Resource not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(resource);
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to fetch resource" },
            { status: 500 }
        );
    }
} 