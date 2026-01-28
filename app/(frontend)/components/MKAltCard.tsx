import React from 'react'

interface MKCardProps {
    children: React.ReactNode
    className?: string
}

const MKAltCard = ({ children, className }: MKCardProps) => {


    return (
        <div className={`overflow-hidden rounded-sm sm:rounded-lg md:rounded-xl ${className}`}            >
            {children}
        </div>
    )
}

export default MKAltCard