import type { GlobalConfig } from 'payload';

export const About: GlobalConfig = {
    slug: 'about',
    fields: [
        { name: 'title', type: 'text', required: true, },
        { name: 'description', type: 'textarea', required: true },
        {
            name: 'banner',
            type: 'upload',
            relationTo: 'media',
            required: true,
        },
        { name: 'content', type: 'richText', required: true },
    ]
}
