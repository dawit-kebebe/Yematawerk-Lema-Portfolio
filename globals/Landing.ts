import { AboutBlock } from '@/blocks/AboutBlock';
import { CompaniesBlock } from '@/blocks/CompaniesBlock';
import { HeroBlock } from '@/blocks/HeroBlock';
import { ImagePortfolioBlock } from '@/blocks/ImagePortfolioBlock';
import { TestimonialsBlock } from '@/blocks/TestimonialsBlock';
import { YamiTourBlock } from '@/blocks/YamiTour';
import type { GlobalConfig } from 'payload';

export const Landing: GlobalConfig = {
    slug: 'landing',
    fields: [
        {
            name: 'slug',
            type: 'text',
            required: true,
            validate: (val: string | null | undefined) => {
                const regex = new RegExp(`^[a-z]+(-[a-z]+)*$`);

                // Handle the case where the value is empty
                if (!val) return 'This field is required';

                // Since we know val is a string here, we can test it
                if (regex.test(val)) {
                    return true;
                }

                return `Must contain only lowercase letters and dashes (e.g., "landing-page")`;
            },
        },
        {
            name: 'sections',
            type: 'blocks',
            blocks: [HeroBlock, CompaniesBlock, TestimonialsBlock, ImagePortfolioBlock, YamiTourBlock, AboutBlock],
        }
    ]
}
