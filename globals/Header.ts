import type { GlobalConfig } from 'payload';


export const Header: GlobalConfig = {
    slug: 'header',
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            name: 'logo',
            type: 'upload',
            relationTo: 'media',
            required: false,
        },
        {
            name: 'navigationLinks',
            type: 'array',
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
            ],
        },
        {
            name: 'cta_button',
            type: 'group',
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
            ],
            required: false,
        }
    ],
}