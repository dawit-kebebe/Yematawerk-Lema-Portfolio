"use client";

import { Author } from '@/payload-types';
import { Card } from '@frontend/components/Card';
import { Accordion, AccordionContent, AccordionPanel, AccordionTitle, Button, Label, Radio } from 'flowbite-react';
import React, { useCallback } from 'react';

interface FilterFormProps {
    filter: string;
    authorFilter: string;
    authors: Author[];
}

const FilterForm = ({ filter, authorFilter, authors }: FilterFormProps) => {

    const handleOnReset = useCallback((e?: React.MouseEvent<HTMLElement>) => {
        e?.preventDefault();

        const form = e?.currentTarget.closest('form');
        if (form) {
            const inputs = form.querySelectorAll('input[type="radio"]') as NodeListOf<HTMLInputElement>;
            inputs.forEach(input => {
                input.checked = false;
            });
        }
    }, []);

    return (
        <Card className="max-w-md w-full p-0!">
            <div className="w-full h-full flex flex-col gap-4 p-4">
                <h3 className="font-semibold text-xl">Filter</h3>
                <hr className='text-gray-300 dark:text-gray-700' />
                <form className="flex flex-col">
                    {/* <hr className='text-gray-300 dark:text-gray-700 mt-4' /> */}
                    <Accordion>
                        <AccordionPanel>
                            <AccordionTitle className="font-semibold text-lg mt-2">
                                Date
                            </AccordionTitle>
                            <AccordionContent className='flex flex-col gap-2'>
                                <Label htmlFor="date-today" className="font-normal text-lg">
                                    <Radio value="date-today" name="filter" className="mr-2" defaultChecked={filter === "date-today"} />
                                    Today
                                </Label>
                                <Label htmlFor="date-week" className="font-normal text-lg">
                                    <Radio value="date-week" name="filter" className="mr-2" defaultChecked={filter === "date-week"} />
                                    This Week
                                </Label>
                                <Label htmlFor="date-month" className="font-normal text-lg">
                                    <Radio value="date-month" name="filter" className="mr-2" defaultChecked={filter === "date-month"} />
                                    This Month
                                </Label>
                            </AccordionContent>
                        </AccordionPanel>
                        <AccordionPanel>
                            <AccordionTitle className="font-semibold text-lg mt-2">
                                Authors
                            </AccordionTitle>
                            <AccordionContent className='flex flex-col gap-2'>
                                {
                                    authors.map(author => (
                                        <Label htmlFor={author.id} className="font-normal text-lg" key={author.id}>
                                            <Radio value={author.id} name="author" className="mr-2" defaultChecked={authorFilter === author.id} />
                                            {author.name}
                                        </Label>
                                    ))
                                }
                            </AccordionContent>
                        </AccordionPanel>
                    </Accordion>
                    <hr className='text-gray-300 dark:text-gray-700 mt-4' />
                    <div className='flex w-full gap-4 justify-end'>
                        <Button color={'alternative'} className="w-fit inline text-gray-800 dark:text-gray-200 cursor-pointer text-xl font-semibold my-auto" onClick={handleOnReset}> Reset </Button>
                        <Button className="w-fit my-4" type='submit'>Apply Filter</Button>
                    </div>
                </form>
            </div>
        </Card>
    )
}

export default FilterForm