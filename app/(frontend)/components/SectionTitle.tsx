import React from 'react'

interface SectionTitleProps {
    title: string;
}

const SectionTitle = ({ title }: SectionTitleProps) => {
    return (
        <>
            <h1 className='text-3xl text-center font-semibold'>{title}</h1>
        </>
    )
}

export default SectionTitle