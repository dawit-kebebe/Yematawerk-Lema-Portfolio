export type ImagePortfolioType = {
    id: string;
    blockType: string;
    blockSlug: string;
    section_title: string;
    cta: {
        label: string,
        url: string
    },
    portfolio_imgs: GalleryItem[]
}