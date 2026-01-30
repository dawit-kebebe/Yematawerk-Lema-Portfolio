import type { CollectionConfig, CollectionSlug } from 'payload';
import slugify from 'slugify';

export const ImagePortfolio: CollectionConfig = {
    slug: 'image-portfolio',
    labels: {
        singular: 'Image Portfolio',
        plural: 'Image Portfolios',
    },
    admin: {
        useAsTitle: 'title',
    },
    fields: [
        {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
            required: true,
        },
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            name: 'description',
            type: 'textarea',
            required: true,
        }
    ]
}
