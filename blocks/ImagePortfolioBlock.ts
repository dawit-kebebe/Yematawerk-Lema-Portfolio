import { Block } from "payload";

export const ImagePortfolioBlock: Block = {
    slug: 'image-portfolio',
    interfaceName: 'ImagePortfolio',
    fields: [
        {
            name: 'section_title',
            label: 'Section Title',
            type: 'text',
            required: true,
        },
        {
            name: 'portfolio_imgs',
            type: 'upload',
            relationTo: 'media',
            required: true,
            hasMany: true
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