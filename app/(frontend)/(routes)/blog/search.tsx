"use client";

import BlogList from '@frontend/components/BlogList'
import { Button, Popover, TextInput } from 'flowbite-react'
import Image from 'next/image'
import React, { useRef, useState } from 'react'
import { HiSearch } from 'react-icons/hi'

interface BlogCategory {
    title: string;
    categoryId: string;
}

interface Blog {
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

const Search = () => {
    const searchInputRef = useRef<HTMLInputElement>(null)
    const [searchResult, setSearchResult] = useState<Blog[]>([] as Blog[])
    const [isLoading, setIsLoading] = useState(false)

    const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();

            setSearchResult([]);
            if (searchInputRef.current && searchInputRef.current.value) {
                const searchQuery = searchInputRef.current.value.trim();
                setIsLoading(true);

                try {
                    const res = await fetch(`/api/main/search/${encodeURIComponent(searchQuery)}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });

                    const data = await res.json();

                    if (data && data.data && Array.isArray(data.data)) {
                        setSearchResult(data.data);
                    } else {
                        console.error("Search request failed:", data);
                        setSearchResult([]);
                    }

                } catch (error) {
                    console.error("Search request failed:", error);
                    setSearchResult([]);
                } finally {
                    setIsLoading(false);
                }
            }
        }
    };
    return (
        <div role="search" aria-label="Search Section" className='flex flex-nowrap gap-2'>
            <Popover
                aria-labelledby="search-popover-title"
                content={
                    <div className="overflow-hidden max-w-xl">
                        <div className="flex flex-col gap-2 min-w-40 w-full px-3 py-2 mr-20">
                            <form action="/search" method="get" role="search" aria-label="Blog Search Form">
                                <TextInput
                                    icon={HiSearch}
                                    type="search"
                                    name="q"
                                    placeholder="Search"
                                    required
                                    size={32}
                                    // color="primary"
                                    className="font-base"
                                    onKeyDown={handleKeyDown}
                                    ref={searchInputRef}
                                    aria-label="Type your search query here"
                                />
                            </form>
                            <div className="bg-gray-200 p-2 max-h-64 h-full overflow-y-auto scrollbar-thin dark:bg-gray-800" role="status" aria-live="polite">
                                {isLoading ? (
                                    <div className="flex justify-center items-center">
                                        <Image width={24} height={24} src="/loading-spinner.svg" alt="Loading search results" />
                                    </div>
                                ) : (
                                    (searchResult && searchResult.length > 0)
                                        ? <BlogList blogs={searchResult.map(item => {
                                            return {
                                                ...item,
                                                slug: `/blog/${item.slug}`
                                            }
                                        })} />
                                        : <p className="text-sm text-gray-700">No results found.</p>
                                )}
                            </div>
                        </div>
                    </div>
                }
                className="flex items-start justify-start overflow-x-hidden"
            >
                <Button
                    // color="transparent"
                    className="flex justify-center items-center p-2 rounded-[100%] w-10 h-10 border-2"
                    aria-label="Open search form"
                    title="Open search form"
                >
                    <HiSearch className="w-full h-full" color="white" />
                </Button>
            </Popover>
        </div>
    )
}

export default Search