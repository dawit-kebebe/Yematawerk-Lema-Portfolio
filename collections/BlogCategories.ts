import type { CollectionConfig } from 'payload';

export const BlogCategories: CollectionConfig = {
    slug: 'blog-categories',
    labels: {
        singular: 'Blog Category',
        plural: 'Blog Categories',
    },
    admin: {
        useAsTitle: 'label',
    },
    fields: [
        {
            name: 'label',
            type: 'text',
            unique: true,
            required: true,
        }
    ]
}
