import config from "@/payload.config";
import { ContactUs } from '@frontend/blocks/ContactUs';
import MKAltCard from '@frontend/components/MKAltCard';
import { getLexicalText } from '@frontend/utils/getLexicalText';
import lexicalHeadingRenderer from "@frontend/utils/lexicalHeadingRenderer";
import { readingTime } from '@frontend/utils/readtime';
import { RichText } from '@payloadcms/richtext-lexical/react';
import Image from 'next/image';
import { getPayload } from 'payload';
import { BsStopwatch } from 'react-icons/bs';
import NotFound from '@frontend/blocks/NotFound';
import TableOfContent from "@frontend/components/TableOfContent";
import { extractHeadingsFromLexical } from "@frontend/utils/extractHeadingsFromLexical";
import BlogLatest from "./BlogLatest";

interface BlogPageProps {
    params: { slug: string } | Promise<{ slug: string }>;
}

const BlogPage = async ({ params }: BlogPageProps) => {

    try {
        const { slug } = await params;
        if (!slug || slug === '') {
            return (<>
                <NotFound page="Blog Post" />
            </>)
        }

        const payload = await getPayload({ config });

        const blogCollection = await payload.find({
            collection: 'blogs',
            where: {
                slug: { equals: slug }
            },
            limit: 1,
        });

        const latestBlogCollection = await payload.find({
            collection: 'blogs',
            sort: '-createdAt',
            limit: 5,
        });

        const blog = blogCollection?.docs?.[0];

        if (!blog) {
            return (<>
                <NotFound page="Blog Post" />
            </>)
        }

        const socialsResult = await payload.find({
            collection: 'socials',
            limit: 100,
        });

        const socials = socialsResult?.docs || [];
        const latestBlogs = latestBlogCollection?.docs || [];

        const toc = extractHeadingsFromLexical(blog.content)

        return (
            <div className='mt-4 w-full px-2 md:px-4'>
                {
                    blog && (<>
                        <MKAltCard
                            className={`relative w-full h-80 md:h-150 mb-12`}
                        >
                            {(blog.banner && (typeof blog.banner === 'object' && blog.banner !== null && 'url' in blog.banner)) ? (
                                <Image
                                    src={`${blog.banner.url}`}
                                    alt={`Banner image for ${blog.banner.alt}`}
                                    width={blog.banner.width || 1920}
                                    height={blog.banner.height || 1080}
                                    className='w-full h-full object-cover'
                                    loading="lazy"
                                    placeholder="blur"
                                    blurDataURL={`${blog.banner.thumbnailURL || "/default-banner.png"}`}
                                />
                            ) : null}
                            <div className="absolute left-0 top-0 z-1 p-4 h-full w-full flex flex-col gap-4 justify-end px-2 md:px-16 bg-[rgba(0,0,0,0.5)]">
                                <span className="w-fit h-fit p-4">
                                    <h1 className="text-gray-50 md:text-8xl sm:text-5xl text-4xl font-semibold line-clamp-1">{blog.title}</h1>
                                    {blog.summary ? <p className="text-gray-50 sm:text-3xl text-2xl my-4 overflow-hidden wrap-break-words line-clamp-3">{blog.summary}</p> : null}
                                    <p className="flex items-center gap-2 text-white sm:text-2xl text-xl font-light">
                                        <span><BsStopwatch /></span>
                                        <span>{`${readingTime(getLexicalText(blog.content) || '').toString()} min read`}</span>
                                    </p>
                                </span>
                            </div>
                        </MKAltCard>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 p-4">
                            <div className="w-full md:col-span-2 space-y-4 text-lg">
                                <RichText
                                    className='rich-text'
                                    data={blog.content}
                                    converters={({ defaultConverters }) => ({
                                        ...defaultConverters,
                                        heading: lexicalHeadingRenderer
                                    })}
                                />
                            </div>

                            <div className="w-full md:col-span-1 flex flex-col items-center gap-8">
                                <TableOfContent tableOfContent={{
                                    contentTitle: 'Contents',
                                    listItems: toc
                                }} />
                                <ContactUs apiEndpoint="/api/contact" socials={socials} />
                                <BlogLatest blogs={latestBlogs} />
                            </div>
                        </div>
                    </>)
                }
            </div >
        )
    }
    catch (error) {
        console.error(error);
        return (<>Unknown Error</>)
    }
}




export default BlogPage