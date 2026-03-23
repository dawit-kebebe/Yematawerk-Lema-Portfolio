
import { Services } from "@/payload-types";
import { Card } from "flowbite-react";
import Div from "./motion/Div";

interface ServiceCardProps {
    data: Services['services'][0]
}

export function ServiceCard({ data }: ServiceCardProps) {
    return (
        <Div className="hover:shadow-lg transition-shadow duration-300">
            <Card className="max-w-sm">
                <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">{data.title}</h5>
                <div className="flex items-baseline text-gray-900 dark:text-white">
                    <span className="text-5xl font-extrabold tracking-tight">{data.price}</span>
                    <span className="text-3xl font-semibold">{data.currency}</span>
                    <span className="ml-1 text-xl font-normal text-gray-500 dark:text-gray-400">/{data.period}</span>
                </div>
                <ul className="my-7 space-y-5">
                    {
                        data.service_items.map((item: any) => {
                            return item.isIncluded ? (
                                <li className="flex space-x-3">
                                    <svg
                                        className="h-5 w-5 shrink-0 text-primary-600 dark:text-primary-500"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">{item.caption}</span>
                                </li>
                            ) : (
                                <li className="flex space-x-3 line-through decoration-gray-500">
                                    <svg
                                        className="h-5 w-5 shrink-0 text-gray-400 dark:text-gray-500"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span className="text-base font-normal leading-tight text-gray-500">{item.caption}</span>
                                </li>
                            )
                        })
                    }
                </ul>
                {/* {data.cta && <Link href={data.cta.url}><Button className="w-full cursor-pointer">{data.cta.label}</Button></Link>} */}
            </Card>
        </Div>
    );
}
