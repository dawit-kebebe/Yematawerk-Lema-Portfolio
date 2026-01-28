import { Block } from "payload";

export const TestimonialsBlock: Block = {
    slug: 'testimonials',
    interfaceName: 'Testimonials',
    fields: [
        {
            name: 'section_title',
            label: 'Section Title',
            type: 'text',
            required: true,
        },
        {
            name: 'testimonials',
            type: 'array',
            fields: [
                {
                    name: 'avatar',
                    type: 'upload',
                    relationTo: 'media',
                    required: true,
                },
                {
                    name: 'name',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'position',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'quote',
                    type: 'textarea',
                    required: true,
                }
            ],
            required: true,
        }
    ]
}