import { Access, CollectionConfig } from "payload";

export const canCreate: Access = ({ req }) => {
    return Boolean(req.user);
}

export const ContactUs: CollectionConfig = {
    slug: 'contact-us',
    labels: {
        singular: 'Contact Us Message',
        plural: 'Contact Us Messages',
    },
    admin: {
        useAsTitle: 'name',
    },
    access: {
        create: () => true,
        read: canCreate
    },
    fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'email', type: 'email', required: true },
        { name: 'message', type: 'textarea', required: true },
        {
            name: 'reCapchaToken',
            type: 'textarea',
            required: false,
            admin: { readOnly: true, },
        },
    ],
    hooks: {
        beforeChange: [
            async ({ data, req }) => {
                // Only run this logic on creation (POST)
                if (req.method === 'POST') {
                    if (!data?.reCapchaToken) {
                        throw new Error('reCAPTCHA token is missing.');
                    }

                    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
                    const token = data.reCapchaToken;

                    const response = await fetch(
                        `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`,
                        { method: 'POST' }
                    );

                    const verification = await response.json();

                    if (!verification.success || verification.score < 0.5) {
                        throw new Error('Bot detected. Please try again.');
                    }

                    // CREATE A CLEAN DATA OBJECT
                    // Destructure to remove reCapchaToken and return everything else
                    const { reCapchaToken, ...cleanedData } = data;

                    return {
                        ...cleanedData,
                    };
                }

                return data;
            },
        ],
    },
}