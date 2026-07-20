import React from 'react'
import Section from '../components/motion/Section';
import SectionTitle from '../components/SectionTitle';
import { WefVisualsType } from '../types/blocks/WefVisuals';
import Div from '../components/motion/Div';
import Link from 'next/link';
import Image from 'next/image';
import { RichText } from '@payloadcms/richtext-lexical/react';
import lexicalHeadingRenderer from '../utils/lexicalHeadingRenderer';

interface WefVisualsProps {
    className?: string;
    data: WefVisualsType;
}

const WefVisuals = ({ className, data }: WefVisualsProps) => {
    return (
        <>
            <Section className={`py-8 px-4 md:px-8 2xl:px-16 ${className}`} aria-label="About Me Section" id={`${data.blockType}`}>
                <SectionTitle title={data.section_title || 'Businesses'} />
                <div className="flex flex-wrap md:flex-nowrap max-w-7xl mx-auto my-8 md:my-12">
                    <Div
                        initial={{ x: -40, opacity: 0 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="w-full md:h-full">
                        <h1 className="text-2xl font-bold text-heading">
                            {data.title}
                        </h1>
                    </Div>
                    <Div
                        initial={{ x: 40, opacity: 0 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="w-full md:h-full">
                        <RichText
                            className='rich-text text-justify'
                            data={data.description}
                            converters={({ defaultConverters }) => ({
                                ...defaultConverters,
                                heading: lexicalHeadingRenderer
                            })}
                        />
                        <Link className='inline-block text-center text-primary-800 dark:text-primary-500 hover:underline underline-offset-4' href={data.cta.url}>{data.cta.label}</Link>
                    </Div>
                </div>
            </Section>
        </>
    )
}

export default WefVisuals