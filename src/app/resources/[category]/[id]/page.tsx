"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, FileText, Video, CheckCircle2, Clock, Calendar, Tag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface Resource {
    id: string;
    title: string;
    description: string;
    content: string;
    type: "document" | "video" | "tutorial";
    duration?: string;
    steps?: string[];
    author?: string;
    date?: string;
    tags?: string[];
    image?: string;
}

export default function ResourcePage() {
    const params = useParams();
    const router = useRouter();
    const [resource, setResource] = useState<Resource | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResource = async () => {
            try {
                const response = await fetch(`/api/resources/${params.category}/${params.id}`);
                const data = await response.json();
                setResource(data);
            } catch (error) {
                console.error("Error fetching resource:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchResource();
    }, [params.category, params.id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (!resource) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h1 className="text-2xl font-bold mb-4">Resource Not Found</h1>
                <Button variant="outline" onClick={() => router.push("/settings?tab=help")}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Help
                </Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <div className="relative h-[300px] w-full">
                {resource.image ? (
                    <Image
                        src={resource.image}
                        alt={resource.title}
                        fill
                        className="object-cover"
                        priority
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-r from-primary/10 to-primary/5" />
                )}
                <div className="absolute inset-0 bg-black/50" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                        <h1 className="text-4xl font-bold mb-4">{resource.title}</h1>
                        <p className="text-lg opacity-90 max-w-2xl mx-auto">{resource.description}</p>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto py-8 px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Back Button */}
                    <Button variant="ghost" className="mb-8" onClick={() => router.push("/settings?tab=help")}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Help
                    </Button>

                    {/* Meta Information */}
                    <div className="flex flex-wrap gap-4 mb-8 text-muted-foreground">
                        <div className="flex items-center gap-2">
                            {resource.type === "document" && <FileText className="h-4 w-4" />}
                            {resource.type === "video" && <Video className="h-4 w-4" />}
                            {resource.type === "tutorial" && <BookOpen className="h-4 w-4" />}
                            <span className="capitalize">{resource.type}</span>
                        </div>
                        {resource.duration && (
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                <span>{resource.duration}</span>
                            </div>
                        )}
                        {resource.date && (
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                <span>{resource.date}</span>
                            </div>
                        )}
                        {resource.author && (
                            <div className="flex items-center gap-2">
                                <span>By {resource.author}</span>
                            </div>
                        )}
                        {resource.tags && (
                            <div className="flex items-center gap-2">
                                <Tag className="h-4 w-4" />
                                <div className="flex gap-2">
                                    {resource.tags.map((tag, index) => (
                                        <span key={index} className="bg-primary/10 text-primary px-2 py-1 rounded-full text-sm">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Main Content */}
                    <Card className="p-8">
                        {resource.type === "tutorial" && resource.steps ? (
                            <div className="space-y-8">
                                {resource.steps.map((step, index) => (
                                    <div key={index} className="flex gap-6">
                                        <div className="flex-shrink-0">
                                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                                <span className="text-primary font-semibold">{index + 1}</span>
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-xl font-semibold mb-2">Step {index + 1}</h3>
                                            <p className="text-muted-foreground">{step}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="prose prose-lg max-w-none">
                                <div dangerouslySetInnerHTML={{ __html: resource.content }} />
                            </div>
                        )}
                    </Card>
                </div>
            </div>
        </div>
    );
} 