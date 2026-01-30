"use client";

import { Author, Blog, BlogCategory, Media } from '@/payload-types';
import MKBlogCard from '@frontend/components/MKBlogCard';
import { readingTime } from '@frontend/utils/readtime';
import { TabItem, Tabs } from 'flowbite-react';
import { getLexicalText } from '@frontend/utils/getLexicalText';
import Search from './search';

interface GridListViewProps {
    items: Blog[];
    blogCategories: BlogCategory[];
}

const GridListView = ({ items, blogCategories }: GridListViewProps) => {
    const perCategoryItems = blogCategories.map((cat) => ({
        category: cat,
        items: items.filter((item) => (item.blog_category as BlogCategory)?.id === cat.id)
    })).reverse();

    return (
        <>
            <div className="flex w-full justify-between">
                <h1 className="text-3xl font-bold mb-2">Popular Blogs</h1>
                <div className='flex gap-2 flex-nowrap items-center'>
                    <Search />
                </div>
            </div>

            <Tabs aria-label="Tabs with underline" variant="underline">
                <TabItem active title="All">
                    <div className="w-full flex flex-wrap justify-center md:justify-start gap-4">
                        {items?.map((item: Blog) => (
                            <div key={`blog-item-${item.id}`} className="max-w-92 w-full">
                                <MKBlogCard
                                    bannerImage={typeof item.banner === 'object' && item.banner !== null && 'url' in item.banner ? item.banner.url ?? undefined : undefined}
                                    readTime={`${readingTime(getLexicalText(item.content))} min read`}
                                    title={item.title}
                                    description={item.summary}
                                    redirectUrl={`/blog/${item.slug ?? ""}`}
                                    author={(item.author && (item.author as Author)?.avatar)
                                        ? {
                                            name: (item.author as Author)?.name,
                                            avatar: (((item.author as Author)?.avatar as Media)?.url) ?? ""
                                        }
                                        : { name: "Unknown", avatar: "" }}
                                    date={new Date(item.createdAt)}
                                />
                            </div>
                        ))}
                    </div>
                    {items.length === 0 && (<div className="col-span-full text-center text-gray-500 py-8">No blog posts found.</div>)}
                </TabItem>

                {perCategoryItems.map((cat) => (
                    <TabItem title={cat.category.label} key={`tab-${cat.category.id}`}>
                        <div className="w-full flex flex-wrap justify-center md:justify-start gap-4">
                            {cat.items.map((item: Blog) => (
                                <div key={`blog-item-${item.id}`} className="max-w-92 w-full">
                                    <MKBlogCard
                                        bannerImage={(item.banner as Media)?.url || undefined}
                                        readTime={`${readingTime(getLexicalText(item.content))} min read`}
                                        title={item.title}
                                        description={item.summary}
                                        redirectUrl={`/blog/${item.slug ?? ""}`}
                                        author={(item.author && (item.author as Author)?.avatar)
                                            ? {
                                                name: (item.author as Author)?.name,
                                                avatar: (((item.author as Author)?.avatar as Media)?.url) ?? ""
                                            }
                                            : { name: "Unknown", avatar: "" }}
                                        date={new Date(item.createdAt)}
                                    />
                                </div>
                            )) ?? null}
                        </div>
                        {cat.items.length === 0 && (<div className="col-span-full text-center text-gray-500 py-8">No blogs found in this category.</div>)}
                    </TabItem>
                ))}
            </Tabs>
        </>
    )
}

export default GridListView