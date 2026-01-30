import type { CollectionConfig } from 'payload';

export const Socials: CollectionConfig = {
    slug: 'socials',
    labels: {
        singular: 'Social',
        plural: 'Socials',
    },
    admin: {
        useAsTitle: 'label',
    },
    fields: [
        {
            name: 'label',
            type: 'text',
            required: true,
        },
        {
            name: 'url',
            type: 'text',
            required: true,
        },
        {
            name: 'icon',
            type: 'select',
            required: true,
            options: [
                { label: 'Facebook', value: 'facebook' },
                { label: 'Instagram', value: 'instagram' },
                { label: 'Twitter', value: 'twitter' },
                { label: 'TikTok', value: 'tiktok' },
                { label: 'YouTube', value: 'youtube' },
                { label: 'Email', value: 'email' },
                { label: 'LinkedIn', value: 'linkedin' },
                { label: 'GitHub', value: 'github' },
                { label: 'Website', value: 'website' },
                { label: 'Pinterest', value: 'pinterest' },
                { label: 'Other', value: 'other' },
            ],
        }
    ]
}
