import config from "@/payload.config";
import { ContactUs } from "@frontend/blocks/ContactUs";
import MKAltCard from "@frontend/components/MKAltCard";
import { Pagination } from "@frontend/components/Pagination";
import { clampToString } from "@frontend/utils/clampIntToString";
import { toPositiveInt } from "@frontend/utils/safePositiveInt";
import { startOfDay, startOfMonth, startOfWeek } from "date-fns";
import { headers } from "next/headers";
import Image from "next/image";
import { getPayload } from "payload";
import FilterForm from "./FilterForm";
import GridListView from "./GridListView";

interface BlogPageProps {
    searchParams: Promise<{ page?: string | number; pageSize?: string | number; filter?: string, author?: string }> | { page?: string | number; pageSize?: string | number; filter?: string, author?: string };
}


export default async function BlogPage({ searchParams }: BlogPageProps) {
    // // safely resolve searchParams (works whether it's a value or a Promise)
    const resolvedSearchParams = await Promise.resolve(searchParams);
    const { page = 1, pageSize = 10, filter, author: authorFilter = "" } = (resolvedSearchParams ?? {}) as { page?: string | number; pageSize?: string | number; filter?: string, author?: string };
    const pageStr = clampToString(page, "1");
    const pageSizeStr = clampToString(pageSize, "10");

    const today = new Date();

    let appliedFilter = "";
    if (filter === "date-today") appliedFilter = startOfDay(today).toISOString();
    else if (filter === "date-week") appliedFilter = startOfWeek(today).toISOString();
    else if (filter === "date-month") appliedFilter = startOfMonth(today).toISOString();

    const headersList = await headers();
    const protocol = headersList.get("x-forwarded-proto") || "http";
    const host = headersList.get("host") || "localhost";
    const baseUrl = `${protocol}://${host}`;

    const payload = await getPayload({ config });

    const blogPageGlobal = await payload.findGlobal({
        slug: 'blog-page'
    })

    const blogsCollection = await payload.find({
        collection: 'blogs',
        limit: toPositiveInt(pageSizeStr, 10),
        page: toPositiveInt(pageStr, 1),
        where: {
            and: [
                ...(appliedFilter ? [{
                    createdAt: {
                        greater_than_equal: appliedFilter
                    }
                }] : []),
                ...(authorFilter ? [{
                    author: {
                        equals: authorFilter
                    }
                }] : [])
            ]
        },
        sort: '-createdAt',
        populate: {
            banner: true,
            blog_category: true,
            author: true
        } as any,
    });

    const blogCategoriesCollection = await payload.find({ collection: 'blog-categories', limit: 100 });
    const authorsCollection = await payload.find({ collection: 'authors', limit: 100 });

    const currentPage: number = toPositiveInt(blogsCollection.page ?? pageStr ?? "1", 1);
    const totalPages: number = Math.max(1, toPositiveInt(blogsCollection.totalPages ?? 1, 1));

    const rerouteUrl = new URL("/blog", baseUrl);
    rerouteUrl.searchParams.set("page", String(currentPage));
    rerouteUrl.searchParams.set("pageSize", String(pageSizeStr));

    return (
        <div className="mt-4 w-full px-2 md:px-4">
            <MKAltCard className="relative w-full h-138">
                {blogPageGlobal && typeof blogPageGlobal.banner !== 'string' && (
                    <Image
                        src={`${blogPageGlobal?.banner?.url || '/default-banner.png'}`}
                        alt={`${blogPageGlobal?.banner?.alt || "Blog page banner"}`}
                        width={blogPageGlobal?.banner?.width || 1920}
                        height={blogPageGlobal?.banner?.height || 1080}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL={`${blogPageGlobal?.banner?.thumbnailURL || "/default-banner.png"}`}
                    />
                )}
                <div className="absolute left-0 top-0 z-1 p-4 h-full w-full flex flex-col gap-4 justify-end px-2 md:px-16 bg-[rgba(0,0,0,0.5)]" >
                    {/* <div className="w-full h-full absolute top-0 left-0 z-10 p-2 sm:p-4 md:p-8 flex flex-col justify-end"> */}
                    <span className="w-fit h-fit p-4">
                        <h1 className="text-white line-clamp-2 md:text-6xl sm:text-5xl text-4xl font-semibold max-w-3xl">{`${blogPageGlobal?.title || "Blogs"}`}</h1>
                        <p className="text-white line-clamp-4 md:text-xl sm:text-lg max-w-3xl">{`${blogPageGlobal?.description || "Fresh points of views on everything from social media marketing to content creation to art and tourism."}`}</p>
                    </span>
                </div>
            </MKAltCard>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 my-12">
                <div className="md:col-span-3 my-4 px-2 sm:px-4 md:px-8">
                    <GridListView
                        items={blogsCollection.docs || []}
                        blogCategories={blogCategoriesCollection.docs || []}
                    />

                    <div className="flex overflow-x-auto justify-center py-8">
                        <Pagination totalPages={totalPages} currentPage={currentPage} pageSize={Number(pageSizeStr)} rerouteUrl={rerouteUrl.href} />
                    </div>
                </div>

                <div className="flex flex-col items-center w-full py-8  md:col-span-1">
                    <FilterForm
                        filter={filter || ""}
                        authorFilter={authorFilter || ""}
                        authors={authorsCollection.docs || []}
                    />

                    <ContactUs />
                </div>
            </div>

        </div>
    );
}
