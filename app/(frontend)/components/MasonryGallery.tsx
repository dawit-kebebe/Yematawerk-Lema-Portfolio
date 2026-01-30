import Masonry, { ResponsiveMasonry } from 'react-masonify'

const MasonryGallery = () => {
    return (
        <div className='w-full'>
            <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
                {/* **OPTIMIZATION 2: Render the Masonry component only once.**
                        Instead of conditionally rendering three separate Masonry blocks (which re-renders the whole component unnecessarily when switching tabs), we use the pre-filtered array and a single Masonry. 
                        This avoids unnecessary DOM manipulation and component instantiation.
                    */}
                <Masonry gap="1rem">
                    {
                        // filteredGallery.map((image, index: number) => (
                        //     <GalleryItemRenderer key={index} item={image} index={index} />
                        // ))
                        <></>
                    }
                </Masonry>
            </ResponsiveMasonry>
        </div>
    )
}

export default MasonryGallery