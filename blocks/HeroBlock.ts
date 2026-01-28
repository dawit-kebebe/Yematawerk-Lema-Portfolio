import type { Block } from "payload";

export const HeroBlock: Block = {
    slug: 'hero',
    interfaceName: 'Hero',
    fields: [
        { name: 'title', type: 'text', required: true, },
        { name: 'description', type: 'textarea', required: true },
        {
            name: 'cta_button_1',
            label: 'CTA Button 1',
            type: 'group',
            fields: [
                { name: 'label', type: 'text', required: true },
                { name: 'url', type: 'text', required: true }
            ],
            required: true
        },
        {
            name: 'cta_button_2',
            label: 'CTA Button 2',
            type: 'group',
            fields: [
                { name: 'label', type: 'text', required: true },
                { name: 'url', type: 'text', required: true }
            ],
            required: false
        },
        { name: 'highlight_top_left', type: 'text', required: true, },
        { name: 'highlight_bottom_left', type: 'text', required: true, },
        { name: 'highlight_top_right', type: 'text', required: true, },
        { name: 'highlight_bottom_right', type: 'text', required: true, },
        {
            name: 'hero_img',
            type: 'upload',
            relationTo: 'media',
            required: false,
        }
    ]
}