"use client";

import { Dropdown, DropdownItem, Pagination as FlowbitePagination } from "flowbite-react";
import { useRouter } from 'next/navigation';
import { useCallback } from "react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    rerouteUrl?: string
}

export function Pagination({ currentPage, totalPages, pageSize, rerouteUrl }: PaginationProps) {
    const router = useRouter();

    const handlePageChange = useCallback((page: number) => {
        if (rerouteUrl) {
            const rerouteUrlObj = new URL(rerouteUrl);
            rerouteUrlObj.searchParams.set('page', page.toString());
            router.push(rerouteUrlObj.href);
        }
    }, [router, rerouteUrl]);

    const handlePageSizeChange = useCallback((pageSize: number) => {
        if (rerouteUrl) {
            const rerouteUrlObj = new URL(rerouteUrl);
            rerouteUrlObj.searchParams.set('pageSize', pageSize.toString());
            router.push(rerouteUrlObj.href);
        }
    }, [router, rerouteUrl]);

    return (
        <div className="flex gap-4 items-center overflow-x-auto sm:justify-center">
            <div className="flex gap-2 items-center text-lg">
                <span className="hidden sm:inline">
                    {currentPage} of {totalPages} Items
                </span>
                <FlowbitePagination
                    className="pagination"
                    layout="pagination"
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    previousLabel=" "
                    nextLabel=" "
                    showIcons
                    color="blue"
                />
            </div>
            <div className="flex gap-2 items-center text-lg">
                <Dropdown label={pageSize} className="mt-2 px-3 py-2 h-fit focus:ring-0">
                    <div className="h-36 overflow-y-auto scrollbar-thin">
                        {Array.from({ length: 15 }, (_, i) => {
                            const n = i + 1;
                            return (
                                <DropdownItem key={n} onClick={() => handlePageSizeChange(n)}>
                                    {n}
                                </DropdownItem>
                            );
                        })}
                    </div>
                </Dropdown>
                <span className="hidden sm:inline">
                    Items Per Page
                </span>
            </div>

        </div>
    );
}