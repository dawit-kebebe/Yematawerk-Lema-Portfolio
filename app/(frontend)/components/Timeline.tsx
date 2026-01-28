
"use client";

import {
    Timeline as FlowbiteTimeline,
    TimelineBody,
    TimelineContent,
    TimelineItem,
    TimelinePoint,
    TimelineTime,
    TimelineTitle
} from "flowbite-react";
import { HiCalendar } from "react-icons/hi";
import { TimelineType } from "../types/blocks/About";

interface TimelineProps {
    className?: string;
    data: TimelineType[];
}

export function Timeline({ className, data }: TimelineProps) {
    return (
        <FlowbiteTimeline>
            {data.map((item, index) => (
                <TimelineItem key={`timeline-item-${index}`}>
                    <TimelinePoint icon={HiCalendar} />
                    <TimelineContent>
                        <TimelineTime>{item.date}</TimelineTime>
                        <TimelineTitle>{item.title}</TimelineTitle>
                        <TimelineBody>
                            {item.description}
                        </TimelineBody>
                    </TimelineContent>
                </TimelineItem>
            ))}
        </FlowbiteTimeline>

        // <ol className="relative border-s border-default">
        //     <li className="mb-10 ms-6">
        //         <span className="absolute flex items-center justify-center w-6 h-6 bg-brand-softer rounded-full -start-3 ring-8 ring-buffer">
        //             <svg className="w-3 h-3 text-fg-brand-strong" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z" /></svg>
        //         </span>
        //         <time className="bg-neutral-secondary-medium border border-default-medium text-heading text-xs font-medium px-1.5 py-0.5 rounded">March 13th, 2025</time>
        //         <h3 className="flex items-center mb-1 text-lg font-semibold text-heading my-2">Flowbite Application UI v2.0.0 <span className="ms-2 bg-brand-softer border border-brand-subtle text-fg-brand-strong text-xs font-medium px-1.5 py-0.5 rounded">Latest</span></h3>
        //         <p className="mb-4 text-body">Get access to over 20+ pages including a dashboard layout, charts, kanban board, calendar, and pre-order E-commerce & Marketing pages.</p>
        //         <a href="#" className="inline-flex items-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">
        //             <svg className="w-4 h-4 me-1.5 -ms-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M10 3v4a1 1 0 0 1-1 1H5m14-4v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1Zm-4 1h.01v.01H15V5Zm-2 2h.01v.01H13V7Zm2 2h.01v.01H15V9Zm-2 2h.01v.01H13V11Zm2 2h.01v.01H15V13Zm-2 2h.01v.01H13V15Zm2 2h.01v.01H15V17Zm-2 2h.01v.01H13V19Z" /></svg>
        //             Download ZIP
        //         </a>
        //     </li>
        //     <li className="mb-10 ms-6">
        //         <span className="absolute flex items-center justify-center w-6 h-6 bg-brand-softer rounded-full -start-3 ring-8 ring-buffer">
        //             <svg className="w-3 h-3 text-fg-brand-strong" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z" /></svg>
        //         </span>
        //         <time className="bg-neutral-secondary-medium border border-default-medium text-heading text-xs font-medium px-1.5 py-0.5 rounded">January 09th, 2025</time>
        //         <h3 className="my-2 text-lg font-semibold text-heading">Flowbite Figma v1.3.0</h3>
        //         <p className="text-body">All of the pages and components are first designed in Figma and we keep a parity between the two versions even as we update the project.</p>
        //     </li>
        //     <li className="ms-6">
        //         <span className="absolute flex items-center justify-center w-6 h-6 bg-brand-softer rounded-full -start-3 ring-8 ring-buffer">
        //             <svg className="w-3 h-3 text-fg-brand-strong" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z" /></svg>
        //         </span>
        //         <time className="bg-neutral-secondary-medium border border-default-medium text-heading text-xs font-medium px-1.5 py-0.5 rounded">October 14th, 2024</time>
        //         <h3 className="my-2 text-lg font-semibold text-heading">Flowbite Library v1.2.2</h3>
        //         <p className="text-body">Get started with dozens of web components and interactive elements built on top of Tailwind CSS.</p>
        //     </li>
        // </ol>


    );
}
export default Timeline;