import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  hooks: {
    afterRead: [
      ({ doc }) => {
        if (doc?.cloudinary?.secure_url) {
          return {
            ...doc,
            url: doc.cloudinary.secure_url, // Overwrites the broken generated URL
          };
        }
        return doc;
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: true,
}
