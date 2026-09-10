"use client";

import Image from 'next/image';
import React, { useState } from 'react';
import Div from './motion/Div';

interface TestimonialCardProps {
    quote: string;
    name: string;
    position: string;
    reference_url?: string | null;
    avatar: {
        alt: string;
        filename: string;
        mimeType: string;
        filesize: number;
        width: number;
        height: number;
        focalX: number;
        focalY: number;
        url: string;
        thumbnailURL: string | null;
    };
    index?: number;
}

const MAX_CHAR_LIMIT = 140;

const TestimonialCard = ({ quote, name, position, reference_url, avatar, index = 0 }: TestimonialCardProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const isLongQuote = quote.length > MAX_CHAR_LIMIT;
    const displayedQuote = isLongQuote && !isExpanded ? `${quote.slice(0, MAX_CHAR_LIMIT)}...` : quote;

    return (
        <Div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
            className="flex flex-col items-center w-full pt-12.5 h-full"
        >
            <div className="w-full h-full flex flex-col justify-between border-2 border-gray-300 dark:border-gray-600 rounded-lg px-6 pb-6 hover:-translate-y-1.5 hover:shadow-xl hover:border-primary-500/50 dark:hover:border-primary-500/50 transition-all duration-300">
                <Image
                    src={avatar.url}
                    width={100}
                    height={100}
                    alt={avatar.alt || name}
                    className="justify-self-center rounded-full -translate-y-[50%] shadow-md shrink-0 object-cover"
                />

                <div className="-translate-y-12.5 flex flex-col justify-between flex-1">
                    <div>
                        <p className="mt-4 text-lg italic text-gray-800 dark:text-gray-200">
                            "{displayedQuote}"
                            {isLongQuote && (
                                <button
                                    onClick={() => setIsExpanded(!isExpanded)}
                                    className="ml-2 text-sm font-semibold text-primary-800 dark:text-primary-500 hover:underline cursor-pointer focus:outline-none"
                                >
                                    {isExpanded ? 'See Less' : 'See More'}
                                </button>
                            )}
                        </p>
                    </div>

                    <div className="mt-6 pt-2">
                        <h3 className="font-bold text-xl text-gray-900 dark:text-white">{name}</h3>
                        <span className="text-gray-500 dark:text-gray-400 block text-sm">{position}</span>

                        {reference_url && (
                            <a
                                href={reference_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 mt-2 text-sm font-medium text-primary-800 dark:text-primary-500 hover:underline"
                            >
                                <span>Original Post</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </Div>
    );
};

export default TestimonialCard;