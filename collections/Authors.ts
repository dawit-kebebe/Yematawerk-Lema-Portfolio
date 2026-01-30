import type { CollectionConfig } from 'payload';

export const Authors: CollectionConfig = {
    slug: 'authors',
    labels: {
        singular: 'Author',
        plural: 'Authors',
    },
    admin: {
        useAsTitle: 'name',
    },
    fields: [
        {
            name: 'avatar',
            type: 'upload',
            relationTo: 'media',
        },
        {
            name: 'name',
            type: 'text',
            unique: true,
            required: true,
        }
    ]
}
