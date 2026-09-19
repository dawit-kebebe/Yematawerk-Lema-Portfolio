import type { GlobalConfig } from 'payload';

export const About: GlobalConfig = {
    slug: 'about',
    fields: [
        {
            name: 'enabled',
            type: 'checkbox',
            label: 'Page Enabled',
            defaultValue: false,
            admin: {
                description: 'Enable this page to make it publicly accessible. When disabled, visitors receive a 404.',
                position: 'sidebar',
            },
        },
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
