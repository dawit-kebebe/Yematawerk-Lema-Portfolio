"use client";

import React, { ReactNode } from 'react'
import { motion } from 'motion/react'

interface LandingHighlightProps {
    children: ReactNode
    [key: string]: string | unknown;
}


const LandingHighlight = ({ children, ...props }: LandingHighlightProps) => {
    return (
        <motion.section
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            // viewport={{ once: true }}
            transition={{ duration: 1, ease: 'easeIn' }}
            {...props}
        >
            {children}
        </motion.section >
    )
}

export default LandingHighlight