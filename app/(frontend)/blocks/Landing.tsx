import { LandingType } from '@/app/(frontend)/types/blocks/Landing'
import { Button } from 'flowbite-react'
import Image from 'next/image'
import Link from 'next/link'
import LandingHighlight from '../components/motion/LandingHighlight'
import Section from '../components/motion/Section'

interface LandingProps {
    data: LandingType;
    className?: string;
}

const Landing = ({ data, className }: LandingProps) => {
    return (
        <Section className={`w-full pb-4 md:pb-8 flex flex-wrap items-center justify-center px-4 md:px-8 2xl:px-16 overflow-hidden ${className}`} aria-label="Landing Section" id={`${data.blockType}`}>
            <div className='md:w-1/2 md:h-full h-fit col-span-1 flex flex-col md:justify-center space-y-6'>
                <h1 className='font-michroma text-center md:text-left text-4xl md:text-6xl lg:text-8xl text-primary-700 dark:text-primary-600'>{data.title}</h1>
                <p className='text-2xl text-center md:text-left md:text-3xl max-w-3xl'>{data.description}</p>
                <div className='flex justify-center md:justify-start space-x-4 w-full'>
                    <Link href={data.cta_button_1.url}><Button className="text-xl md:text-3xl py-8 cursor-pointer">{data.cta_button_1.label}</Button></Link>
                    {data.cta_button_2 && (
                        <Link href={data.cta_button_2.url}><Button className="text-xl md:text-3xl py-8 cursor-pointer border border-primary-700 dark:border-primary-600" color={'alternative'}>{data.cta_button_2.label}</Button></Link>
                    )}
                </div>
            </div>
            <div className='col-span-1 relative w-full md:w-1/2 h-[70vh] md:h-[90vh]'>
                <div className='relative w-full h-full'>
                    <Image src={data.hero_img.url} fill alt={data.hero_img.alt || "Landing Image"} className='w-full object-contain' />
                </div>
                <div className='absolute z-10 bottom-0 flex flex-col gap-8 w-full'>
                    <div className='w-full flex justify-between gap-2 md:gap-8'>
                        <LandingHighlight initial={{ opacity: 0, x: -30 }} className='w-full px-8 py-4 text-primary-800 dark:text-primary-950 text-sm md:text-2xl max-w-64 flex items-center justify-center text-center dark:bg-primary-300 bg-primary-200 rounded-lg hover:shadow-lg transition-shadow duration-300'>{data.highlight_top_left}</LandingHighlight>
                        <LandingHighlight className='w-full px-8 py-4 text-primary-800 dark:text-primary-950 text-sm md:text-2xl max-w-64 flex items-center justify-center text-center dark:bg-primary-300 bg-primary-200 rounded-lg hover:shadow-lg transition-shadow duration-300'>{data.highlight_bottom_left}</LandingHighlight>
                    </div>
                    <div className='w-full flex justify-center gap-2 md:gap-8'>
                        <LandingHighlight initial={{ opacity: 0, x: -30 }} className='w-full px-8 py-4 text-primary-800 dark:text-primary-950 text-sm md:text-2xl max-w-64 flex items-center justify-center text-center dark:bg-primary-300 bg-primary-200 rounded-lg hover:shadow-lg transition-shadow duration-300'>{data.highlight_top_right}</LandingHighlight>
                        <LandingHighlight className='w-full px-8 py-4 text-primary-800 dark:text-primary-950 text-sm md:text-2xl max-w-64 flex items-center justify-center text-center dark:bg-primary-300 bg-primary-200 rounded-lg hover:shadow-lg transition-shadow duration-300'>{data.highlight_bottom_right}</LandingHighlight>
                    </div>
                </div>

            </div>
        </Section>

    )
}

export default Landing