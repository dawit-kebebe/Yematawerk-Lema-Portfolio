export type TestimonialsType = {
    id: string;
    blockType: string;
    blockSlug: string;
    section_title: string;
    testimonials: Array<{
        avatar: GalleryItem,
        quote: string;
        name: string;
        position: string;
        id: string;
    }>;
}