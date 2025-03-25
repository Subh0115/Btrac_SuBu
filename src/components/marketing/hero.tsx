import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { BlurText } from "../ui/blur-text";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import Container from "../global/container";

const Hero = () => {
    return (
        <div className="flex flex-col items-center text-center w-full max-w-6xl my-28 mx-auto z-40 relative">
            <Container delay={0.0}>
                <div className="pl-2 pr-1 py-1 rounded-full border border-foreground/10 hover:border-foreground/15 backdrop-blur-lg cursor-pointer flex items-center gap-2.5 select-none w-max mx-auto">
                    <div className="w-3.5 h-3.5 rounded-full bg-primary/40 flex items-center justify-center relative">
                        <div className="w-2.5 h-2.5 rounded-full bg-primary/60 flex items-center justify-center animate-ping">
                            <div className="w-2.5 h-2.5 rounded-full bg-primary/60 flex items-center justify-center animate-ping"></div>
                        </div>
                        <div className="w-1.5 h-1.5 rounded-full bg-primary flex items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        </div>
                    </div>
                    <span className="inline-flex items-center justify-center gap-2 animate-text-gradient animate-background-shine bg-gradient-to-r from-[#b2a8fd] via-[#8678f9] to-[#c7d2fe] bg-[200%_auto] bg-clip-text text-sm text-transparent">
                        Smart Finance Management
                        <span className="text-xs text-secondary-foreground px-1.5 py-0.5 rounded-full bg-gradient-to-b from-foreground/20 to-foreground/10 flex items-center justify-center">
                            New features
                            <ArrowRightIcon className="w-3.5 h-3.5 ml-1 text-foreground/50" />
                        </span>
                    </span>
                </div>
            </Container>
            <BlurText
                word={"BtrackiFiS"}
                className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl bg-gradient-to-br from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent py-4 md:py-2 font-bold tracking-tight mt-8 font-heading"
            />
            <Container delay={0.1}>
                <div className="flex flex-col gap-2 mt-6">
                    <p className="text-lg sm:text-xl lg:text-2xl font-semibold tracking-wide text-accent-foreground/90 mx-auto">
                        SMART BANKING, SMARTER TRACKING
                    </p>
                    <p className="text-base sm:text-lg lg:text-xl text-accent-foreground/70 max-w-3xl mx-auto leading-relaxed">
                        Take control of your financial future with our AI-powered insights and seamless management tools.
                    </p>
                </div>
            </Container>
            <Container delay={0.2}>
                <div className="flex items-center justify-center gap-4 md:gap-6 mt-10">
                    <Button asChild size="lg" className="text-base px-8 py-6">
                        <Link href="/app">
                            Get Started
                        </Link>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="text-base px-8 py-6">
                        <Link href="#">
                            Learn More
                        </Link>
                    </Button>
                </div>
            </Container>
            <Container delay={0.3}>
                <div className="relative mx-auto max-w-7xl rounded-xl lg:rounded-[32px] border border-neutral-200/10 p-2 backdrop-blur-lg border-neutral-700/80 bg-neutral-900/50 md:p-4 mt-16">
                    <div className="absolute top-1/4 left-1/2 -z-10 gradient w-3/4 -translate-x-1/2 h-1/4 -translate-y-1/2 inset-0 blur-[10rem]"></div>

                    <div className="rounded-lg lg:rounded-[24px] border border-neutral-800 p-2 bg-black/90">
                        <Image
                            src="/images/dashboard.png"
                            alt="BtrackiFiS Dashboard"
                            width={1920}
                            height={1080}
                            className="rounded-lg lg:rounded-[20px]"
                            priority
                        />
                    </div>
                </div>
            </Container>
        </div>
    )
};

export default Hero
