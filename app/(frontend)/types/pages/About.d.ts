import { GalleryItem } from "../GalleryItem";
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

export type AboutPageType = {
    title: string;
    description: string;
    banner: GalleryItem;
    content: SerializedEditorState;
}

// export type AboutType = {
//     slug: string;
//     data: AboutData;
// }