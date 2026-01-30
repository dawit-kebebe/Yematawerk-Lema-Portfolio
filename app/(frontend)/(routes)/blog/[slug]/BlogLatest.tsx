import { Blog } from '@/payload-types';
import { dateFormatOptions } from '@frontend/utils/date-time';
import { readingTime } from '@frontend/utils/readtime';
import Image from 'next/image';
import { getLexicalText } from '@frontend/utils/getLexicalText';
import SectionTitle from '@frontend/components/SectionTitle';

interface BlogLatestProps {
    blogs: Blog[];
}

const BlogLatest = ({ blogs }: BlogLatestProps) => {
    return (
        <div className="max-w-md w-full h-full overflow-y-auto font-base" role="list">
            <div className="py-4 w-full flex flex-col">
                <SectionTitle title={'The Latest Blogs'} />
            </div>
            {blogs.map((blog, index) => (
                <div key={`blog-latest-${blog.id}`} className="relative h-fit py-4">
                    <a href={`/blog/${blog.slug}`} className="relative w-full flex flex-col gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 ease-in">
                        {index === 0 && (<div className="w-full max-h-48 shrink-0 overflow-hidden">
                            {(blog.banner && (typeof blog.banner === 'object' && blog.banner !== null && 'url' in blog.banner)) ? (<Image
                                width={200}
                                height={150}
                                src={blog.banner.url || 'default-banner.png'}
                                alt={blog.banner.alt || blog.title}
                                className="w-full h-full object-cover"
                            />) : null}
                        </div>)}
                        <div className={`w-full h-full flex flex-col justify-center px-4 ${index === 0 ? 'text-white absolute top-0 left-0 z-2 bg-[rgba(0,0,0,0.5)]' : ''}`}>
                            <p className='text-md font-semibold line-clamp-4'>{blog.summary}</p>
                            <div className='flex gap-2 text-md font-light mt-4'>
                                <span>
                                    {new Date(blog.createdAt)?.toLocaleDateString('en-US', dateFormatOptions)}
                                </span>
                                <span>
                                    —
                                </span>
                                <span>
                                    {`${readingTime(getLexicalText(blog.content)).toString()} min read`}
                                </span>
                            </div>
                        </div>
                    </a>
                </div>
            ))}
        </div>
    )
}

export default BlogLatest