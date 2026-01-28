interface GalleryItem {
    // src: string;
    // alt?: string;
    // title?: string;
    // mime?: string;
    // width?: number;
    // height?: number;

    createdAt: string,
    updatedAt: string,
    alt: string,
    filename: string,
    mimeType: string,
    filesize: number,
    width: number,
    height: number,
    focalX: number,
    focalY: number,
    id: string,
    url: string,
    thumbnailURL: string | null

}

export type { GalleryItem }