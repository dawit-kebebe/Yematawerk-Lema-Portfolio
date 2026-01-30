"use client";

import { Button } from 'flowbite-react';
import Link from 'next/link';
import Masonry, { ResponsiveMasonry } from 'react-masonify';
import SectionTitle from '../components/SectionTitle';
import type { ImagePortfolioType } from '../types/blocks/ImagePortfolio';
import GalleryItemRenderer from '../utils/galleryItemRenderer';
import Section from '../components/motion/Section';

interface ImagePortfolioHighlightProps {
    data: ImagePortfolioType;
    className?: string;
}

const ImagePortfolioHighlight = ({ data, className }: ImagePortfolioHighlightProps) => {
    return (
        <Section className={`py-8 px-4 md:px-8 2xl:px-16 ${className}`} aria-label="Portfolio Highlights Section" id={`${data.blockType}`}>
            <SectionTitle title={data.section_title || 'My Selected Works'} />
            <div className='w-full gap-8 py-16'>
                <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2 }}>
                    {/* **OPTIMIZATION 2: Render the Masonry component only once.**
                        Instead of conditionally rendering three separate Masonry blocks (which re-renders the whole component unnecessarily when switching tabs), we use the pre-filtered array and a single Masonry. 
                        This avoids unnecessary DOM manipulation and component instantiation.
                        900: 3
                    */}
                    <Masonry gap="2rem">
                        {
                            data.portfolio_imgs.map((image, index: number) => (
                                <GalleryItemRenderer key={index} item={image} index={index} />
                            ))
                        }
                    </Masonry>
                </ResponsiveMasonry>
            </div>
            <div className='flex justify-center'>
                {data.cta && <Link href={data.cta.url}><Button className="text-xl md:text-3xl py-8 cursor-pointer">{data.cta.label}</Button></Link>}
            </div>
        </Section>
    )
}
// Tedros Afewerk - Sahile Mariam - Asegedech
export default ImagePortfolioHighlight