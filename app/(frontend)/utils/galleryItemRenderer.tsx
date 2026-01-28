import { GalleryItem } from "@/app/(frontend)/types/GalleryItem";
import Image from "next/image";
import Div from "../components/motion/Div";

export default function GalleryItemRenderer({ item, index }: { item: GalleryItem, index: number }) {
    const isVideo = item.mimeType?.includes('video');

    if (isVideo) {
        return (
            <video
                key={index}
                src={item.url}
                controls
                autoPlay={false}
                loop
                muted
                // Added a style for better display consistency in masonry
                style={{ width: '100%', height: 'auto', display: 'block' }
                }
            />
        );
    }

    // Use a container div for better Masonry control, especially with Next.js Image
    return (
        <Div key={index} className='w-full h-auto rounded-2xl overflow-clip' >
            <Image
                width={item.width || 1000}
                height={item.height || 600}
                src={item.url}
                title={item.alt}
                alt={item.alt || ''}
                blurDataURL={item.thumbnailURL || undefined}
                // layout/object-fit for responsive image behavior
                // The actual dimensions will be handled by the Masonry layout
                // sizes="(max-width: 750px) 100vw, (max-width: 900px) 50vw, 33vw"
                style={{ width: '100%', height: 'auto', display: 'block' }}
            />
        </Div>
    );
}
