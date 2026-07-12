import { GalleryItem } from "../GalleryItem"

export type LandingType = {
    blockType: string,
    blockSlug: string,
    title: string,
    description: string,
    cta_button_1: {
        label: string,
        url: string
    },
    cta_button_2: {
        label: string,
        url: string
    },
    highlight_top_left: string,
    highlight_bottom_left: string,
    highlight_top_right: string,
    highlight_bottom_right: string,
    hero_img: GalleryItem,
    id: string
}


export interface Landing2Type {
    blockType: string;
    blockSlug: string;
    notification?: {
        label: string,
        url: string
    },
    title: string;
    description: string;
    cta_button_1: {
        label: string;
        url: string;
    };
    cta_button_2?: {
        label: string;
        url: string;
    };
    hero_img: GalleryItem;
    id: string;
}