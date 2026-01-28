"use client";

import { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import randomColor from 'randomcolor';
import {
    ArcElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from "chart.js";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title
);


const LineChart = () => {

    const COMPANY_LABELS = ['Donkey Tube A/Oromo', 'Donkey Tube', 'The Greatness Show', 'Alive Podcast'];
    const report: {
        label: string,
        data: number[],
        borderColor: string,
        //backgroundColor: color,
        tension: 0.5,
        fill: false,
    }[] = [
            {
                label: COMPANY_LABELS[0],
                data: [45, 78, 91, 23, 67, 82, 54],
                borderColor: '',
                //backgroundColor: color,
                tension: 0.5,
                fill: false,
            },
            {
                label: COMPANY_LABELS[1],
                data: [19, 56, 34, 88, 72, 41, 95],
                borderColor: '',
                //backgroundColor: color,
                tension: 0.5,
                fill: false,
            },
            {
                label: COMPANY_LABELS[2],
                data: [63, 27, 85, 49, 11, 76, 38],
                borderColor: '',
                //backgroundColor: color,
                tension: 0.5,
                fill: false,
            },
            {
                label: COMPANY_LABELS[3],
                data: [92, 14, 58, 71, 33, 89, 46],
                borderColor: '',
                //backgroundColor: color,
                tension: 0.5,
                fill: false,
            }
        ];

    const lineChartData = useMemo(() => {
        if (!report || report.length <= 0) return null;

        const labels = COMPANY_LABELS;
        // const maxLen = labels.length;

        const datasets = report.map(item => {
            // const frequencies = Array(maxLen).fill(0);

            const color = randomColor();
            item.borderColor = color;
            return item;
        });

        return { labels, datasets };
    }, [report, COMPANY_LABELS]);

    return (
        <div className='w-full'>
            <Line
                options={{

                }}
                data={lineChartData as any}
                className='w-full'
            />
        </div>
    )
}

export default LineChart;