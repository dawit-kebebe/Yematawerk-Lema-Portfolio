import LineChart from '../components/LineChart'
import Section from '../components/motion/Section';
import SectionTitle from '../components/SectionTitle'

interface DataChartProps {
    data: null;
    className?: string;
}

const DataChart = ({ data, className }: DataChartProps) => {
    return (
        <Section className={`py-8 px-4 md:px-8 2xl:px-16 ${className}`} aria-label="Companies Section">
            <SectionTitle title={'Tangible Measurable Results'} />
            <div className='w-full flex flex-wrap items-center justify-center gap-8 py-16'>
                <LineChart />
            </div>
        </Section>
    )
}

export default DataChart