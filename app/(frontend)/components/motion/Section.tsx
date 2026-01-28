"use client";

import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface SectionProps {
    children: ReactNode
    [key: string]: string | unknown;
}

const Section = ({ children, ...props }: SectionProps) => {
    return (
        <motion.section
            {...props}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
        >
            {children}
        </motion.section >
    )
}

export default Section