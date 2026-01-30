import type { GlobalConfig } from 'payload';

export const BlogPage: GlobalConfig = {
    slug: 'blog-page',
    fields: [
        { name: 'title', type: 'text', required: true, },
        { name: 'description', type: 'textarea', required: true },
        {
            name: 'banner',
            type: 'upload',
            relationTo: 'media',
            required: true,
        },
    ]
}
