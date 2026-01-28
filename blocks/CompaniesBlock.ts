import { Block } from "payload";

export const CompaniesBlock: Block = {
    slug: 'companies',
    interfaceName: 'Companies',
    fields: [
        {
            name: 'section_title',
            label: 'Section Title',
            type: 'text',
            required: true,
        },
        {
            name: 'companies',
            type: 'array',
            fields: [
                {
                    name: 'company_logo',
                    type: 'upload',
                    relationTo: 'media',
                    required: true,
                },
                {
                    name: 'company_name',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'company_website',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'company_description',
                    type: 'textarea',
                    required: false,
                }
            ],
            required: true,
        }
    ]
}