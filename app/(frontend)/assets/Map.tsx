"use client";

import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react'
import { Tooltip } from 'flowbite-react';

interface MapProps {
    pinPoint: number;
    className?: string;
}

const Map = ({ pinPoint, className }: MapProps) => {
    const path = useRef<SVGPathElement>(null);
    const pin = useRef<SVGSVGElement>(null);
    const [coords, setCoords] = useState({
        x: '0',
        y: '0'
    })

    useEffect(() => {
        if (path.current) {
            const totalLength = path.current.getTotalLength();
            const point = path.current.getPointAtLength(totalLength * pinPoint);

            const pinWidth = 179;
            const pinHeight = 266;

            // pin.current.setAttribute('x', (point.x - pinWidth / 2).toString());
            // pin.current.setAttribute('y', (point.y - pinHeight).toString());

            setCoords({
                x: (point.x - pinWidth / 2).toString(),
                y: (point.y - pinHeight).toString()
            })
        }
    }, [path, coords.x, coords.y, pinPoint]);

    return (
        <svg viewBox="0 0 2000 2000" xmlns="http://www.w3.org/2000/svg" className={`${className}`}>
            <path
                d="M18 1535.29C75.6035 1515.78 221.116 1488.46 342.336 1535.29C493.862 1593.82 1019.9 1793.43 1230.21 1664.36C1440.52 1535.29 1819.08 1447.74 2000 1535.29M0 796.056C87.2617 854.26 240.068 862.112 604.498 831.148C776.459 816.538 1094.81 744.091 1199 831.148M862.072 605C791.868 562.656 666.755 452.924 801 321.408M801 321.408C884.446 215.797 1142.5 -172 1142.5 -172M801 321.408C888.262 379.612 1041.07 387.464 1405.5 356.5C1577.46 341.889 1895.81 269.442 2000 356.5"
                strokeWidth="20"
                className='stroke-gray-200 dark:stroke-gray-600'
                fill='none' />
            <path
                d="M0 1881L428.136 1844.6C428.4 1841.61 428.688 1838.56 429 1835.46M429 1835.46C445.476 1671.44 529.215 1350.35 742.731 1308.14H776.268M429 1835.46V1070H-7M429 1835.46V1855L744.5 2004.5M776.268 1308.14H1130.99L1171.62 1032.42M776.268 1308.14L789.469 1032.42H1171.62M776.268 1308.14L743 2003M1171.62 1032.42L1204.1 812H2000L1317.93 1468.85M1171.62 1032.42H1771.12M0 218.817C109.959 207.648 350.025 214.416 430.614 330.842L567.589 607.143M567.589 607.143L710.772 895.968L786 1041M567.589 607.143L-0.5 621.566M567.589 607.143L1164.06 592L1201.5 817M1693.5 2004L1320.24 1621.25M759 2004L1164.06 1623.5M1239.44 1664.81C1172.81 1664.81 1118.79 1610.84 1118.79 1544.26C1118.79 1511.72 1131.69 1482.19 1152.66 1460.51C1174.6 1437.81 1205.37 1423.7 1239.44 1423.7C1306.07 1423.7 1360.08 1477.68 1360.08 1544.26C1360.08 1610.84 1306.07 1664.81 1239.44 1664.81Z"
                strokeWidth="30"
                className='stroke-gray-800 dark:stroke-gray-400'
                ref={path}
                fill='none' />


            <motion.svg
                className='text-red-700'
                width="179"
                height="266"
                viewBox="0 0 539 800"
                fill="none"
                ref={pin}
                xmlns="http://www.w3.org/2000/svg"
                key={`${coords.x}-${coords.y}`}
                initial={{
                    opacity: 0,
                    scale: 0.8
                }}
                animate={{
                    opacity: 1,
                    scale: 1,

                }}
                transition={{
                    opacity: { duration: 0.4 },
                }}
                x={coords.x}
                y={coords.y}
            >
                <path d="M269.306 0C120.553 0 0 120.555 0 269.306C0 421.122 75.2469 453.466 158.416 554.455C257.894 675.252 269.306 800 269.306 800C269.306 800 280.719 675.252 380.197 554.456C463.366 453.466 538.613 421.122 538.613 269.308C538.613 120.555 418.059 0 269.306 0ZM269.306 362.377C217.905 362.377 176.238 320.708 176.238 269.308C176.238 217.908 217.906 176.239 269.306 176.239C320.706 176.239 362.375 217.908 362.375 269.308C362.375 320.708 320.706 362.377 269.306 362.377Z" fill="currentColor" />
            </motion.svg>



        </svg>
    )
}

export default Map