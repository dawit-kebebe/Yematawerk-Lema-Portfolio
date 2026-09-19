import type { Block } from 'payload';

export const ServiceTableBlock: Block = {
    slug: 'service-table',
    interfaceName: 'ServiceTable',
    labels: {
        singular: 'Service Table',
        plural: 'Service Tables',
    },
    fields: [
        {
            name: 'blockSlug',
            type: 'text',
            admin: {
                readOnly: true,
                condition: () => true,
                description: 'The internal identifier for this block type.',
            },
            defaultValue: '#service-table',
        },
        {
            name: 'section_title',
            label: 'Section Title',
            type: 'text',
            required: true,
        },
        {
            name: 'columns',
            label: 'Package Columns',
            type: 'array',
            minRows: 1,
            admin: {
                description: 'Define each package/tier column (e.g. Basic, Standard, Pro). Order here determines column order in the table.',
            },
            fields: [
                {
                    name: 'label',
                    label: 'Column Label',
                    type: 'text',
                    required: true,
                },
            ],
        },
        {
            name: 'rows',
            label: 'Service Rows',
            type: 'array',
            minRows: 1,
            admin: {
                description: 'Each row is one service feature. Add a value for each column — leave blank to show "-" (none).',
            },
            fields: [
                {
                    name: 'label',
                    label: 'Feature / Service Label',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'values',
                    label: 'Column Values',
                    type: 'array',
                    admin: {
                        description: 'One entry per column, in the same order as the columns above. Leave the value blank to display "-".',
                    },
                    fields: [
                        {
                            name: 'value',
                            label: 'Value',
                            type: 'text',
                            admin: {
                                placeholder: '- (leave blank for none)',
                            },
                        },
                    ],
                },
            ],
        },
    ],
};
