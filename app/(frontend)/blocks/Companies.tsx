import Image from 'next/image';
import Link from 'next/link';
import Section from '../components/motion/Section';
import SectionTitle from '../components/SectionTitle';
import { CompaniesType } from '../types/blocks/Companies';
import Div from '../components/motion/Div';

interface CompaniesProps {
    data: CompaniesType;
    className?: string;
}

const Companies = ({ data, className }: CompaniesProps) => {
    return (
        // <section className={`py-8 px-4 md:px-8 2xl:px-16 ${className}`} >
        <Section className={`py-8 px-4 md:px-8 2xl:px-16 ${className}`} aria-label="Companies Section">
            <SectionTitle title={data.section_title || 'Companies I Worked With'} />
            <div className='w-full flex flex-wrap items-center justify-center gap-8 py-16'>
                {data.companies.map((company) => (
                    <Link key={company.id} href={company.company_website} target="_blank" rel="noopener noreferrer" className='w-52 h-52 flex items-center justify-center p-4 border border-gray-300 dark:border-gray-700 rounded-lg hover:shadow-lg transition-shadow duration-300'>
                        <Div className='w-full h-full'>
                            <Image width={company.company_logo.width} height={company.company_logo.height} src={company.company_logo.url} alt={company.company_logo.alt} className='max-w-full max-h-full object-contain' />
                        </Div>
                    </Link>
                ))}
            </div>
        </Section>
        // </section>
    )
}

export default Companies    