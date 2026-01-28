import { Block } from "payload";

export const YamiTourBlock: Block = {
    slug: 'yami-tour',
    interfaceName: 'YamiTour',
    fields: [
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