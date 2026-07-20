import Landing from '@/app/(frontend)/blocks/Landing';
import { CompaniesType, ImagePortfolioType, LandingType, TestimonialsType } from '@/app/(frontend)/types/blocks';
import { Services as ServiceType } from '@/payload-types';
import About from '../blocks/About';
import Companies from '../blocks/Companies';
import ImagePortfolioHighlight from '../blocks/ImagePortfolioHighlight';
import Services from '../blocks/Services';
import Testimonials from '../blocks/Testimonials';
import YamiTour from '../blocks/YamiTour';
import { AboutType } from '../types/blocks/About';
import { YamiTourType } from '../types/blocks/YamiTour';
import { Landing2Type } from '../types/blocks/Landing';
import Landing2 from '../blocks/Landing2';
import { WefVisualsType } from '../types/blocks/WefVisuals';
import WefVisuals from '../blocks/WefVisuals';

interface RenderBlocksProps {
    data: [LandingType, Landing2Type, CompaniesType, TestimonialsType, ImagePortfolioType, YamiTourType, AboutType, ServiceType]
}

type BlockTypes = LandingType | Landing2Type | CompaniesType | TestimonialsType | ImagePortfolioType | YamiTourType | WefVisualsType | AboutType | ServiceType;

const RenderBlocks = ({ data }: RenderBlocksProps) => {
    return (
        <>
            {data.map((block, index) => {
                const isLanding = (b: BlockTypes): b is LandingType =>
                    b.blockType === 'hero'
                const isLanding2 = (b: BlockTypes): b is Landing2Type =>
                    b.blockType === 'hero-2'
                const isCompanies = (b: BlockTypes): b is CompaniesType =>
                    b.blockType === 'companies'
                const isTestimonials = (b: BlockTypes): b is TestimonialsType =>
                    b.blockType === 'testimonials'
                const isImagePortfolios = (b: BlockTypes): b is ImagePortfolioType => b.blockType === 'image-portfolio'
                const isYamiTour = (b: BlockTypes): b is YamiTourType => b.blockType === 'yami-tour'
                const isWefVisuals = (b: BlockTypes): b is WefVisualsType => b.blockType === 'wefvisuals'
                const isAbout = (b: BlockTypes): b is AboutType => b.blockType === 'about'
                const isService = (b: BlockTypes): b is ServiceType => b.blockType === 'service'

                if (isLanding(block)) return <Landing key={block.id} data={block} className={`${index % 2 !== 0 ? 'bg-gray-100 dark:bg-gray-700' : 'bg-transparent dark:bg-transparent'}`} />
                if (isLanding2(block)) return <Landing2 key={block.id} data={block} className={`${index % 2 !== 0 ? 'bg-gray-100 dark:bg-gray-700' : 'bg-transparent dark:bg-transparent'}`} />
                if (isCompanies(block)) return <Companies key={block.id} data={block} className={`${index % 2 !== 0 ? 'bg-gray-100 dark:bg-gray-700' : 'bg-transparent dark:bg-transparent'}`} />
                if (isTestimonials(block)) return <Testimonials key={block.id} data={block} className={`${index % 2 !== 0 ? 'bg-gray-100 dark:bg-gray-700' : 'bg-transparent dark:bg-transparent'}`} />
                if (isService(block)) return <Services key={block.id} data={block} className={`${index % 2 !== 0 ? 'bg-gray-100 dark:bg-gray-700' : 'bg-transparent dark:bg-transparent'}`} />
                if (isImagePortfolios(block)) return <ImagePortfolioHighlight key={block.id} data={block} className={`${index % 2 !== 0 ? 'bg-gray-100 dark:bg-gray-700' : 'bg-transparent dark:bg-transparent'}`} />
                if (isYamiTour(block)) return <YamiTour key={block.id} data={block} className={`${index % 2 !== 0 ? 'bg-gray-100 dark:bg-gray-700' : 'bg-transparent dark:bg-transparent'}`} />
                if (isWefVisuals(block)) return <WefVisuals key={block.id} data={block} className={`${index % 2 !== 0 ? 'bg-gray-100 dark:bg-gray-700' : 'bg-transparent dark:bg-transparent'}`} />
                if (isAbout(block)) return <About key={block.id} data={block} className={`${index % 2 !== 0 ? 'bg-gray-100 dark:bg-gray-700' : 'bg-transparent dark:bg-transparent'}`} />
                return null
            })}
        </>
    )
}

export default RenderBlocks