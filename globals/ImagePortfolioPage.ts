import type { GlobalConfig } from 'payload';

export const ImagePortfolioPage: GlobalConfig = {
    slug: 'image-portfolio-page',
    label: 'Image Portfolio Page',
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
        {
            name: 'title',
            type: 'text',
            required: true,
            defaultValue: 'Image Portfolios',
            admin: {
                description: 'Heading displayed at the top of the image portfolio page.',
            },
        },
    ],
};
