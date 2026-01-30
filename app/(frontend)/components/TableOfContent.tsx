"use client";

import React, { useCallback, useEffect } from 'react';
import { LuPin, LuPinOff } from "react-icons/lu";
import slugify from 'slugify';
import { HeadingNode } from '../types/HeadingNode';

interface TableOfContentProps {
    tableOfContent?: {
        contentTitle?: string;
        listItems: HeadingNode[];
    };
}

const topOffset = 80;
const boxHeight = 50;

// We use a function to calculate the bottom margin based on the current window height
const getMargin = () => {
    const vh = window.innerHeight;
    const bottomMargin = vh - (topOffset + boxHeight);
    return `-${topOffset}px 0px -${bottomMargin}px 0px`;
};

const generateHeading = (heading: HeadingNode, index?: number, activeId?: string, handleOnLinkClick?: (e: React.MouseEvent, id: string) => void) => {
    const href = slugify(heading.title, { lower: true, strict: true });

    return (
        <li key={href} className={`mb-2`}>
            {index !== undefined && <span className="inline-flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-2 mr-2 text-xs">{index + 1}</span>}
            <a
                href={'#' + href}
                className={`px-3 hover:underline hover:underline-offset-4 text-primary-800 dark:text-primary-500 ${activeId === href ? 'bg-primary-800 dark:bg-primary-500 rounded-sm text-white dark:text-white' : ''}`}
                onClick={(e) => handleOnLinkClick && handleOnLinkClick(e, href)}
            >
                {heading.title}
            </a>
            {
                heading.children && heading.children.length > 0 && (
                    <ul className={`pl-8 mt-2`}>
                        {
                            heading.children.map((child, index) => generateHeading(child, index, activeId, handleOnLinkClick))
                        }
                    </ul>
                )
            }
        </li >
    );
}

const TableOfContent = ({ tableOfContent }: TableOfContentProps) => {
    const [isPinned, setIsPinned] = React.useState(false);

    const handlePin = useCallback(() => {
        setIsPinned(!isPinned);
    }, [isPinned]);

    const [activeId, setActiveId] = React.useState("");

    const handleOnLinkClick = useCallback((e: React.MouseEvent, id: string) => {
        e.preventDefault();

        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });

            window.history.replaceState(null, '', `#${id}`);
            setActiveId(id);
        }
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        if (entry.target.id.trim() !== '') {
                            window.history.replaceState(null, '', `#${entry.target.id}`);
                            setActiveId(entry.target.id);
                        }
                    }
                });
            },
            { rootMargin: getMargin() }
        );

        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        headings.forEach((h) => observer.observe(h));

        return () => observer.disconnect();
    }, []);


    return (
        <aside className={`${isPinned ? 'sticky' : ''} z-10 lg:top-18 max-w-md w-full scrollbar-thin border-y border-gray-300 bg-white dark:bg-gray-800 p-4 rounded-md h-fit`} style={{ scrollMarginTop: '80px', scrollBehavior: 'smooth' }}>
            <div className="border-b border-gray-300 dark:bg-gray-800 pb-4 mb-2">
                <div className="flex flex-nowrap items-center">
                    <h2 className='font-bold text-xl text-center p-2 w-full'>{tableOfContent?.contentTitle || 'Contents'}</h2>
                    <span onClick={handlePin} className="cursor-pointer p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md">
                        {isPinned ? <LuPinOff className="inline" /> : <LuPin className="inline" />}
                    </span>
                </div>
            </div>
            <div className="w-full">
                <ul>
                    {
                        (tableOfContent ? tableOfContent.listItems : []).map((child, index) => {
                            return generateHeading(child, index, activeId, handleOnLinkClick);
                        })
                    }
                </ul>
            </div>
        </aside>
    )
}

export default TableOfContent