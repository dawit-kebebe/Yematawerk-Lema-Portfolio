import React from 'react';
import { List, ListItem } from "flowbite-react";
import Image from 'next/image';
import Link from 'next/link';

interface BlogCategory {
    title: string;
    categoryId: string;
}

export interface Blog {
    id: string,
    createdAt: string,
    title: string,
    description?: string,
    content: string,
    slug: string,
    banner: {
        formats: {
            large: {
                url: string,
                width: number,
                height: number,
            }
        },
        url: string
    }
    main_blog_category: BlogCategory
}

interface BlogListProps {
    blogs: Blog[];
}

export function BlogList({ blogs }: BlogListProps) {
    if (!blogs || blogs.length === 0) {
        return <p role="alert" className="text-sm text-gray-700">Not found.</p>;
    }

    return (
        <List unstyled className="max-w-full h-full overflow-y-auto divide-y divide-gray-200 font-base" role="list">
            {blogs.map((blog, index) => (
                <ListItem key={index} className="py-3 sm:py-4" onClick={() => {
                    if (blog.slug) {
                        window.location.href = `${blog.slug}`;
                    }
                }}>
                    <article aria-labelledby={`blog-title-${index}`} className="flex px-2 items-center space-x-4 rtl:space-x-reverse">
                        {/* <Avatar 
                            img={blog.bannerUrl} 
                            alt={blog.title ? `${blog.title} banner` : "Blog banner"} 
                            size="md" 
                        /> */}
                        <Image
                            src={(blog.banner.formats.large?.url || blog.banner.url) || "/default-banner.png"}
                            alt={blog.title ? `${blog.title} banner` : "Blog banner"}
                            width={100}
                            height={100}
                            className="h-16 w-16 rounded-lg object-cover"
                            loading="lazy"
                            placeholder="blur"
                            blurDataURL={(blog.banner.formats.large?.url || blog.banner.url)}
                        />

                        <div className="min-w-0 flex-1"              >
                            <h2 id={`blog-title-${index}`} className="truncate text-sm font-medium text-gray-900 dark:text-gray-300">
                                {blog.title}
                            </h2>
                            <p className="truncate text-sm text-gray-800 dark:text-gray-400">
                                {blog.description}
                            </p>
                        </div>
                        <div className="inline-flex items-center text-base font-semibold text-gray-900">
                            {/* <a
                                href={blog.readmoreUrl}
                                className="bg-primary p-2 rounded-md text-white hover:underline"
                                title={blog.title ? `Read more about ${blog.title}` : "Read more"}
                                aria-label={blog.title ? `Read more about ${blog.title}` : "Read more"}
                            >
                                Read
                            </a> */}
                            <Link
                                href={`${blog.slug}` || "#"}
                                className="text-primary-600 dark:text-primary-500 hover:underline"
                                title={blog.title ? `Read more about ${blog.title}` : "Read more"}
                                aria-label={blog.title ? `Read more about ${blog.title}` : "Read more"}>
                                Read
                            </Link>

                        </div>
                    </article>
                </ListItem>
            ))}
        </List>
    );
}

export default BlogList;
