import type { Block } from "payload";

export const HeroBlock: Block = {
    slug: 'hero',
    interfaceName: 'Hero',
    fields: [
        {
            name: 'blockSlug', // Field name
            type: 'text',
            admin: {
                readOnly: true,
                condition: () => true, // Ensures it's always visible
                description: 'The internal identifier for this block type.',
            },
            defaultValue: '#hero', // Manually set to match the block slug
        },
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

// 0966416408