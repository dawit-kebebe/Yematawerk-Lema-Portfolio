"use client";

import React, { useState } from 'react';
import SectionTitle from '../components/SectionTitle';
import TestimonialCard from '../components/TestimonialCard';
import { TestimonialsType } from '../types/blocks';
import Section from '../components/motion/Section';

interface TestimonialsProp {
    data: TestimonialsType;
    className?: string;
}

const INITIAL_VISIBLE_COUNT = 3;

const Testimonials = ({ data, className = '' }: TestimonialsProp) => {
    const [isBlockExpanded, setIsBlockExpanded] = useState(false);

    const testimonialsList = data.testimonials || [];
    const hasMore = testimonialsList.length > INITIAL_VISIBLE_COUNT;
    const visibleTestimonials = isBlockExpanded
        ? testimonialsList
        : testimonialsList.slice(0, INITIAL_VISIBLE_COUNT);

    return (
        <Section
            className={`py-8 px-4 md:px-8 2xl:px-16 ${className}`}
            aria-label="Testimonials Section"
            id={`${data.blockType}`}
        >
            <SectionTitle title={data.section_title} />
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 items-stretch max-w-7xl mx-auto py-10 md:py-14">
                {visibleTestimonials.map((testimonial, index) => (
                    <TestimonialCard
                        key={testimonial.id || index}
                        name={testimonial.name}
                        position={testimonial.position}
                        quote={testimonial.quote}
                        reference_url={testimonial.reference_url}
                        avatar={testimonial.avatar}
                        index={index}
                    />
                ))}
            </div>

            {hasMore && (
                <div className="flex justify-center -mt-4 mb-4">
                    <button
                        onClick={() => setIsBlockExpanded(!isBlockExpanded)}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-primary-600 dark:border-primary-500 text-primary-800 dark:text-primary-400 hover:bg-primary-600 hover:text-white dark:hover:bg-primary-500 dark:hover:text-white font-semibold text-sm transition-all duration-300 shadow-sm cursor-pointer"
                    >
                        <span>{isBlockExpanded ? 'See Less Testimonials' : 'See More Testimonials'}</span>
                        <svg
                            className={`w-4 h-4 transition-transform duration-300 ${isBlockExpanded ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </div>
            )}
        </Section>
    );
};

export default Testimonials;