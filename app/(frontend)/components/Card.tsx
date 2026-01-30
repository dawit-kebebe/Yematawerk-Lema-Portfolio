
"use client";
interface CardProps {
    children: React.ReactNode,
    className?: string
}

export function Card({ children, className }: CardProps) {
    return (
        <div className={`p-2 sm:p-4 md:p-6 rounded-lg border overflow-hidden border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 ${className}`}>
            {children}
        </div>
    );
}
