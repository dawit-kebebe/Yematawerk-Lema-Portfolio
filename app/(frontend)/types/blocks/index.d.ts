import { CompaniesType } from './Companies';
import { ImagePortfolioType } from './ImagePortfolio';
import { LandingType } from './Landing';
import { ServicesType } from './Services';
import { ServiceTableType } from './ServiceTable';
import { TestimonialsType } from './Testimonials'

export { CompaniesType } from './Companies';
export { LandingType } from './Landing';
export { ServicesType } from './Services';
export { ServiceTableType } from './ServiceTable';
export { TestimonialsType } from './Testimonials'
export { ImagePortfolioType } from './ImagePortfolio';

export type PageBlocks = {
    id: string;
    slug: string;
    sections: [LandingType, CompaniesType, TestimonialsType, ImagePortfolioType, ServicesType, ServiceTableType];
}