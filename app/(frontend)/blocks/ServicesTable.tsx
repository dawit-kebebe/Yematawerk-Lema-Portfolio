import type { ServiceTable } from '@/payload-types';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeadCell,
    TableRow,
} from 'flowbite-react';
import Section from '../components/motion/Section';
import SectionTitle from '../components/SectionTitle';

interface ServicesTableProps {
    data: ServiceTable;
    className?: string;
}

export default function ServicesTable({ data, className }: ServicesTableProps) {
    const columns = data.columns ?? [];
    const rows = data.rows ?? [];

    return (
        <Section
            className={`py-8 px-4 md:px-8 2xl:px-16 ${className ?? ''}`}
            aria-label="Services Table Section"
            id={data.blockType}
        >
            <SectionTitle title={data.section_title || 'Services'} />

            <div className="overflow-x-auto mt-12">
                <Table striped>
                    <TableHead>
                        <TableRow>
                            {/* Top-left corner cell — blank, acts as the row-label column header */}
                            <TableHeadCell />
                            {columns.map((col) => (
                                <TableHeadCell key={col.id}>{col.label}</TableHeadCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody className="divide-y">
                        {rows.map((row) => (
                            <TableRow
                                key={row.id}
                                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                            >
                                {/* Feature / service label — first cell acts as the row header */}
                                <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {row.label}
                                </TableCell>

                                {/* One cell per column; blank values fall back to '-' */}
                                {columns.map((col, colIndex) => {
                                    const entry = row.values?.[colIndex];
                                    const display =
                                        entry?.value && entry.value.trim() !== ''
                                            ? entry.value
                                            : '-';
                                    return (
                                        <TableCell key={col.id}>{display}</TableCell>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </Section>
    );
}
