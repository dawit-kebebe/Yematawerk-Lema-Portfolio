import Section from "../components/motion/Section";
import SectionTitle from "../components/SectionTitle";
import { ServiceCard } from "../components/ServiceCard";
import { ServicesType } from "../types/blocks/Services";

interface ServicesProps {
    data: ServicesType;
    className?: string;
}

export default function Services({ data, className }: ServicesProps) {
    return (
        <>
            <Section className={`py-8 px-4 md:px-8 2xl:px-16 ${className}`} aria-label="Services Section" id={`${data.blockType}`}>
                <SectionTitle title={data.section_title || 'Services'} />
                <div className="w-full flex flex-wrap items-center justify-center gap-8 py-16">
                    {data.services.map((item) => (
                        <ServiceCard key={item.id} data={item} />
                    ))}
                </div>
            </Section>
        </>
    );
}