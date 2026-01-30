import Link from 'next/link'
import Div from '../components/motion/Div'
import Section from '../components/motion/Section'
import SectionTitle from '../components/SectionTitle'
import Timeline from '../components/Timeline'
import { AboutType } from '../types/blocks/About'
import { ContactUs } from './ContactUs'

interface AboutProps {
    className?: string;
    data: AboutType;
}

const About = ({ className, data }: AboutProps) => {
    return (
        <>
            <Section className={`py-8 px-4 md:px-8 2xl:px-16 ${className}`} aria-label="About Me Section" id={`${data.blockType}`}>
                <SectionTitle title={data.section_title || 'About Me'} />
                <div className="flex w-full mt-8 flex-col md:grid md:grid-cols-2 justify-center gap-8 text-lg md:text-xl">
                    <Div
                        initial={{ x: -40, opacity: 0 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="w-full md:h-full text-justify">
                        <Timeline data={data.timeline} />
                        <Link className='inline-block text-center text-primary-800 dark:text-primary-500 hover:underline underline-offset-4' href={data.cta.url}>{data.cta.label}</Link>
                    </Div>
                    <Div className="flex items-center justify-center w-full md:h-full">
                        <ContactUs apiEndpoint={process.env.NEXT_PUBLIC_CONTACT_US_API_ENDPOINT || '/api/contact'} />
                    </Div>
                </div>
            </Section>
        </>
    )
}

export default About