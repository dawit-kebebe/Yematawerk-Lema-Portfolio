"use client";

import { ImagePortfolio } from '@/payload-types';
import Masonry, { ResponsiveMasonry } from 'react-masonify';
import Div from '@frontend/components/motion/Div';
import Section from '@frontend/components/motion/Section';
import { GalleryItem } from '@frontend/types/GalleryItem';
import GalleryItemRenderer from '@frontend/utils/galleryItemRenderer';

interface MasonrySectionProps {
    data: ImagePortfolio[];
    className?: string;
}

const MasonrySection = ({ data, className }: MasonrySectionProps) => {

    const portfolioData = data.filter(item => item.image && typeof item.image !== 'string');

    return (
        <Section className={`py-8 px-4 md:px-8 2xl:px-16 ${className}`} aria-label="Portfolio Highlights Section">
            <div className='w-full gap-8'>
                <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2 }}>
                    {/* **OPTIMIZATION 2: Render the Masonry component only once.**
                        Instead of conditionally rendering three separate Masonry blocks (which re-renders the whole component unnecessarily when switching tabs), we use the pre-filtered array and a single Masonry. 
                        This avoids unnecessary DOM manipulation and component instantiation.
                        900: 3
                    */}
                    <Masonry gap="2rem">
                        {
                            portfolioData.map((portfolio, index: number) => (
                                <Div
                                    className="relative w-full h-auto cursor-pointer"
                                    whileHover="hover"
                                    initial="rest"
                                    animate="rest"
                                    whileInView="rest"
                                    key={`${portfolio.id}`}
                                >
                                    <GalleryItemRenderer key={index} item={portfolio.image as GalleryItem} index={index} />
                                    <Div
                                        className="absolute bottom-0 left-0 w-full p-4 backdrop-blur-2xl rounded-b-2xl bg-primary-900/30"
                                        variants={{
                                            rest: { opacity: 0, y: 20 },
                                            hover: { opacity: 1, y: 0, transition: { duration: 0.3 } }
                                        }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <h3 className="text-xl font-semibold">{portfolio.title}</h3>
                                        <p className="text-md mt-2">{portfolio.description}</p>
                                    </Div>
                                </Div>
                            ))
                        }
                    </Masonry>
                </ResponsiveMasonry>
            </div>
        </Section>
    )
}

export default MasonrySection