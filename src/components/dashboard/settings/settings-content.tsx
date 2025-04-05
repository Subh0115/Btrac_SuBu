<<<<<<< HEAD
<p>Don&apos;t miss important updates about your budgets</p>
<p>We&apos;ll send you notifications about important budget updates</p>
<p>We&apos;ll help you get back on track</p>
<Image src="/path/to/image" alt="Description" width={500} height={300} />
<p>We&apos;ll help you get back on track</p>
<p>We&apos;ll help you get back on track</p> 
=======
"use client";

import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Bell, Lock, Palette, Globe, CreditCard, HelpCircle, Trash2, Plus, X, AlertCircle, CheckCircle2, Info } from "lucide-react";
import { toast } from "sonner";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";

export function SettingsContent() {
    const [activeTab, setActiveTab] = useState("profile");
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [showPasswordDialog, setShowPasswordDialog] = useState(false);
    const [showAddConnectionDialog, setShowAddConnectionDialog] = useState(false);
    const [showSupportTicketDialog, setShowSupportTicketDialog] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "Rahul",
        lastName: "Sharma",
        email: "rahul.sharma@example.com",
        phone: "+91 98765 43210",
        address: "123, Main Street, Mumbai, Maharashtra 400001",
        bio: "Financial advisor and tech enthusiast",
        timezone: "UTC+5:30",
        dateOfBirth: "1990-01-01",
        occupation: "Software Engineer",
        company: "Tech Solutions India",
        website: "https://rahulsharma.com",
        socialLinks: {
            twitter: "@rahulsharma",
            linkedin: "linkedin.com/in/rahulsharma",
            github: "github.com/rahulsharma"
        }
    });
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [theme, setTheme] = useState("system");
    const [accentColor, setAccentColor] = useState("blue");
    const [currency, setCurrency] = useState("usd");
    const [dateFormat, setDateFormat] = useState("mm/dd/yyyy");
    const [language, setLanguage] = useState("en");
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
    const [loginNotifications, setLoginNotifications] = useState(false);
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [pushNotifications, setPushNotifications] = useState(true);
    const [smsNotifications, setSmsNotifications] = useState(false);
    const [securityQuestions, setSecurityQuestions] = useState([
        { question: "What was your first pet's name?", answer: "" },
        { question: "What city were you born in?", answer: "" },
        { question: "What is your mother's maiden name?", answer: "" }
    ]);
    const [activeSessions, setActiveSessions] = useState([
        { device: "Chrome on Windows", location: "New York, USA", lastActive: "2 minutes ago" },
        { device: "Safari on iPhone", location: "San Francisco, USA", lastActive: "1 hour ago" }
    ]);
    const [showImagePreview, setShowImagePreview] = useState(false);
    const [isSecurityLoading, setIsSecurityLoading] = useState(false);
    const [isSecuritySaving, setIsSecuritySaving] = useState(false);
    const [notificationCategories, setNotificationCategories] = useState({
        transactionAlerts: true,
        securityAlerts: true,
        savingsGoals: true,
        investmentUpdates: true,
        budgetAlerts: true,
        billReminders: true,
        marketUpdates: true,
        accountActivity: true
    });
    const [notificationSchedule, setNotificationSchedule] = useState({
        dailySummary: "9:00 AM",
        weeklyReport: "Monday"
    });
    const [isNotificationsLoading, setIsNotificationsLoading] = useState(false);
    const [isNotificationsSaving, setIsNotificationsSaving] = useState(false);
    const [fontSize, setFontSize] = useState("medium");
    const [fontFamily, setFontFamily] = useState("system");
    const [layoutDensity, setLayoutDensity] = useState("comfortable");
    const [animationSpeed, setAnimationSpeed] = useState("normal");
    const [isAppearanceLoading, setIsAppearanceLoading] = useState(false);
    const [isAppearanceSaving, setIsAppearanceSaving] = useState(false);
    const [timeFormat, setTimeFormat] = useState("12h");
    const [numberFormat, setNumberFormat] = useState("standard");
    const [defaultView, setDefaultView] = useState("dashboard");
    const [isPreferencesLoading, setIsPreferencesLoading] = useState(false);
    const [isPreferencesSaving, setIsPreferencesSaving] = useState(false);
    const [connectedAccounts, setConnectedAccounts] = useState([]);
    const [isConnectedAccountsLoading, setIsConnectedAccountsLoading] = useState(false);
    const [isConnectedAccountsSaving, setIsConnectedAccountsSaving] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [newConnectionData, setNewConnectionData] = useState({
        type: "",
        institution: "",
        name: "",
        isPrimary: false
    });
    const [supportTickets, setSupportTickets] = useState([]);
    const [faqs, setFaqs] = useState([]);
    const [isHelpLoading, setIsHelpLoading] = useState(false);
    const [isHelpSaving, setIsHelpSaving] = useState(false);
    const [selectedFaq, setSelectedFaq] = useState(null);
    const [showFaqDialog, setShowFaqDialog] = useState(false);
    const [isFaqLoading, setIsFaqLoading] = useState(false);
    const [supportResources, setSupportResources] = useState({
        documentation: [],
        community: [],
        account: [],
        training: []
    });
    const [isResourcesLoading, setIsResourcesLoading] = useState(false);
    const [showResourceDialog, setShowResourceDialog] = useState(false);
    const [selectedResource, setSelectedResource] = useState(null);
    const [showEmailSupportDialog, setShowEmailSupportDialog] = useState(false);
    const [emailSupportData, setEmailSupportData] = useState({
        subject: "",
        message: "",
        priority: "medium"
    });
    const router = useRouter();

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                setIsLoading(true);
                const response = await fetch('/api/profile');
                const data = await response.json();
                
                if (data.profileImage) {
                    setProfileImage(data.profileImage);
                }
                
                setFormData({
                    firstName: data.firstName || "",
                    lastName: data.lastName || "",
                    email: data.email || "",
                    phone: data.phone || "",
                    address: data.address || "",
                    bio: data.bio || "",
                    timezone: data.timezone || "UTC-5",
                    dateOfBirth: data.dateOfBirth || "",
                    occupation: data.occupation || "",
                    company: data.company || "",
                    website: data.website || "",
                    socialLinks: data.socialLinks || {
                        twitter: "",
                        linkedin: "",
                        github: ""
                    }
                });
            } catch (error) {
                toast.error("Failed to load profile data");
                console.error("Error fetching profile:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfileData();
    }, []);

    useEffect(() => {
        const fetchSecuritySettings = async () => {
            try {
                setIsSecurityLoading(true);
                const response = await fetch('/api/security');
                const data = await response.json();
                
                setTwoFactorEnabled(data.twoFactorEnabled);
                setLoginNotifications(data.loginNotifications);
                setSecurityQuestions(data.securityQuestions);
                setActiveSessions(data.activeSessions);
            } catch (error) {
                toast.error("Failed to load security settings");
                console.error("Error fetching security settings:", error);
            } finally {
                setIsSecurityLoading(false);
            }
        };

        fetchSecuritySettings();
    }, []);

    useEffect(() => {
        const fetchNotificationSettings = async () => {
            try {
                setIsNotificationsLoading(true);
                const response = await fetch('/api/notifications');
                const data = await response.json();
                
                setEmailNotifications(data.emailNotifications);
                setPushNotifications(data.pushNotifications);
                setSmsNotifications(data.smsNotifications);
                setNotificationCategories(data.notificationCategories);
                setNotificationSchedule(data.notificationSchedule);
            } catch (error) {
                toast.error("Failed to load notification settings");
                console.error("Error fetching notification settings:", error);
            } finally {
                setIsNotificationsLoading(false);
            }
        };

        fetchNotificationSettings();
    }, []);

    useEffect(() => {
        const fetchAppearanceSettings = async () => {
            try {
                setIsAppearanceLoading(true);
                const response = await fetch('/api/appearance');
                const data = await response.json();
                
                setTheme(data.theme);
                setAccentColor(data.accentColor);
                setFontSize(data.fontSize);
                setFontFamily(data.fontFamily);
                setLayoutDensity(data.layoutDensity);
                setAnimationSpeed(data.animationSpeed);
            } catch (error) {
                toast.error("Failed to load appearance settings");
                console.error("Error fetching appearance settings:", error);
            } finally {
                setIsAppearanceLoading(false);
            }
        };

        fetchAppearanceSettings();
    }, []);

    useEffect(() => {
        // Apply initial appearance settings
        document.documentElement.setAttribute('data-theme', theme);
        document.documentElement.setAttribute('data-accent-color', accentColor);
        document.documentElement.setAttribute('data-font-size', fontSize);
        document.documentElement.setAttribute('data-font-family', fontFamily);
        document.documentElement.setAttribute('data-layout-density', layoutDensity);
        document.documentElement.setAttribute('data-animation-speed', animationSpeed);

        // Apply font family
        const fontFamilyMap: { [key: string]: string } = {
            'system': 'font-sans',
            'inter': 'font-inter',
            'roboto': 'font-roboto',
            'open-sans': 'font-open-sans',
            'lato': 'font-lato',
            'montserrat': 'font-montserrat'
        };

        // Remove all font classes
        Object.values(fontFamilyMap).forEach(fontClass => {
            document.documentElement.classList.remove(fontClass);
        });

        // Add selected font class
        document.documentElement.classList.add(fontFamilyMap[fontFamily]);

        // Apply font size
        const fontSizeMap: { [key: string]: string } = {
            'small': 'text-sm',
            'medium': 'text-base',
            'large': 'text-lg',
            'xlarge': 'text-xl'
        };

        // Remove all font size classes
        Object.values(fontSizeMap).forEach(sizeClass => {
            document.documentElement.classList.remove(sizeClass);
        });

        // Add selected font size class
        document.documentElement.classList.add(fontSizeMap[fontSize]);

        // Apply layout density
        const densityMap: { [key: string]: string } = {
            'compact': 'space-y-2',
            'comfortable': 'space-y-4',
            'spacious': 'space-y-6'
        };

        // Remove all density classes
        Object.values(densityMap).forEach(densityClass => {
            document.documentElement.classList.remove(densityClass);
        });

        // Add selected density class
        document.documentElement.classList.add(densityMap[layoutDensity]);

        // Apply animation speed
        const animationMap: { [key: string]: string } = {
            'fast': 'duration-150',
            'normal': 'duration-300',
            'slow': 'duration-500',
            'none': 'duration-0'
        };

        // Remove all animation classes
        Object.values(animationMap).forEach(animationClass => {
            document.documentElement.classList.remove(animationClass);
        });

        // Add selected animation class
        document.documentElement.classList.add(animationMap[animationSpeed]);

        // Apply accent color
        const accentColorMap: { [key: string]: string } = {
            'blue': 'accent-blue',
            'green': 'accent-green',
            'purple': 'accent-purple',
            'red': 'accent-red',
            'orange': 'accent-orange',
            'pink': 'accent-pink',
            'yellow': 'accent-yellow',
            'teal': 'accent-teal',
            'indigo': 'accent-indigo',
            'violet': 'accent-violet',
            'cyan': 'accent-cyan',
            'emerald': 'accent-emerald'
        };

        // Remove all accent color classes
        Object.values(accentColorMap).forEach(colorClass => {
            document.documentElement.classList.remove(colorClass);
        });

        // Add selected accent color class
        document.documentElement.classList.add(accentColorMap[accentColor]);

    }, [theme, accentColor, fontSize, fontFamily, layoutDensity, animationSpeed]);

    useEffect(() => {
        const fetchPreferences = async () => {
            try {
                setIsPreferencesLoading(true);
                const response = await fetch('/api/preferences');
                const data = await response.json();
                
                setCurrency(data.currency);
                setDateFormat(data.dateFormat);
                setLanguage(data.language);
                setTimeFormat(data.timeFormat);
                setNumberFormat(data.numberFormat);
                setDefaultView(data.defaultView);
            } catch (error) {
                toast.error("Failed to load preferences");
                console.error("Error fetching preferences:", error);
            } finally {
                setIsPreferencesLoading(false);
            }
        };

        fetchPreferences();
    }, []);

    useEffect(() => {
        const fetchConnectedAccounts = async () => {
            try {
                setIsConnectedAccountsLoading(true);
                const response = await fetch('/api/connected-accounts');
                const data = await response.json();
                setConnectedAccounts(data);
            } catch (error) {
                toast.error("Failed to load connected accounts");
                console.error("Error fetching connected accounts:", error);
            } finally {
                setIsConnectedAccountsLoading(false);
            }
        };

        fetchConnectedAccounts();
    }, []);

    useEffect(() => {
        const fetchHelpData = async () => {
            try {
                setIsHelpLoading(true);
                const [ticketsResponse, faqsResponse] = await Promise.all([
                    fetch('/api/help?type=tickets'),
                    fetch('/api/help?type=faqs')
                ]);
                
                const ticketsData = await ticketsResponse.json();
                const faqsData = await faqsResponse.json();
                
                setSupportTickets(ticketsData);
                setFaqs(faqsData);
            } catch (error) {
                toast.error("Failed to load help data");
                console.error("Error fetching help data:", error);
            } finally {
                setIsHelpLoading(false);
            }
        };

        fetchHelpData();
    }, []);

    useEffect(() => {
        const fetchFaqs = async () => {
            try {
                setIsFaqLoading(true);
                const response = await fetch('/api/faqs');
                const data = await response.json();
                setFaqs(data);
            } catch (error) {
                toast.error("Failed to load FAQs");
                console.error("Error fetching FAQs:", error);
            } finally {
                setIsFaqLoading(false);
            }
        };

        fetchFaqs();
    }, []);

    useEffect(() => {
        const fetchSupportResources = async () => {
            try {
                setIsResourcesLoading(true);
                const response = await fetch('/api/support-resources');
                const data = await response.json();
                setSupportResources(data);
            } catch (error) {
                toast.error("Failed to load support resources");
                console.error("Error fetching support resources:", error);
            } finally {
                setIsResourcesLoading(false);
            }
        };

        fetchSupportResources();
    }, []);

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            try {
                const formData = new FormData();
                formData.append('image', file);

                const response = await fetch('/api/upload-profile-image', {
                    method: 'POST',
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error('Failed to upload image');
                }

                const data = await response.json();
                
                // Update the profile image in the form data
                setFormData(prev => ({
                    ...prev,
                    profileImage: data.imageUrl
                }));
                
                // Update the profile image state
                setProfileImage(data.imageUrl);
                
                toast.success("Profile picture updated successfully");
            } catch (error) {
                toast.error("Failed to upload profile picture");
                console.error("Error uploading image:", error);
            }
        }
    };

    const handleSaveChanges = async () => {
        try {
            setIsSaving(true);
            
            // Validate required fields
            if (!formData.firstName || !formData.lastName || !formData.email) {
                toast.error("Please fill in all required fields");
                return;
            }

            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                toast.error("Please enter a valid email address");
                return;
            }

            // Validate phone number format (Indian format)
            const phoneRegex = /^\+91\s\d{5}\s\d{5}$/;
            if (formData.phone && !phoneRegex.test(formData.phone)) {
                toast.error("Please enter a valid Indian phone number (+91 XXXXX XXXXX)");
                return;
            }

            // Prepare the data to be sent
            const updateData = {
                firstName: formData.firstName.trim(),
                lastName: formData.lastName.trim(),
                email: formData.email.trim(),
                phone: formData.phone.trim(),
                address: formData.address.trim(),
                bio: formData.bio.trim(),
                timezone: formData.timezone,
                dateOfBirth: formData.dateOfBirth,
                occupation: formData.occupation.trim(),
                company: formData.company.trim(),
                website: formData.website.trim(),
                socialLinks: {
                    twitter: formData.socialLinks.twitter.trim(),
                    linkedin: formData.socialLinks.linkedin.trim(),
                    github: formData.socialLinks.github.trim()
                }
            };

            // Make the API call
            const response = await fetch('/api/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update profile');
            }

            const data = await response.json();
            
            // Update local state with the response data
            setFormData({
                ...formData,
                ...data
            });

            toast.success("Profile updated successfully");
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error(error instanceof Error ? error.message : "Failed to update profile. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleCancel = () => {
        fetchProfileData();
        toast.info("Changes discarded");
    };

    const handlePasswordChange = async () => {
        try {
            if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
                toast.error("Please fill in all password fields");
                return;
            }

            if (formData.newPassword !== formData.confirmPassword) {
                toast.error("New passwords do not match");
                return;
            }

            // Add password validation
            if (formData.newPassword.length < 8) {
                toast.error("Password must be at least 8 characters long");
                return;
            }

            // Here you would typically make an API call to change the password
            // For now, we'll just show a success message
            toast.success("Password changed successfully");
            setShowPasswordDialog(false);
            setFormData({ ...formData, currentPassword: "", newPassword: "", confirmPassword: "" });
        } catch (error) {
            console.error("Error changing password:", error);
            toast.error("Failed to change password");
        }
    };

    const handleAddConnection = async () => {
        try {
            setIsConnectedAccountsSaving(true);

            // Validate required fields
            if (!newConnectionData.type || !newConnectionData.institution || !newConnectionData.name) {
                toast.error("Please fill in all required fields");
                return;
            }

            const response = await fetch('/api/connected-accounts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newConnectionData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to add connection');
            }

            const data = await response.json();
            setConnectedAccounts(prev => [...prev, data]);
            setShowAddConnectionDialog(false);
            setNewConnectionData({
                type: "",
                institution: "",
                name: "",
                isPrimary: false
            });
            toast.success("New connection added successfully");
        } catch (error) {
            console.error("Error adding connection:", error);
            toast.error(error instanceof Error ? error.message : "Failed to add connection");
        } finally {
            setIsConnectedAccountsSaving(false);
        }
    };

    const handleEditConnection = async (account) => {
        try {
            setIsConnectedAccountsSaving(true);

            const response = await fetch('/api/connected-accounts', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...account,
                    isPrimary: !account.isPrimary
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update connection');
            }

            const data = await response.json();
            setConnectedAccounts(prev => prev.map(acc => 
                acc.id === data.id ? data : acc
            ));
            toast.success("Connection updated successfully");
        } catch (error) {
            console.error("Error updating connection:", error);
            toast.error(error instanceof Error ? error.message : "Failed to update connection");
        } finally {
            setIsConnectedAccountsSaving(false);
        }
    };

    const handleRemoveConnection = async (accountId) => {
        try {
            setIsConnectedAccountsSaving(true);

            const response = await fetch(`/api/connected-accounts?id=${accountId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to remove connection');
            }

            setConnectedAccounts(prev => prev.filter(acc => acc.id !== accountId));
            toast.success("Connection removed successfully");
        } catch (error) {
            console.error("Error removing connection:", error);
            toast.error(error instanceof Error ? error.message : "Failed to remove connection");
        } finally {
            setIsConnectedAccountsSaving(false);
        }
    };

    const handleCreateSupportTicket = async () => {
        try {
            setIsHelpSaving(true);

            // Validate required fields
            if (!formData.supportSubject || !formData.supportMessage) {
                toast.error("Please fill in all required fields");
                return;
            }

            const response = await fetch('/api/help', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    subject: formData.supportSubject,
                    message: formData.supportMessage,
                    priority: "medium"
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to create support ticket');
            }

            const data = await response.json();
            setSupportTickets(prev => [...prev, data]);
            setShowSupportTicketDialog(false);
            setFormData({ ...formData, supportSubject: "", supportMessage: "" });
            toast.success("Support ticket created successfully");
        } catch (error) {
            console.error("Error creating support ticket:", error);
            toast.error(error instanceof Error ? error.message : "Failed to create support ticket");
        } finally {
            setIsHelpSaving(false);
        }
    };

    const handleEndSession = async (device: string) => {
        try {
            const response = await fetch('/api/security', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ sessionId: device }),
            });

            if (!response.ok) {
                throw new Error('Failed to end session');
            }

            const data = await response.json();
            setActiveSessions(data.activeSessions);
            toast.success("Session ended successfully");
        } catch (error) {
            console.error("Error ending session:", error);
            toast.error("Failed to end session");
        }
    };

    const handleNotificationSave = async () => {
        try {
            setIsNotificationsSaving(true);

            const response = await fetch('/api/notifications', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    emailNotifications,
                    pushNotifications,
                    smsNotifications,
                    notificationCategories,
                    notificationSchedule
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update notification settings');
            }

            const data = await response.json();
            
            // Update local state with the response data
            setEmailNotifications(data.emailNotifications);
            setPushNotifications(data.pushNotifications);
            setSmsNotifications(data.smsNotifications);
            setNotificationCategories(data.notificationCategories);
            setNotificationSchedule(data.notificationSchedule);

            toast.success("Notification settings updated successfully");
        } catch (error) {
            console.error("Error updating notification settings:", error);
            toast.error(error instanceof Error ? error.message : "Failed to update notification settings");
        } finally {
            setIsNotificationsSaving(false);
        }
    };

    const handleAppearanceSave = async () => {
        try {
            setIsAppearanceSaving(true);

            const response = await fetch('/api/appearance', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    theme,
                    accentColor,
                    fontSize,
                    fontFamily,
                    layoutDensity,
                    animationSpeed
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update appearance settings');
            }

            const data = await response.json();
            
            // Update local state with the response data
            setTheme(data.theme);
            setAccentColor(data.accentColor);
            setFontSize(data.fontSize);
            setFontFamily(data.fontFamily);
            setLayoutDensity(data.layoutDensity);
            setAnimationSpeed(data.animationSpeed);

            // Apply the theme to the document
            document.documentElement.setAttribute('data-theme', data.theme);
            
            // Apply the accent color
            document.documentElement.setAttribute('data-accent-color', data.accentColor);
            
            // Apply the font size
            document.documentElement.setAttribute('data-font-size', data.fontSize);
            
            // Apply the font family
            document.documentElement.setAttribute('data-font-family', data.fontFamily);
            
            // Apply the layout density
            document.documentElement.setAttribute('data-layout-density', data.layoutDensity);
            
            // Apply the animation speed
            document.documentElement.setAttribute('data-animation-speed', data.animationSpeed);

            // Apply font family
            const fontFamilyMap: { [key: string]: string } = {
                'system': 'font-sans',
                'inter': 'font-inter',
                'roboto': 'font-roboto',
                'open-sans': 'font-open-sans',
                'lato': 'font-lato',
                'montserrat': 'font-montserrat'
            };

            // Remove all font classes
            Object.values(fontFamilyMap).forEach(fontClass => {
                document.documentElement.classList.remove(fontClass);
            });

            // Add selected font class
            document.documentElement.classList.add(fontFamilyMap[data.fontFamily]);

            // Apply font size
            const fontSizeMap: { [key: string]: string } = {
                'small': 'text-sm',
                'medium': 'text-base',
                'large': 'text-lg',
                'xlarge': 'text-xl'
            };

            // Remove all font size classes
            Object.values(fontSizeMap).forEach(sizeClass => {
                document.documentElement.classList.remove(sizeClass);
            });

            // Add selected font size class
            document.documentElement.classList.add(fontSizeMap[data.fontSize]);

            // Apply layout density
            const densityMap: { [key: string]: string } = {
                'compact': 'space-y-2',
                'comfortable': 'space-y-4',
                'spacious': 'space-y-6'
            };

            // Remove all density classes
            Object.values(densityMap).forEach(densityClass => {
                document.documentElement.classList.remove(densityClass);
            });

            // Add selected density class
            document.documentElement.classList.add(densityMap[data.layoutDensity]);

            // Apply animation speed
            const animationMap: { [key: string]: string } = {
                'fast': 'duration-150',
                'normal': 'duration-300',
                'slow': 'duration-500',
                'none': 'duration-0'
            };

            // Remove all animation classes
            Object.values(animationMap).forEach(animationClass => {
                document.documentElement.classList.remove(animationClass);
            });

            // Add selected animation class
            document.documentElement.classList.add(animationMap[data.animationSpeed]);

            // Apply accent color
            const accentColorMap: { [key: string]: string } = {
                'blue': 'accent-blue',
                'green': 'accent-green',
                'purple': 'accent-purple',
                'red': 'accent-red',
                'orange': 'accent-orange',
                'pink': 'accent-pink',
                'yellow': 'accent-yellow',
                'teal': 'accent-teal',
                'indigo': 'accent-indigo',
                'violet': 'accent-violet',
                'cyan': 'accent-cyan',
                'emerald': 'accent-emerald'
            };

            // Remove all accent color classes
            Object.values(accentColorMap).forEach(colorClass => {
                document.documentElement.classList.remove(colorClass);
            });

            // Add selected accent color class
            document.documentElement.classList.add(accentColorMap[data.accentColor]);

            toast.success("Appearance settings updated successfully");
        } catch (error) {
            console.error("Error updating appearance settings:", error);
            toast.error(error instanceof Error ? error.message : "Failed to update appearance settings");
        } finally {
            setIsAppearanceSaving(false);
        }
    };

    const handlePreferencesSave = async () => {
        try {
            setIsPreferencesSaving(true);

            const response = await fetch('/api/preferences', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    currency,
                    dateFormat,
                    language,
                    timeFormat,
                    numberFormat,
                    defaultView
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update preferences');
            }

            const data = await response.json();
            
            // Update local state with the response data
            setCurrency(data.currency);
            setDateFormat(data.dateFormat);
            setLanguage(data.language);
            setTimeFormat(data.timeFormat);
            setNumberFormat(data.numberFormat);
            setDefaultView(data.defaultView);

            // Apply the preferences to the document
            document.documentElement.setAttribute('data-currency', data.currency);
            document.documentElement.setAttribute('data-date-format', data.dateFormat);
            document.documentElement.setAttribute('data-language', data.language);
            document.documentElement.setAttribute('data-time-format', data.timeFormat);
            document.documentElement.setAttribute('data-number-format', data.numberFormat);
            document.documentElement.setAttribute('data-default-view', data.defaultView);

            toast.success("Preferences updated successfully");
        } catch (error) {
            console.error("Error updating preferences:", error);
            toast.error(error instanceof Error ? error.message : "Failed to update preferences");
        } finally {
            setIsPreferencesSaving(false);
        }
    };

    const handleSecuritySave = async () => {
        try {
            setIsSecuritySaving(true);

            // Validate security questions
            const hasEmptyQuestions = securityQuestions.some(q => !q.question || !q.answer);
            if (hasEmptyQuestions) {
                toast.error("Please fill in all security questions");
                return;
            }

            const response = await fetch('/api/security', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    twoFactorEnabled,
                    loginNotifications,
                    securityQuestions,
                    activeSessions
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update security settings');
            }

            const data = await response.json();
            
            // Update local state with the response data
            setTwoFactorEnabled(data.twoFactorEnabled);
            setLoginNotifications(data.loginNotifications);
            setSecurityQuestions(data.securityQuestions);
            setActiveSessions(data.activeSessions);

            toast.success("Security settings updated successfully");
        } catch (error) {
            console.error("Error updating security settings:", error);
            toast.error(error instanceof Error ? error.message : "Failed to update security settings");
        } finally {
            setIsSecuritySaving(false);
        }
    };

    const handleFaqClick = (faq) => {
        setSelectedFaq(faq);
        setShowFaqDialog(true);
    };

    const handleResourceClick = (resource) => {
        router.push(`/resources/${resource.category}/${resource.id}`);
    };

    const handleEmailSupportSubmit = async () => {
        try {
            if (!emailSupportData.subject || !emailSupportData.message) {
                toast.error("Please fill in all required fields");
                return;
            }

            // Here you would typically make an API call to send the email
            toast.success("Support email sent successfully");
            setShowEmailSupportDialog(false);
            setEmailSupportData({
                subject: "",
                message: "",
                priority: "medium"
            });
        } catch (error) {
            console.error("Error sending support email:", error);
            toast.error("Failed to send support email");
        }
    };

    return (
        <div className="flex h-full flex-col space-y-6 p-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold">Settings</h1>
                    <p className="text-sm text-muted-foreground">Manage your account settings and preferences</p>
                </div>
                <Button variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => setShowDeleteDialog(true)}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Account
                </Button>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                <TabsList className="grid w-full grid-cols-7">
                    <TabsTrigger value="profile" className="flex items-center gap-2">
                        <Avatar className="h-4 w-4" />
                        Profile
                    </TabsTrigger>
                    <TabsTrigger value="security" className="flex items-center gap-2">
                        <Lock className="h-4 w-4" />
                        Security
                    </TabsTrigger>
                    <TabsTrigger value="notifications" className="flex items-center gap-2">
                        <Bell className="h-4 w-4" />
                        Notifications
                    </TabsTrigger>
                    <TabsTrigger value="appearance" className="flex items-center gap-2">
                        <Palette className="h-4 w-4" />
                        Appearance
                    </TabsTrigger>
                    <TabsTrigger value="preferences" className="flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        Preferences
                    </TabsTrigger>
                    <TabsTrigger value="connected" className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        Connected
                    </TabsTrigger>
                    <TabsTrigger value="help" className="flex items-center gap-2">
                        <HelpCircle className="h-4 w-4" />
                        Help
                    </TabsTrigger>
                </TabsList>

                <ScrollArea className="h-[calc(100vh-12rem)]">
                    <TabsContent value="profile" className="space-y-4">
                        <Card className="p-6">
                            {isLoading ? (
                                <div className="flex items-center justify-center h-64">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                                </div>
                            ) : (
                                <div className="flex items-start gap-6">
                                    <div className="relative">
                                        <Avatar 
                                            className="h-24 w-24 cursor-pointer hover:opacity-90 transition-opacity"
                                            onClick={() => setShowImagePreview(true)}
                                        >
                                            <AvatarImage 
                                                src={profileImage || formData.profileImage || "/avatars/01.png"} 
                                                alt="Profile" 
                                            />
                                            <AvatarFallback>
                                                {formData.firstName?.[0]}{formData.lastName?.[0]}
                                            </AvatarFallback>
                                        </Avatar>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            className="hidden"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                        />
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="absolute bottom-0 right-0 h-8 w-8 rounded-full"
                                            onClick={() => fileInputRef.current?.click()}
                                        >
                                            <Camera className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <div className="flex-1 space-y-4">
                                        <div className="grid gap-4 md:grid-cols-2">
                                            <div className="space-y-2">
                                                <Label htmlFor="firstName">First Name *</Label>
                                                <Input 
                                                    id="firstName" 
                                                    value={formData.firstName}
                                                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                                    required
                                                    placeholder="Enter your first name"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="lastName">Last Name *</Label>
                                                <Input 
                                                    id="lastName" 
                                                    value={formData.lastName}
                                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                                    required
                                                    placeholder="Enter your last name"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email *</Label>
                                            <Input 
                                                id="email" 
                                                type="email" 
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                required
                                                placeholder="Enter your email address"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="phone">Phone</Label>
                                            <Input 
                                                id="phone" 
                                                type="tel" 
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                placeholder="Enter your phone number"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="address">Address</Label>
                                            <Input 
                                                id="address" 
                                                value={formData.address}
                                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                                placeholder="Enter your complete address"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="bio">Bio</Label>
                                            <Textarea 
                                                id="bio" 
                                                value={formData.bio}
                                                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                                placeholder="Tell us about yourself"
                                            />
                                        </div>
                                        <div className="grid gap-4 md:grid-cols-2">
                                            <div className="space-y-2">
                                                <Label htmlFor="timezone">Timezone</Label>
                                                <Select value={formData.timezone} onValueChange={(value) => setFormData({ ...formData, timezone: value })}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select timezone" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="UTC+5:30">India Standard Time (UTC+5:30)</SelectItem>
                                                        <SelectItem value="UTC+5:45">Nepal Time (UTC+5:45)</SelectItem>
                                                        <SelectItem value="UTC+6:00">Bangladesh Time (UTC+6:00)</SelectItem>
                                                        <SelectItem value="UTC+6:30">Myanmar Time (UTC+6:30)</SelectItem>
                                                        <SelectItem value="UTC+7:00">Indochina Time (UTC+7:00)</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                                                <Input 
                                                    id="dateOfBirth" 
                                                    type="date" 
                                                    value={formData.dateOfBirth}
                                                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div className="grid gap-4 md:grid-cols-2">
                                            <div className="space-y-2">
                                                <Label htmlFor="occupation">Occupation</Label>
                                                <Input 
                                                    id="occupation" 
                                                    value={formData.occupation}
                                                    onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                                                    placeholder="Enter your occupation"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="company">Company</Label>
                                                <Input 
                                                    id="company" 
                                                    value={formData.company}
                                                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                                    placeholder="Enter your company name"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="website">Website</Label>
                                            <Input 
                                                id="website" 
                                                type="url" 
                                                value={formData.website}
                                                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                                placeholder="Enter your website URL"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Social Links</Label>
                                            <div className="grid gap-4 md:grid-cols-3">
                                                <div className="space-y-2">
                                                    <Label htmlFor="twitter">Twitter</Label>
                                                    <Input 
                                                        id="twitter" 
                                                        value={formData.socialLinks.twitter}
                                                        onChange={(e) => setFormData({ 
                                                            ...formData, 
                                                            socialLinks: { ...formData.socialLinks, twitter: e.target.value }
                                                        })}
                                                        placeholder="@username"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="linkedin">LinkedIn</Label>
                                                    <Input 
                                                        id="linkedin" 
                                                        value={formData.socialLinks.linkedin}
                                                        onChange={(e) => setFormData({ 
                                                            ...formData, 
                                                            socialLinks: { ...formData.socialLinks, linkedin: e.target.value }
                                                        })}
                                                        placeholder="linkedin.com/in/username"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="github">GitHub</Label>
                                                    <Input 
                                                        id="github" 
                                                        value={formData.socialLinks.github}
                                                        onChange={(e) => setFormData({ 
                                                            ...formData, 
                                                            socialLinks: { ...formData.socialLinks, github: e.target.value }
                                                        })}
                                                        placeholder="github.com/username"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <Button 
                                                onClick={handleSaveChanges} 
                                                disabled={isSaving}
                                            >
                                                {isSaving ? (
                                                    <>
                                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                                        Saving...
                                                    </>
                                                ) : (
                                                    'Save Changes'
                                                )}
                                            </Button>
                                            <Button 
                                                variant="outline" 
                                                onClick={handleCancel}
                                                disabled={isSaving}
                                            >
                                                Cancel
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </Card>
                    </TabsContent>

                    <TabsContent value="security" className="space-y-4">
                        <Card className="p-6">
                            {isSecurityLoading ? (
                                <div className="flex items-center justify-center h-64">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                                </div>
                            ) : (
            <div className="space-y-6">
                                    <h2 className="text-lg font-semibold mb-4">Security Settings</h2>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="font-medium">Two-Factor Authentication</h3>
                                                <p className="text-sm text-muted-foreground">
                                                    Add an extra layer of security to your account
                                                </p>
            </div>
                                            <Switch checked={twoFactorEnabled} onCheckedChange={setTwoFactorEnabled} />
                                        </div>
                                        <Separator />
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="font-medium">Login Notifications</h3>
                                                <p className="text-sm text-muted-foreground">
                                                    Get notified when someone logs into your account
                                                </p>
                                            </div>
                                            <Switch checked={loginNotifications} onCheckedChange={setLoginNotifications} />
                                        </div>
                                        <Separator />
                                        <div className="space-y-4">
                                            <h3 className="font-medium">Security Questions</h3>
                                            {securityQuestions.map((question, index) => (
                                                <div key={index} className="space-y-2">
                                                    <Label>Question {index + 1}</Label>
                                                    <Select 
                                                        value={question.question}
                                                        onValueChange={(value) => {
                                                            const newQuestions = [...securityQuestions];
                                                            newQuestions[index].question = value;
                                                            setSecurityQuestions(newQuestions);
                                                        }}
                                                    >
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select a security question" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="What was your first pet's name?">What was your first pet's name?</SelectItem>
                                                            <SelectItem value="What city were you born in?">What city were you born in?</SelectItem>
                                                            <SelectItem value="What is your mother's maiden name?">What is your mother's maiden name?</SelectItem>
                                                            <SelectItem value="What was your first school?">What was your first school?</SelectItem>
                                                            <SelectItem value="What is your favorite book?">What is your favorite book?</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <Input 
                                                        placeholder="Your answer"
                                                        value={question.answer}
                                                        onChange={(e) => {
                                                            const newQuestions = [...securityQuestions];
                                                            newQuestions[index].answer = e.target.value;
                                                            setSecurityQuestions(newQuestions);
                                                        }}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                        <Separator />
                                        <div className="space-y-4">
                                            <h3 className="font-medium">Active Sessions</h3>
                                            {activeSessions.map((session, index) => (
                                                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                                                    <div>
                                                        <p className="font-medium">{session.device}</p>
                                                        <p className="text-sm text-muted-foreground">{session.location}</p>
                                                        <p className="text-xs text-muted-foreground">Last active: {session.lastActive}</p>
                                                    </div>
                                                    <Button 
                                                        variant="outline" 
                                                        size="sm" 
                                                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                                        onClick={() => handleEndSession(session.device)}
                                                    >
                                                        End Session
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                        <Separator />
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="font-medium">Password</h3>
                                                <p className="text-sm text-muted-foreground">
                                                    Change your account password
                                                </p>
                                            </div>
                                            <Button variant="outline" onClick={() => setShowPasswordDialog(true)}>
                                                Change Password
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="pt-4">
                                        <Button 
                                            onClick={handleSecuritySave}
                                            disabled={isSecuritySaving}
                                        >
                                            {isSecuritySaving ? (
                                                <>
                                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                                    Saving...
                                                </>
                                            ) : (
                                                'Save Security Settings'
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </Card>
                    </TabsContent>

                    <TabsContent value="notifications" className="space-y-4">
                        <Card className="p-6">
                            {isNotificationsLoading ? (
                                <div className="flex items-center justify-center h-64">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    <h2 className="text-lg font-semibold mb-4">Notification Preferences</h2>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="font-medium">Email Notifications</h3>
                                                <p className="text-sm text-muted-foreground">
                                                    Receive updates via email
                                                </p>
                                            </div>
                                            <Switch 
                                                checked={emailNotifications} 
                                                onCheckedChange={setEmailNotifications} 
                                            />
                                        </div>
                                        <Separator />
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="font-medium">Push Notifications</h3>
                                                <p className="text-sm text-muted-foreground">
                                                    Receive updates on your device
                                                </p>
                                            </div>
                                            <Switch 
                                                checked={pushNotifications} 
                                                onCheckedChange={setPushNotifications} 
                                            />
                                        </div>
                                        <Separator />
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="font-medium">SMS Notifications</h3>
                                                <p className="text-sm text-muted-foreground">
                                                    Receive updates via text message
                                                </p>
                                            </div>
                                            <Switch 
                                                checked={smsNotifications} 
                                                onCheckedChange={setSmsNotifications} 
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="font-medium">Notification Categories</h3>
                                        <div className="grid gap-4 md:grid-cols-2">
                                            <div className="flex items-center justify-between">
                                                <Label>Transaction Alerts</Label>
                                                <Switch 
                                                    checked={notificationCategories.transactionAlerts}
                                                    onCheckedChange={(checked) => 
                                                        setNotificationCategories(prev => ({
                                                            ...prev,
                                                            transactionAlerts: checked
                                                        }))
                                                    }
                                                />
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <Label>Security Alerts</Label>
                                                <Switch 
                                                    checked={notificationCategories.securityAlerts}
                                                    onCheckedChange={(checked) => 
                                                        setNotificationCategories(prev => ({
                                                            ...prev,
                                                            securityAlerts: checked
                                                        }))
                                                    }
                                                />
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <Label>Savings Goals</Label>
                                                <Switch 
                                                    checked={notificationCategories.savingsGoals}
                                                    onCheckedChange={(checked) => 
                                                        setNotificationCategories(prev => ({
                                                            ...prev,
                                                            savingsGoals: checked
                                                        }))
                                                    }
                                                />
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <Label>Investment Updates</Label>
                                                <Switch 
                                                    checked={notificationCategories.investmentUpdates}
                                                    onCheckedChange={(checked) => 
                                                        setNotificationCategories(prev => ({
                                                            ...prev,
                                                            investmentUpdates: checked
                                                        }))
                                                    }
                                                />
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <Label>Budget Alerts</Label>
                                                <Switch 
                                                    checked={notificationCategories.budgetAlerts}
                                                    onCheckedChange={(checked) => 
                                                        setNotificationCategories(prev => ({
                                                            ...prev,
                                                            budgetAlerts: checked
                                                        }))
                                                    }
                                                />
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <Label>Bill Reminders</Label>
                                                <Switch 
                                                    checked={notificationCategories.billReminders}
                                                    onCheckedChange={(checked) => 
                                                        setNotificationCategories(prev => ({
                                                            ...prev,
                                                            billReminders: checked
                                                        }))
                                                    }
                                                />
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <Label>Market Updates</Label>
                                                <Switch 
                                                    checked={notificationCategories.marketUpdates}
                                                    onCheckedChange={(checked) => 
                                                        setNotificationCategories(prev => ({
                                                            ...prev,
                                                            marketUpdates: checked
                                                        }))
                                                    }
                                                />
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <Label>Account Activity</Label>
                                                <Switch 
                                                    checked={notificationCategories.accountActivity}
                                                    onCheckedChange={(checked) => 
                                                        setNotificationCategories(prev => ({
                                                            ...prev,
                                                            accountActivity: checked
                                                        }))
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <Separator />
                                    <div className="space-y-4">
                                        <h3 className="font-medium">Notification Schedule</h3>
                                        <div className="grid gap-4 md:grid-cols-2">
                                            <div className="space-y-2">
                                                <Label>Daily Summary</Label>
                                                <Select 
                                                    value={notificationSchedule.dailySummary}
                                                    onValueChange={(value) => 
                                                        setNotificationSchedule(prev => ({
                                                            ...prev,
                                                            dailySummary: value
                                                        }))
                                                    }
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select time" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="8:00 AM">8:00 AM</SelectItem>
                                                        <SelectItem value="9:00 AM">9:00 AM</SelectItem>
                                                        <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                                                        <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                                                        <SelectItem value="12:00 PM">12:00 PM</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Weekly Report</Label>
                                                <Select 
                                                    value={notificationSchedule.weeklyReport}
                                                    onValueChange={(value) => 
                                                        setNotificationSchedule(prev => ({
                                                            ...prev,
                                                            weeklyReport: value
                                                        }))
                                                    }
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select day" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="Monday">Monday</SelectItem>
                                                        <SelectItem value="Tuesday">Tuesday</SelectItem>
                                                        <SelectItem value="Wednesday">Wednesday</SelectItem>
                                                        <SelectItem value="Thursday">Thursday</SelectItem>
                                                        <SelectItem value="Friday">Friday</SelectItem>
                                                        <SelectItem value="Saturday">Saturday</SelectItem>
                                                        <SelectItem value="Sunday">Sunday</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pt-4">
                                        <Button 
                                            onClick={handleNotificationSave}
                                            disabled={isNotificationsSaving}
                                        >
                                            {isNotificationsSaving ? (
                                                <>
                                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                                    Saving...
                                                </>
                                            ) : (
                                                'Save Notification Settings'
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </Card>
                    </TabsContent>

                    <TabsContent value="appearance" className="space-y-4">
                        <Card className="p-6">
                            {isAppearanceLoading ? (
                                <div className="flex items-center justify-center h-64">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    <h2 className="text-lg font-semibold mb-4">Appearance Settings</h2>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label>Theme</Label>
                                            <Select value={theme} onValueChange={setTheme}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select theme" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="light">Light</SelectItem>
                                                    <SelectItem value="dark">Dark</SelectItem>
                                                    <SelectItem value="system">System</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <Separator />
                                        <div className="space-y-2">
                                            <Label>Accent Color</Label>
                                            <Select value={accentColor} onValueChange={setAccentColor}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select accent color" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="blue">Blue</SelectItem>
                                                    <SelectItem value="green">Green</SelectItem>
                                                    <SelectItem value="purple">Purple</SelectItem>
                                                    <SelectItem value="red">Red</SelectItem>
                                                    <SelectItem value="orange">Orange</SelectItem>
                                                    <SelectItem value="pink">Pink</SelectItem>
                                                    <SelectItem value="yellow">Yellow</SelectItem>
                                                    <SelectItem value="teal">Teal</SelectItem>
                                                    <SelectItem value="indigo">Indigo</SelectItem>
                                                    <SelectItem value="violet">Violet</SelectItem>
                                                    <SelectItem value="cyan">Cyan</SelectItem>
                                                    <SelectItem value="emerald">Emerald</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <Separator />
                                        <div className="space-y-2">
                                            <Label>Font Size</Label>
                                            <Select value={fontSize} onValueChange={setFontSize}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select font size" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="small">Small</SelectItem>
                                                    <SelectItem value="medium">Medium</SelectItem>
                                                    <SelectItem value="large">Large</SelectItem>
                                                    <SelectItem value="xlarge">Extra Large</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <Separator />
                                        <div className="space-y-2">
                                            <Label>Font Family</Label>
                                            <Select value={fontFamily} onValueChange={setFontFamily}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select font family" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="system">System Default</SelectItem>
                                                    <SelectItem value="inter">Inter</SelectItem>
                                                    <SelectItem value="roboto">Roboto</SelectItem>
                                                    <SelectItem value="open-sans">Open Sans</SelectItem>
                                                    <SelectItem value="lato">Lato</SelectItem>
                                                    <SelectItem value="montserrat">Montserrat</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <Separator />
                                        <div className="space-y-2">
                                            <Label>Layout Density</Label>
                                            <Select value={layoutDensity} onValueChange={setLayoutDensity}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select layout density" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="compact">Compact</SelectItem>
                                                    <SelectItem value="comfortable">Comfortable</SelectItem>
                                                    <SelectItem value="spacious">Spacious</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <Separator />
                                        <div className="space-y-2">
                                            <Label>Animation Speed</Label>
                                            <Select value={animationSpeed} onValueChange={setAnimationSpeed}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select animation speed" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="fast">Fast</SelectItem>
                                                    <SelectItem value="normal">Normal</SelectItem>
                                                    <SelectItem value="slow">Slow</SelectItem>
                                                    <SelectItem value="none">None</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="pt-4">
                                        <Button 
                                            onClick={handleAppearanceSave}
                                            disabled={isAppearanceSaving}
                                        >
                                            {isAppearanceSaving ? (
                                                <>
                                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                                    Saving...
                                                </>
                                            ) : (
                                                'Save Appearance Settings'
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </Card>
                    </TabsContent>

                    <TabsContent value="preferences" className="space-y-4">
                        <Card className="p-6">
                            {isPreferencesLoading ? (
                                <div className="flex items-center justify-center h-64">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    <h2 className="text-lg font-semibold mb-4">Preferences</h2>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label>Default Currency</Label>
                                            <Select value={currency} onValueChange={setCurrency}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select currency" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="usd">USD ($)</SelectItem>
                                                    <SelectItem value="eur">EUR (€)</SelectItem>
                                                    <SelectItem value="gbp">GBP (£)</SelectItem>
                                                    <SelectItem value="inr">INR (₹)</SelectItem>
                                                    <SelectItem value="jpy">JPY (¥)</SelectItem>
                                                    <SelectItem value="cad">CAD (C$)</SelectItem>
                                                    <SelectItem value="aud">AUD (A$)</SelectItem>
                                                    <SelectItem value="sgd">SGD (S$)</SelectItem>
                                                    <SelectItem value="hkd">HKD (HK$)</SelectItem>
                                                    <SelectItem value="nzd">NZD (NZ$)</SelectItem>
                                                    <SelectItem value="chf">CHF (Fr)</SelectItem>
                                                    <SelectItem value="cny">CNY (¥)</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <Separator />
                                        <div className="space-y-2">
                                            <Label>Date Format</Label>
                                            <Select value={dateFormat} onValueChange={setDateFormat}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select date format" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="mm/dd/yyyy">MM/DD/YYYY</SelectItem>
                                                    <SelectItem value="dd/mm/yyyy">DD/MM/YYYY</SelectItem>
                                                    <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                                                    <SelectItem value="dd.mm.yyyy">DD.MM.YYYY</SelectItem>
                                                    <SelectItem value="dd/mm/yy">DD/MM/YY</SelectItem>
                                                    <SelectItem value="mm/dd/yy">MM/DD/YY</SelectItem>
                                                    <SelectItem value="dd-mm-yyyy">DD-MM-YYYY</SelectItem>
                                                    <SelectItem value="yyyy/mm/dd">YYYY/MM/DD</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <Separator />
                                        <div className="space-y-2">
                                            <Label>Language</Label>
                                            <Select value={language} onValueChange={setLanguage}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select language" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="en">English</SelectItem>
                                                    <SelectItem value="es">Spanish</SelectItem>
                                                    <SelectItem value="fr">French</SelectItem>
                                                    <SelectItem value="de">German</SelectItem>
                                                    <SelectItem value="hi">Hindi</SelectItem>
                                                    <SelectItem value="bn">Bengali</SelectItem>
                                                    <SelectItem value="ja">Japanese</SelectItem>
                                                    <SelectItem value="ko">Korean</SelectItem>
                                                    <SelectItem value="zh">Chinese</SelectItem>
                                                    <SelectItem value="ru">Russian</SelectItem>
                                                    <SelectItem value="pt">Portuguese</SelectItem>
                                                    <SelectItem value="it">Italian</SelectItem>
                                                    <SelectItem value="nl">Dutch</SelectItem>
                                                    <SelectItem value="pl">Polish</SelectItem>
                                                    <SelectItem value="ar">Arabic</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <Separator />
                                        <div className="space-y-2">
                                            <Label>Time Format</Label>
                                            <Select value={timeFormat} onValueChange={setTimeFormat}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select time format" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="12h">12-hour (AM/PM)</SelectItem>
                                                    <SelectItem value="24h">24-hour</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <Separator />
                                        <div className="space-y-2">
                                            <Label>Number Format</Label>
                                            <Select value={numberFormat} onValueChange={setNumberFormat}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select number format" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="standard">Standard (1,234.56)</SelectItem>
                                                    <SelectItem value="european">European (1.234,56)</SelectItem>
                                                    <SelectItem value="indian">Indian (12,34,567.89)</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <Separator />
                                        <div className="space-y-2">
                                            <Label>Default View</Label>
                                            <Select value={defaultView} onValueChange={setDefaultView}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select default view" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="dashboard">Dashboard</SelectItem>
                                                    <SelectItem value="accounts">Accounts</SelectItem>
                                                    <SelectItem value="transactions">Transactions</SelectItem>
                                                    <SelectItem value="investments">Investments</SelectItem>
                                                    <SelectItem value="budget">Budget</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="pt-4">
                                        <Button 
                                            onClick={handlePreferencesSave}
                                            disabled={isPreferencesSaving}
                                        >
                                            {isPreferencesSaving ? (
                                                <>
                                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                                    Saving...
                                                </>
                                            ) : (
                                                'Save Preferences'
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </Card>
                    </TabsContent>

                    <TabsContent value="connected" className="space-y-4">
                        <Card className="p-6">
                            <h2 className="text-lg font-semibold mb-4">Connected Accounts</h2>
                            <div className="space-y-6">
                                {isConnectedAccountsLoading ? (
                                    <div className="flex items-center justify-center h-64">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {connectedAccounts.map((account) => (
                                            <div key={account.id} className="flex items-center justify-between p-4 border rounded-lg">
                                                <div>
                                                    <h3 className="font-medium">{account.name}</h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        {account.type === 'bank' && `Account: ${account.accountNumber}`}
                                                        {account.type === 'credit' && `Card: ${account.cardNumber}`}
                                                        {account.type === 'investment' && `Account: ${account.accountNumber}`}
                                                        {account.type === 'crypto' && `Wallet: ${account.walletAddress}`}
                                                    </p>
                                                    <Badge variant="outline" className="mt-1">
                                                        {account.isPrimary ? 'Primary' : account.type.charAt(0).toUpperCase() + account.type.slice(1)}
                                                    </Badge>
                                                </div>
                                                <div className="flex gap-2">
                                                    <Button 
                                                        variant="outline" 
                                                        size="sm"
                                                        onClick={() => handleEditConnection(account)}
                                                        disabled={isConnectedAccountsSaving}
                                                    >
                                                        {account.isPrimary ? 'Remove Primary' : 'Make Primary'}
                                                    </Button>
                                                    <Button 
                                                        variant="outline" 
                                                        size="sm" 
                                                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                                        onClick={() => handleRemoveConnection(account.id)}
                                                        disabled={isConnectedAccountsSaving}
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <div className="pt-4 border-t">
                                    <Button 
                                        onClick={() => setShowAddConnectionDialog(true)}
                                        disabled={isConnectedAccountsSaving}
                                    >
                                        <Plus className="mr-2 h-4 w-4" />
                                        Add New Connection
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </TabsContent>

                    <TabsContent value="help" className="space-y-4">
                        <Card className="p-6">
                            <h2 className="text-lg font-semibold mb-4">Help & Support</h2>
                            <div className="space-y-6">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label>Common Questions</Label>
                                        {isFaqLoading ? (
                                            <div className="flex items-center justify-center h-32">
                                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                                            </div>
                                        ) : (
                                            <div className="grid gap-2 md:grid-cols-2">
                                                {faqs.map((faq) => (
                                                    <Button 
                                                        key={faq.id}
                                                        variant="outline" 
                                                        className="w-full justify-start text-left"
                                                        onClick={() => handleFaqClick(faq)}
                                                    >
                                                        {faq.question}
                                                    </Button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <Separator />
                                    <div className="space-y-2">
                                        <Label>Contact Support</Label>
                                        <div className="grid gap-4 md:grid-cols-2">
                                            <Button variant="outline" className="w-full" onClick={() => setShowSupportTicketDialog(true)}>
                                                Create Support Ticket
                                            </Button>
                                            <Button variant="outline" className="w-full" onClick={() => setShowEmailSupportDialog(true)}>
                                                Email Support
                                            </Button>
                                        </div>
                                        <div className="grid gap-4 md:grid-cols-2 mt-4">
                                            <div className="space-y-2">
                                                <Label>Email Support</Label>
                                                <p className="text-sm text-muted-foreground">support@example.com</p>
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Phone Support</Label>
                                                <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                                            </div>
                                        </div>
                                    </div>
                                    <Separator />
                                    <div className="space-y-2">
                                        <Label>Resources</Label>
                                        {isResourcesLoading ? (
                                            <div className="flex items-center justify-center h-32">
                                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                                            </div>
                                        ) : (
                                            <div className="grid gap-4 md:grid-cols-2">
                                                {supportResources.documentation.map((resource) => (
                                                    <Button 
                                                        key={resource.id}
                                                        variant="outline" 
                                                        className="w-full"
                                                        onClick={() => handleResourceClick(resource)}
                                                    >
                                                        {resource.title}
                                                    </Button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <Separator />
                                    <div className="space-y-2">
                                        <Label>Account Management</Label>
                                        {isResourcesLoading ? (
                                            <div className="flex items-center justify-center h-32">
                                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                                            </div>
                                        ) : (
                                            <div className="grid gap-4 md:grid-cols-2">
                                                {supportResources.account.map((resource) => (
                                                    <Button 
                                                        key={resource.id}
                                                        variant="outline" 
                                                        className="w-full"
                                                        onClick={() => handleResourceClick(resource)}
                                                    >
                                                        {resource.title}
                                                    </Button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <Separator />
                                    <div className="space-y-2">
                                        <Label>Training & Tutorials</Label>
                                        {isResourcesLoading ? (
                                            <div className="flex items-center justify-center h-32">
                                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                                            </div>
                                        ) : (
                                            <div className="grid gap-4 md:grid-cols-2">
                                                {supportResources.training.map((resource) => (
                                                    <Button 
                                                        key={resource.id}
                                                        variant="outline" 
                                                        className="w-full"
                                                        onClick={() => handleResourceClick(resource)}
                                                    >
                                                        {resource.title}
                                                    </Button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </TabsContent>
                </ScrollArea>
            </Tabs>

            {/* Password Change Dialog */}
            <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Change Password</DialogTitle>
                        <DialogDescription>
                            Enter your current password and choose a new one.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="currentPassword">Current Password</Label>
                            <Input
                                id="currentPassword"
                                type="password"
                                value={formData.currentPassword}
                                onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="newPassword">New Password</Label>
                            <Input
                                id="newPassword"
                                type="password"
                                value={formData.newPassword}
                                onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm New Password</Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowPasswordDialog(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handlePasswordChange}>Change Password</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Add Connection Dialog */}
            <Dialog open={showAddConnectionDialog} onOpenChange={setShowAddConnectionDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Connection</DialogTitle>
                        <DialogDescription>
                            Connect your bank account or credit card.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label>Connection Type</Label>
                            <Select 
                                value={newConnectionData.type}
                                onValueChange={(value) => setNewConnectionData(prev => ({ ...prev, type: value }))}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select connection type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="bank">Bank Account</SelectItem>
                                    <SelectItem value="credit">Credit Card</SelectItem>
                                    <SelectItem value="investment">Investment Account</SelectItem>
                                    <SelectItem value="crypto">Crypto Wallet</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Institution</Label>
                            <Select 
                                value={newConnectionData.institution}
                                onValueChange={(value) => setNewConnectionData(prev => ({ ...prev, institution: value }))}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select institution" />
                                </SelectTrigger>
                                <SelectContent>
                                    {newConnectionData.type === 'bank' && (
                                        <>
                                            <SelectItem value="chase">Chase Bank</SelectItem>
                                            <SelectItem value="bankofamerica">Bank of America</SelectItem>
                                            <SelectItem value="wellsfargo">Wells Fargo</SelectItem>
                                        </>
                                    )}
                                    {newConnectionData.type === 'credit' && (
                                        <>
                                            <SelectItem value="visa">Visa</SelectItem>
                                            <SelectItem value="mastercard">Mastercard</SelectItem>
                                        </>
                                    )}
                                    {newConnectionData.type === 'investment' && (
                                        <>
                                            <SelectItem value="fidelity">Fidelity</SelectItem>
                                            <SelectItem value="vanguard">Vanguard</SelectItem>
                                            <SelectItem value="schwab">Schwab</SelectItem>
                                        </>
                                    )}
                                    {newConnectionData.type === 'crypto' && (
                                        <>
                                            <SelectItem value="coinbase">Coinbase</SelectItem>
                                            <SelectItem value="binance">Binance</SelectItem>
                                            <SelectItem value="kraken">Kraken</SelectItem>
                                        </>
                                    )}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Account Name</Label>
                            <Input
                                value={newConnectionData.name}
                                onChange={(e) => setNewConnectionData(prev => ({ ...prev, name: e.target.value }))}
                                placeholder="Enter account name"
                            />
                        </div>
                        <div className="flex items-center space-x-2">
                            <Switch
                                checked={newConnectionData.isPrimary}
                                onCheckedChange={(checked) => setNewConnectionData(prev => ({ ...prev, isPrimary: checked }))}
                            />
                            <Label>Set as Primary Account</Label>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button 
                            variant="outline" 
                            onClick={() => {
                                setShowAddConnectionDialog(false);
                                setNewConnectionData({
                                    type: "",
                                    institution: "",
                                    name: "",
                                    isPrimary: false
                                });
                            }}
                            disabled={isConnectedAccountsSaving}
                        >
                            Cancel
                        </Button>
                        <Button 
                            onClick={handleAddConnection}
                            disabled={isConnectedAccountsSaving}
                        >
                            {isConnectedAccountsSaving ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    Adding...
                                </>
                            ) : (
                                'Add Connection'
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Support Ticket Dialog */}
            <Dialog open={showSupportTicketDialog} onOpenChange={setShowSupportTicketDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create Support Ticket</DialogTitle>
                        <DialogDescription>
                            Describe your issue and we'll help you resolve it.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="supportSubject">Subject</Label>
                            <Input
                                id="supportSubject"
                                value={formData.supportSubject}
                                onChange={(e) => setFormData({ ...formData, supportSubject: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="supportMessage">Message</Label>
                            <Input
                                id="supportMessage"
                                value={formData.supportMessage}
                                onChange={(e) => setFormData({ ...formData, supportMessage: e.target.value })}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowSupportTicketDialog(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleCreateSupportTicket}>Create Ticket</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Account Dialog */}
            <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Account</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete your account? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction className="bg-red-600 hover:bg-red-700">
                            Delete Account
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Profile Image Preview Dialog */}
            <Dialog open={showImagePreview} onOpenChange={setShowImagePreview}>
                <DialogContent className="max-w-3xl p-0 overflow-hidden">
                    <div className="relative group">
                        <img
                            src={profileImage || formData.profileImage || "/avatars/01.png"}
                            alt="Profile Preview"
                            className="w-full h-auto object-contain"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-white hover:text-white hover:bg-white/20"
                                onClick={() => setShowImagePreview(false)}
                            >
                                <X className="h-6 w-6" />
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* FAQ Dialog */}
            <Dialog open={showFaqDialog} onOpenChange={setShowFaqDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{selectedFaq?.question}</DialogTitle>
                        <DialogDescription>
                            Here's the answer to your question
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                        <p className="text-muted-foreground whitespace-pre-wrap">{selectedFaq?.answer}</p>
                    </div>
                    <DialogFooter>
                        <Button onClick={() => setShowFaqDialog(false)}>Close</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Resource Dialog */}
            <Dialog open={showResourceDialog} onOpenChange={setShowResourceDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{selectedResource?.title}</DialogTitle>
                        <DialogDescription>
                            {selectedResource?.description}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                        <p className="text-muted-foreground">
                            Click the button below to view this resource.
                        </p>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowResourceDialog(false)}>
                            Close
                        </Button>
                        <Button onClick={() => router.push(`/resources/${selectedResource?.category}/${selectedResource?.id}`)}>
                            View Resource
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Email Support Dialog */}
            <Dialog open={showEmailSupportDialog} onOpenChange={setShowEmailSupportDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Email Support</DialogTitle>
                        <DialogDescription>
                            Send us an email and we'll get back to you as soon as possible.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="emailSubject">Subject</Label>
                            <Input
                                id="emailSubject"
                                value={emailSupportData.subject}
                                onChange={(e) => setEmailSupportData(prev => ({ ...prev, subject: e.target.value }))}
                                placeholder="Enter subject"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="emailMessage">Message</Label>
                            <Textarea
                                id="emailMessage"
                                value={emailSupportData.message}
                                onChange={(e) => setEmailSupportData(prev => ({ ...prev, message: e.target.value }))}
                                placeholder="Describe your issue"
                                className="min-h-[150px]"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Priority</Label>
                            <Select
                                value={emailSupportData.priority}
                                onValueChange={(value) => setEmailSupportData(prev => ({ ...prev, priority: value }))}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select priority" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="low">Low</SelectItem>
                                    <SelectItem value="medium">Medium</SelectItem>
                                    <SelectItem value="high">High</SelectItem>
                                    <SelectItem value="urgent">Urgent</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowEmailSupportDialog(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleEmailSupportSubmit}>
                            Send Email
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
} 
>>>>>>> origin/master
