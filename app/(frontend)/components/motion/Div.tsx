"use client";

import React, { ReactNode } from 'react'
import { motion } from 'motion/react'

interface DivProps {
    children: ReactNode
    [key: string]: string | unknown;
}


const Div = ({ children, ...props }: DivProps) => {
    return (
        <motion.section
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            // viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            {...props}
        >
            {children}
        </motion.section >
    )
}

export default Div