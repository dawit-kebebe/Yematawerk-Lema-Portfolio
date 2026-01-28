"use client";

import { ArrowRightIcon, Button, Card } from 'flowbite-react';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import Map from '../assets/Map';
import SectionTitle from '../components/SectionTitle';
import Section from '../components/motion/Section';
import { NormalizedYamiTourType, YamiTourType } from '../types/blocks/YamiTour';
import Div from '../components/motion/Div';
import { scale } from 'motion/react';

interface YamiTourProps {
    className?: string;
    data: YamiTourType
}

const YamiTour = ({ className, data }: YamiTourProps) => {
    const [positioningFactor, setPositioningFactor] = useState(0.1);
    const safePoints = [0.63, 0.79, 0.38, 0.98, 0.15, 0.05];
    const [tours, setTours] = useState<NormalizedYamiTourType[]>([]);
    const [currentTourIndex, setCurrentTourIndex] = useState<number>(0);


    useEffect(() => {
        const tours = data.tours.map((tour, index) => {
            let pinPoint = 0;
            if (index > 5) {
                pinPoint = Number(Math.random().toFixed(2)) || 0;
                return { ...tour, pinPoint };
            }

            pinPoint = safePoints[index] || 0;
            return { ...tour, pinPoint };
        });

        setTours(tours);
        setPositioningFactor(tours[0]?.pinPoint || 0);
    }, [data, setTours]);

    const nextTourHandler = useCallback(() => {
        const nextIndex = (currentTourIndex + 1) % tours.length;
        const nextTour = tours[nextIndex];
        setPositioningFactor(nextTour.pinPoint);
        setCurrentTourIndex(nextIndex);
    }, [currentTourIndex, tours]);

    return (
        <Section className={`w-full mt-8 overflow-y-hidden md:max-h-[95vh] pb-4 md:pb-8 flex flex-wrap items-center justify-center px-4 md:px-8 2xl:px-16 ${className}`} aria-label="Yami Tour Section">
            <SectionTitle title={`${data.section_title || 'Yami Tour'}`} />
            <div className='w-full h-full grid grid-cols-1 md:grid-cols-2 gap-8 mt-8'>
                <div className='w-full h-full'>
                    <Map pinPoint={positioningFactor} className='w-full h-full object-contain' />
                </div>
                <div className='w-full h-full flex flex-wrap-reverse md:flex-nowrap relative'>
                    <Card className='hidden md:flex w-full md:self-center md:-translate-x-1/2 absolute z-2 '>
                        {tours.length > 0 &&
                            (<Div
                                key={`description-${tours[currentTourIndex].id}`}
                                initial={{ opacity: 0, scale: 0.90 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                                className='w-full text-gray-900 dark:text-white'>
                                {tours[currentTourIndex].tour_description}
                            </Div>)}

                        <Button onClick={nextTourHandler} className='self-end rounded-full w-fit cursor-pointer'><ArrowRightIcon /></Button>
                    </Card>
                    <div className='w-full flex flex-col md:hidden p-4 absolute z-2 bg-transparent dark:bg-transparent backdrop-blur-2xl text-white md:text-gray-900 md:bg-white md:dark:bg-gray-800'>
                        {tours.length > 0 && (<>{tours[currentTourIndex].tour_description}</>)}

                        <Button onClick={nextTourHandler} className='self-end rounded-full w-fit cursor-pointer'><ArrowRightIcon /></Button>
                    </div>
                    <Div
                        key={`image-${tours[currentTourIndex]?.id || 0}`}
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.3 }}
                        className='md:absolute w-full h-full overflow-hidden md:z-0'>
                        {tours.length > 0 &&
                            tours[currentTourIndex] &&
                            <Image
                                src={tours[currentTourIndex].image.url}
                                width={tours[currentTourIndex].image.width}
                                height={tours[currentTourIndex].image.height}
                                alt={tours[currentTourIndex].image.alt}
                                className='object-contain object-center w-full h-auto ' />
                        }
                    </Div>
                </div>
            </div>

        </Section>
    )
}

export default YamiTour