'use client';

import { Dropdown, DropdownItem } from 'flowbite-react'
import React, { useEffect } from 'react'
import { HiViewGrid, HiViewList } from 'react-icons/hi'

interface MKViewToggleProps {
    onChoice?: (choice: string) => void
}

const MKViewToggle = ({ onChoice }: MKViewToggleProps) => {
    const [selectedView, setSelectedView] = React.useState<'grid-view' | 'list-view'>('grid-view');

    useEffect(() => {
        if (onChoice) {
            onChoice(selectedView);
        }
    }, [selectedView, onChoice])

    return (
        <Dropdown label="" renderTrigger={() => {
            return (
                selectedView === 'grid-view' ?
                    <span className='cursor-pointer group flex gap-2 items-center border border-primary-800 bg-gray-50 text-gray-800 rounded-4xl px-2 py-1 sm:px-4 sm:py-1.5 text-sm sm:text-lg dark:bg-gray-800 dark:text-gray-50 dark:border-gray-50 transition-colors duration-300 ease-in hover:bg-primary-800 hover:text-gray-50 dark:hover:bg-gray-50 dark:hover:text-gray-800'><HiViewGrid /> <span className='hidden sm:inline'>Grid View</span></span> :
                    <span className='cursor-pointer group flex gap-2 items-center border border-primary-800 bg-gray-50 text-gray-800 rounded-4xl px-2 py-1 sm:px-4 sm:py-1.5 text-sm sm:text-lg dark:bg-gray-800 dark:text-gray-50 dark:border-gray-50 transition-colors duration-300 ease-in hover:bg-primary-800 hover:text-gray-50 dark:hover:bg-gray-50 dark:hover:text-gray-800'><HiViewList /> <span className='hidden sm:inline'>List View</span></span>)
        }}>
            <DropdownItem value={'grid-view'} className='flex flex-nowrap gap-4' onClick={() => setSelectedView('grid-view')}><HiViewGrid /> Grid View</DropdownItem>
            <DropdownItem value={'list-view'} className='flex flex-nowrap gap-4' onClick={() => setSelectedView('list-view')}><HiViewList /> List View</DropdownItem>
        </Dropdown>
    )
}

export default MKViewToggle