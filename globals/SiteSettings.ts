import type { GlobalConfig } from 'payload';

export const SiteSettings: GlobalConfig = {
    slug: 'site-settings',
    label: 'Site Settings',
    admin: {
        description: 'Global site metadata: title, description, and favicon. Used for SEO and browser tab.',
    },
    fields: [
        {
            name: 'siteTitle',
            type: 'text',
            required: true,
            label: 'Site Title',
            admin: {
                description: 'Appears in browser tabs and as the default OG title.',
            },
        },
        {
            name: 'siteDescription',
            type: 'textarea',
            required: true,
            label: 'Site Description',
            admin: {
                description: 'Default meta description used by search engines.',
            },
        },
        {
            name: 'favicon',
            type: 'upload',
            relationTo: 'media',
            required: false,
            label: 'Favicon',
            admin: {
                description: 'Upload a .ico, .png, or .svg to use as the browser tab icon.',
            },
        },
        {
            name: 'ogImage',
            type: 'upload',
            relationTo: 'media',
            required: false,
            label: 'Default OG Image',
            admin: {
                description: 'Fallback Open Graph image used when sharing pages that have no specific image (e.g. the home page).',
            },
        },
    ],
};
