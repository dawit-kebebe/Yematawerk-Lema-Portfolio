import config from '@/payload.config';
import { Pagination } from '@frontend/components/Pagination';
import { headers } from 'next/headers';
import { getPayload } from 'payload';
import { clampToString } from '@frontend/utils/clampIntToString';
import { toPositiveInt } from '@frontend/utils/safePositiveInt';
import MasonrySection from './MasonrySection';
import SectionTitle from '@frontend/components/SectionTitle';


interface ImagePortfolioPageProps {
    searchParams: Promise<{ page: string, pageSize: string }>;
}

const ImagePortfolioPage = async ({ searchParams }: ImagePortfolioPageProps) => {
    const resolvedSearchParams = await Promise.resolve(searchParams);
    const { page = 1, pageSize = 10 } = (resolvedSearchParams ?? {}) as { page?: string | number; pageSize?: string | number; };
    const pageStr = clampToString(page, "1");
    const pageSizeStr = clampToString(pageSize, "10");

    const headersList = await headers();

    const protocol = headersList.get('x-forwarded-proto') || 'http';
    const host = headersList.get('host');

    const baseUrl = `${protocol}://${host}`;

    const payload = await getPayload({ config });

    const imagePortfolioCollection = await payload.find({
        collection: 'image-portfolio',
        page: toPositiveInt(pageStr, 1),
        limit: toPositiveInt(pageSizeStr, 10),
        sort: '-createdAt',
    });

    const currentPage: number = toPositiveInt(imagePortfolioCollection.page ?? pageStr ?? "1", 1);
    const totalPages: number = Math.max(1, toPositiveInt(imagePortfolioCollection.totalPages ?? 1, 1));

    const rerouteUrl = new URL('/image-portfolio', baseUrl);
    rerouteUrl.searchParams.set('page', pageStr);
    rerouteUrl.searchParams.set('pageSize', pageSizeStr);

    return (
        <div className='mt-4 w-full px-2 md:px-4'>
            <SectionTitle title={'Image Portfolios'} />
            <MasonrySection data={imagePortfolioCollection.docs} />
            <div className='py-8'>
                <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    pageSize={typeof pageSize === 'string' ? parseInt(pageSizeStr) : 10}
                    rerouteUrl={rerouteUrl.href}
                />
            </div>
        </div>
    )
}

export default ImagePortfolioPage