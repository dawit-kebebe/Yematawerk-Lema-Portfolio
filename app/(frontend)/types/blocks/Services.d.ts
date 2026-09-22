export type ServicesType = {
    id?: string | null;
    blockType: 'service';
    blockSlug?: string | null;
    blockName?: string | null;
    section_title: string;
    services: {
        title: string;
        price: number;
        currency: '$' | 'Birr';
        period: 'day' | 'week' | 'month' | 'year';
        service_items: {
            caption: string;
            isIncluded: boolean;
            id?: string | null;
        }[];
        cta: {
            label: string;
            url: string;
        };
        id?: string | null;
    }[];
}
