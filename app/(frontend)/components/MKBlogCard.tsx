import Image from 'next/image';
import { Card } from './Card';
import { LuShare2 } from 'react-icons/lu';
import { BiLike } from 'react-icons/bi';
import { dateFormatOptions } from '@frontend/utils/date-time';
import Link from 'next/link';

interface MKBlogCardProps {
    title?: string;
    bannerImage?: string;
    description?: string;
    redirectUrl?: string;
    author?: {
        name: string;
        avatar: string;
    };
    date?: Date;
    readTime?: string;
}

const MKBlogCard = ({
    title,
    bannerImage,
    description,
    redirectUrl = "#",
    author,
    date,
    readTime
}: MKBlogCardProps) => {
    return (
        <Card className='flex flex-col w-full gap-4 p-0! rounded-2xl! overflow-hidden'>
            <div className='w-full h-64 overflow-hidden flex'>
                {bannerImage ? (
                    <Image
                        src={bannerImage}
                        alt={title || 'Blog post banner'}
                        width={720}
                        height={512}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 ease-in-out"
                    />
                ) : (
                    <div className='bg-gray-200 w-full h-48 dark:bg-gray-700 flex items-center justify-center'>
                        <span className='text-gray-500 dark:text-gray-400'>No Image Available</span>
                    </div>
                )}
            </div>
            <div className='px-4 pb-4 flex flex-col justify-between gap-2'>
                <h2 className='text-xl font-semibold'>{title || 'Untitled'}</h2>
                <div className='w-full flex items-center gap-2'>
                    {author && (
                        <div className='flex items-center gap-2'>
                            <Image src={author.avatar || '/default-user.jpg'} alt={author.name} width={32} height={32} className='w-8 h-8 rounded-full' />
                            <span className='text-lg font-semibold'>{author.name}</span>
                        </div>
                    )}
                    <div className='flex-1 h-px bg-gray-200 dark:bg-gray-500' />
                </div>
                <p className='w-full text-sm md:text-lg text-gray-700 dark:text-gray-400 line-clamp-3'>
                    {description || 'No description available.'}
                </p>
                <div className='flex justify-between'>
                    <Link className='py-1 px-2 border border-primary-800 text-primary-800 decoration-0 rounded-2xl hover:bg-primary-800 hover:text-white dark:text-primary-400 dark:border-primary-400 transition-all duration-300 ease-in-out' href={redirectUrl}>Read More</Link>
                    <div className='text-gray-600 dark:text-gray-400 text-sm'>
                        {date?.toLocaleDateString('en-US', dateFormatOptions)} · {readTime || '—'}
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default MKBlogCard