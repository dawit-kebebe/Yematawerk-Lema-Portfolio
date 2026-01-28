import { Block } from "payload";

export const AboutBlock: Block = {
    slug: 'about',
    interfaceName: 'AboutTimeline',
    fields: [
        {
            name: 'section_title',
            label: 'Section Title',
            type: 'text',
            required: true,
        },
        {
            name: 'timeline',
            type: 'array',
            fields: [
                {
                    name: 'date',
                    label: 'Date',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'title',
                    label: 'Title',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'description',
                    label: 'Description',
                    type: 'textarea',
                    required: true,
                }
            ],
            required: true,
        },
        {
            name: 'cta',
            label: 'CTA Button',
            type: 'group',
            fields: [
                { name: 'label', type: 'text', required: true },
                { name: 'url', type: 'text', required: true }
            ],
            required: false
        },
    ]
}