export type YamiTourType = {
    id: string;
    blockType: string;
    section_title: string;
    tours: Array<{
        image: GalleryItem,
        tour_description?: string;
        id: string;
    }>;
}

export type NormalizedYamiTourType = {
    pinPoint: number;
    image: GalleryItem;
    tour_description?: string;
    id: string;
}