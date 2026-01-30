import type { CollectionConfig, CollectionSlug } from 'payload';
import slugify from 'slugify';

export const Blogs: CollectionConfig = {
    slug: 'blogs',
    labels: {
        singular: 'Blog',
        plural: 'Blogs',
    },
    admin: {
        useAsTitle: 'title',
    },
    fields: [
        {
            name: 'banner',
            type: 'upload',
            relationTo: 'media',
        },
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            name: 'summary',
            type: 'textarea',
            required: true,
        },
        {
            name: 'content',
            type: 'richText',
            required: true,
        },
        {
            name: 'author',
            type: 'relationship',
            relationTo: 'authors',
            hasMany: false,
            required: true,
        },
        {
            name: 'blog_category',
            type: 'relationship',
            relationTo: 'blog-categories',
            hasMany: false,
            required: true,
        },
        {
            name: 'slug',
            type: 'text',
            required: true,
            unique: true,
            admin: {
                readOnly: true,
            },
            hooks: {
                beforeValidate: [
                    ({ data, value }) => {
                        if (data?.title) {
                            return slugify(data.title, { lower: true, strict: true });
                        }
                        return value;
                    }
                ]
            }
        },
    ]
}
