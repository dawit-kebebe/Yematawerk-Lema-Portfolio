import type { GalleryItem } from "../GalleryItem";
import type { RichTextContent } from "../RichTextContent";

export type WefVisualsType = {
    id: string;
    blockType: 'wef-visuals';
    blockSlug: string;
    section_title: string;
    title: string;
    description: RichTextContent;
    image: GalleryItem;
    cta: {
        label: string;
        url: string;
    }
};
