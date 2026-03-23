import type { Block } from "payload";

export const ServiceBlock: Block = {
    slug: 'service',
    interfaceName: 'Services',
    fields: [
        {
            name: 'blockSlug', // Field name
            type: 'text',
            admin: {
                readOnly: true,
                condition: () => true, // Ensures it's always visible
                description: 'The internal identifier for this block type.',
            },
            defaultValue: '#service', // Manually set to match the block slug
        },
        {
            name: 'section_title',
            label: 'Section Title',
            type: 'text',
            required: true,
        },
        {
            name: 'services',
            type: 'array',
            fields: [
                {
                    name: 'title',
                    label: 'Title',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'price',
                    label: 'Price',
                    type: 'number',
                    required: true,
                },
                {
                    name: 'currency',
                    label: 'Currency',
                    type: 'select',
                    options: [
                        { label: 'USD', value: '$' },
                        { label: 'ETB', value: 'Birr' },
                    ],
                    required: true,
                },
                {
                    name: 'period',
                    label: 'Period',
                    type: 'select',
                    options: [
                        { label: 'Daily', value: 'day' },
                        { label: 'Weekly', value: 'week' },
                        { label: 'Monthly', value: 'month' },
                        { label: 'Yearly', value: 'year' }
                    ],
                    required: true,
                },
                {
                    name: 'service_items',
                    label: 'Service Items',
                    type: 'array',
                    fields: [
                        {
                            name: 'caption',
                            label: 'Caption',
                            type: 'text',
                            required: true,
                        },
                        {
                            name: 'isIncluded',
                            label: 'Is Included',
                            type: 'checkbox',
                            required: true,
                        }
                    ],
                    required: true,

                }
            ],
            required: true,
        }
    ]
}