import Image from 'next/image'
import React from 'react'
import Div from './motion/Div';

interface TestimonialCardProps {
    quote: string;
    name: string;
    position: string;
    avatar: {
        alt: string;
        filename: string;
        mimeType: string;
        filesize: number;
        width: number;
        height: number;
        focalX: number;
        focalY: number;
        url: string;
        thumbnailURL: string | null;
    }
}

const TestimonialCard = ({ quote, name, position, avatar }: TestimonialCardProps) => {
    return (
        <Div className='flex flex-col items-center pt-12.5'>
            <div className='border-2 border-gray-300 dark:border-gray-600 rounded-lg px-6'>
                <Image src={avatar.url} width={100} height={100} alt={avatar.alt} className='justify-self-center rounded-full -translate-y-[50%]' />
                <div className='-translate-y-12.5'>
                    <p className='mt-4 text-lg italic'>"{quote}"</p>
                    <h3 className='mt-2 font-bold text-xl'>{name}</h3>
                    <span className='text-gray-500'>{position}</span>
                </div>
            </div>
        </Div>
    )
}

export default TestimonialCard