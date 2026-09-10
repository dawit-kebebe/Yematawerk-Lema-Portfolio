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
        },
        {
            name: 'colorTheme',
            type: 'group',
            label: 'Color Theme',
            fields: [
                {
                    name: 'preset',
                    type: 'select',
                    defaultValue: 'orange',
                    options: [
                        { label: 'Orange / Warm Rust (Default)', value: 'orange' },
                        { label: 'Emerald / Green', value: 'emerald' },
                        { label: 'Ocean Blue', value: 'blue' },
                        { label: 'Royal Purple', value: 'purple' },
                        { label: 'Rose / Pink', value: 'rose' },
                        { label: 'Amber / Gold', value: 'amber' },
                        { label: 'Teal / Cyan', value: 'teal' },
                        { label: 'Custom Palette', value: 'custom' },
                    ],
                },
                {
                    name: 'customShades',
                    type: 'group',
                    label: 'Custom Color Shades (Used when preset is Custom)',
                    admin: {
                        condition: (_data, siblingData) => siblingData?.preset === 'custom',
                    },
                    fields: [
                        { name: 'primary50', type: 'text', label: '50 (Lightest)', defaultValue: '#fef4ee' },
                        { name: 'primary100', type: 'text', label: '100', defaultValue: '#fde7d7' },
                        { name: 'primary200', type: 'text', label: '200', defaultValue: '#fbcaad' },
                        { name: 'primary300', type: 'text', label: '300', defaultValue: '#f7a67a' },
                        { name: 'primary400', type: 'text', label: '400', defaultValue: '#f37744' },
                        { name: 'primary500', type: 'text', label: '500 (Base Primary)', defaultValue: '#ef4c16' },
                        { name: 'primary600', type: 'text', label: '600 (Hover/Accent)', defaultValue: '#e13a15' },
                        { name: 'primary700', type: 'text', label: '700', defaultValue: '#ba2914' },
                        { name: 'primary800', type: 'text', label: '800', defaultValue: '#942318' },
                        { name: 'primary900', type: 'text', label: '900', defaultValue: '#781f16' },
                        { name: 'primary950', type: 'text', label: '950 (Darkest)', defaultValue: '#410c09' },
                    ],
                },
            ],
        }
    ],
}