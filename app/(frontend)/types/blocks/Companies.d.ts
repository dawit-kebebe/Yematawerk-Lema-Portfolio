export type CompaniesType = {
    id: string;
    blockType: string;
    blockSlug: string;
    section_title: string;
    companies: Array<{
        company_logo: GalleryItem,
        company_name: string;
        company_website: string;
        company_description?: string;
        id: string;
    }>;
}