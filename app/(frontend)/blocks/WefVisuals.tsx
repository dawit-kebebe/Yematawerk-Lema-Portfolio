import React from 'react';
import Section from '../components/motion/Section';
import SectionTitle from '../components/SectionTitle';
import { WefVisualsType } from '../types/blocks/WefVisuals';
import Div from '../components/motion/Div';
import Link from 'next/link';
import { RichText } from '@payloadcms/richtext-lexical/react';
import lexicalHeadingRenderer from '../utils/lexicalHeadingRenderer';
import WefBirdAnimation from '../components/WefBirdAnimation';

interface WefVisualsProps {
    className?: string;
    data: WefVisualsType;
}

const WefVisuals = ({ className = '', data }: WefVisualsProps) => {
    return (
        <Section
            className={`py-8 px-4 md:px-8 2xl:px-16 ${className}`}
            aria-label="Wef Visuals Section"
            id={`${data.blockType}`}
        >
            <SectionTitle title={data.section_title || 'Wef Visuals'} />
            <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto my-8 md:my-12 gap-8 md:gap-12">
                {/* Left Column: Title, CMS Description & CTA */}
                <Div
                    initial={{ x: -40, opacity: 0 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="w-full md:w-1/2 flex flex-col items-start space-y-4"
                >
                    <h1 className="text-2xl md:text-3xl font-bold text-heading">
                        {data.title}
                    </h1>
                    <RichText
                        className="rich-text text-justify"
                        data={data.description}
                        converters={({ defaultConverters }) => ({
                            ...defaultConverters,
                            heading: lexicalHeadingRenderer
                        })}
                    />
                    {data.cta && data.cta.url && (
                        <Link
                            className="inline-block text-center text-primary-800 dark:text-primary-500 hover:underline underline-offset-4"
                            href={data.cta.url}
                        >
                            {data.cta.label}
                        </Link>
                    )}
                </Div>

                {/* Right Column: CMS Image (if provided) & Flapping Bird SVG Animation */}
                <Div
                    initial={{ x: 40, opacity: 0 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="w-full md:w-1/2 flex flex-col items-center justify-center"
                >
                    {/* {data.image && data.image.url ? (
                        <div className="relative w-full max-w-md h-64 md:h-80 rounded-2xl overflow-hidden shadow-md mb-6">
                            <Image
                                src={data.image.url}
                                alt={data.image.alt || data.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                    ) : null} */}

                    {/* Animated Bird using user's Bird.svg */}
                    <div className="flex items-center justify-center p-4">
                        <WefBirdAnimation size={200} />
                    </div>
                </Div>
            </div>
        </Section>
    );
};

export default WefVisuals;