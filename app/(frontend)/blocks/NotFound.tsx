import React from 'react'

interface NotFoundProps {
    page?: string;
}


const NotFound = ({ page = 'Page' }: NotFoundProps) => {
    return (
        <div className='flex items-center justify-center text-3xl text-center h-screen w-full '>
            <h1 className="text-4xl font-bold mb-4">404</h1>
            <p>{page} Not Found</p>
        </div>
    )
}

export default NotFound