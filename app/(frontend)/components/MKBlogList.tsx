"use client";

import { dateFormatOptions } from '@frontend/utils/date-time';
import { ListItem } from "flowbite-react";
import Image from 'next/image';
import Link from 'next/link';
import { HiDotsHorizontal } from 'react-icons/hi';

export interface MKBlogListProps {
    index?: number;
    author?: {
        name: string;
        avatar: string;
    };
    date?: Date;
    readTime?: string;
    title?: string;
    category?: string;
    bannerUrl?: string;
    description?: string;
    readmoreUrl?: string;
}

// interface MKBlogListProps {
//     item: Blog;
// }

export function MKBlogList({
    index,
    author,
    date,
    readTime,
    readmoreUrl,
    title,
    category,
    bannerUrl,
    description
}: MKBlogListProps) {
    // if (!blogs || blogs.length === 0) {
    //     return <p role="alert" className="text-sm text-gray-700">Not found.</p>;
    // }

    return (<>
        {/* {blogs.map((blog, index) => ( */}
        <ListItem className="py-3 sm:py-4 cursor-pointer" onClick={() => {
            if (readmoreUrl) {
                window.location.href = readmoreUrl;
            }
        }}>
            <article aria-labelledby={`blog-title-${index}`} className="flex px-2 gap-4 items-center space-x-4 rtl:space-x-reverse">
                <div className="min-w-0 flex-1 flex flex-col gap-2">
                    <div className='flex flex-nowrap items-center gap-4 text-gray-600 dark:text-gray-400 text-sm'>
                        {author && (
                            <span className='flex items-center'>
                                <Image src={author.avatar || '/default-user.jpg'} alt={author.name} width={32} height={32} className='w-8 h-8 rounded-full' />
                                <span className='ml-2 text-lg '>{author.name}</span>
                            </span>
                        )}
                        {date?.toLocaleDateString('en-US', dateFormatOptions)}
                    </div>
                    <h2 id={`blog-title-${index}`} className="truncate text-lg font-semibold text-gray-900 dark:text-gray-300">
                        {title}
                    </h2>
                    <p className="text-lg text-gray-800 dark:text-gray-400">
                        {description}
                    </p>
                    <div className="flex flex-nowrap justify-between gap-4 mt-2">
                        <span className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            {
                                category &&
                                <span className='bg-gray-200 py-0.5 px-2 rounded-xl'>
                                    {category}
                                </span>
                            }
                            <span>
                                {readTime || '—'}
                            </span>
                        </span>
                        <span>
                            <Link
                                href={readmoreUrl || "#"}
                                className="text-2xl"
                                title={title ? `Read more about ${title}` : "Read more"}
                                aria-label={title ? `Read more about ${title}` : "Read more"}>
                                <HiDotsHorizontal />
                            </Link>
                        </span>
                    </div>
                </div>
                <div className="hidden md:inline-flex items-center text-base font-semibold text-gray-900">
                    <Image
                        src={bannerUrl || "/default-banner.png"}
                        alt={title ? `${title} banner` : "Blog banner"}
                        width={300}
                        height={300}
                        className="w-46 rounded-lg object-cover"
                        loading="lazy"
                    // placeholder="blur"
                    // blurDataURL={bannerUrl}
                    />
                </div>
            </article>
        </ListItem>
        {/* ))} */}
        {/*  <List unstyled className="max-w-full h-full overflow-y-auto divide-y divide-gray-200 font-base" role="list"> */}
        {/* </List> */}
    </>
    );
}

export default MKBlogList;
