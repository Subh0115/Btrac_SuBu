"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface SwitchProps extends React.HTMLAttributes<HTMLButtonElement> {
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    disabled?: boolean;
}

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
    ({ className, checked = false, onCheckedChange, disabled = false, ...props }, ref) => {
        const [isChecked, setIsChecked] = React.useState(checked);

        React.useEffect(() => {
            setIsChecked(checked);
        }, [checked]);

        const handleClick = () => {
            if (!disabled) {
                const newValue = !isChecked;
                setIsChecked(newValue);
                onCheckedChange?.(newValue);
            }
        };

        return (
            <button
                type="button"
                role="switch"
                aria-checked={isChecked}
                disabled={disabled}
                ref={ref}
                onClick={handleClick}
                className={cn(
                    "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                    isChecked ? "bg-primary" : "bg-gray-200",
                    className
                )}
                {...props}
            >
                <span
                    className={cn(
                        "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                        isChecked ? "translate-x-4" : "translate-x-0"
                    )}
                />
                <span className="sr-only">Toggle switch</span>
            </button>
        );
    }
);

Switch.displayName = "Switch";

export { Switch }; 