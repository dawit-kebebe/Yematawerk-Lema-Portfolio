import React from 'react'
import SectionTitle from '../components/SectionTitle'
import TestimonialCard from '../components/TestimonialCard'
import { TestimonialsType } from '../types/blocks'
import Section from '../components/motion/Section';

interface TestimonialsProp {
    data: TestimonialsType;
    className?: string;
}

const Testimonials = ({ data, className }: TestimonialsProp) => {
    return (
        <Section className={`py-8 px-4 md:px-8 2xl:px-16 ${className}`} aria-label="Testimonials Section" id={`${data.blockType}`}>
            <SectionTitle title={data.section_title} />
            <div className='flex flex-wrap gap-4 py-16'>
                {
                    (data.testimonials.map(testimonial => (
                        <TestimonialCard
                            key={testimonial.id}
                            name={testimonial.name}
                            position={testimonial.position}
                            quote={testimonial.quote}
                            avatar={testimonial.avatar} />
                    )))
                }
            </div>
        </Section>
    )
}

export default Testimonials