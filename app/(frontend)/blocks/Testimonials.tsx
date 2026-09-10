import React from 'react';
import SectionTitle from '../components/SectionTitle';
import TestimonialCard from '../components/TestimonialCard';
import { TestimonialsType } from '../types/blocks';
import Section from '../components/motion/Section';

interface TestimonialsProp {
    data: TestimonialsType;
    className?: string;
}

const Testimonials = ({ data, className = '' }: TestimonialsProp) => {
    return (
        <Section
            className={`py-8 px-4 md:px-8 2xl:px-16 ${className}`}
            aria-label="Testimonials Section"
            id={`${data.blockType}`}
        >
            <SectionTitle title={data.section_title} />
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 items-stretch max-w-7xl mx-auto py-10 md:py-14">
                {data.testimonials && data.testimonials.length > 0
                    ? data.testimonials.map((testimonial, index) => (
                          <TestimonialCard
                              key={testimonial.id || index}
                              name={testimonial.name}
                              position={testimonial.position}
                              quote={testimonial.quote}
                              reference_url={testimonial.reference_url}
                              avatar={testimonial.avatar}
                              index={index}
                          />
                      ))
                    : null}
            </div>
        </Section>
    );
};

export default Testimonials;