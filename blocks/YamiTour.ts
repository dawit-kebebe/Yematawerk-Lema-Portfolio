import type { Block } from "payload";

export const YamiTourBlock: Block = {
    slug: 'yami-tour',
    interfaceName: 'YamiTour',
    fields: [
        {
            name: 'blockSlug', // Field name
            type: 'text',
            admin: {
                readOnly: true,
                condition: () => true, // Ensures it's always visible
                description: 'The internal identifier for this block type.',
            },
            defaultValue: '#yami-tour', // Manually set to match the block slug
        },
        {
            name: 'section_title',
            label: 'Section Title',
            type: 'text',
            required: true,
        },
        {
            name: 'tours',
            type: 'array',
            fields: [
                {
                    name: 'image',
                    type: 'upload',
                    relationTo: 'media',
                    required: true,
                },
                {
                    name: 'tour_description',
                    type: 'textarea',
                    label: 'Tour Description',
                    required: true,
                },
            ],
            required: true,
        }
    ]
}