import MKAltCard from '@frontend/components/MKAltCard';
import { readingTime } from '@frontend/utils/readtime';
// import { MKSubscriptionCard } from '@/app/components/MKSubscribeForm';
import config from "@/payload.config";
import { RichText } from '@payloadcms/richtext-lexical/react';
import Image from 'next/image';
import { getPayload } from 'payload';
import { BsStopwatch } from 'react-icons/bs';
import type { AboutPageType } from '../types/pages/About';
import React from 'react';

const AboutPage = async () => {

    try {
        // const aboutRes = await fetch(`${process.env.BACKEND_API}/about?populate=banner`)

        // const about = await aboutRes.json();

        const payload = await getPayload({ config });

        // const pages = await payload.find({
        //   collection: 'pages',
        //   where: {
        //     slug: { equals: 'landing-page' }
        //   }
        // } as any);
        // [LandingType, CompaniesType, TestimonialsType, ImagePortfolioType, YamiTourType, AboutType]

        const aboutGlobal: AboutPageType = await payload.findGlobal({ slug: 'about' } as any)

        return (
            <div className='w-full'>
                {
                    aboutGlobal && (<>
                        <MKAltCard
                            className={`relative w-full h-[${aboutGlobal.banner.height}px]`}
                        >
                            <Image
                                src={`${aboutGlobal.banner.url}`}
                                alt={`Banner image for ${aboutGlobal.banner.alt}`}
                                width={aboutGlobal.banner.width}
                                height={aboutGlobal.banner.height}
                                className='w-full h-full object-cover'
                                loading="lazy"
                                placeholder="blur"
                                blurDataURL={`${aboutGlobal.banner.thumbnailURL}`}
                            />
                            <div className="absolute left-0 top-0 z-1 p-4 h-full w-full flex flex-col gap-4 justify-end px-2 md:px-16 bg-[rgba(0,0,0,0.5)]">
                                <span className="w-fit h-fit p-4">
                                    <h1 className="text-gray-50 md:text-8xl sm:text-5xl text-4xl font-semibold line-clamp-1">{aboutGlobal.title}</h1>
                                    {aboutGlobal.description ? <p className="text-gray-50 sm:text-4xl text-3xl my-4 overflow-hidden break-words line-clamp-3">{aboutGlobal.description}</p> : null}
                                    <p className="flex items-center gap-2 text-white sm:text-2xl text-xl font-light">
                                        <span><BsStopwatch /></span>
                                        <span>{`${readingTime(aboutGlobal.content?.toString() || '').toString()} min read`}</span>
                                    </p>
                                </span>
                            </div>
                        </MKAltCard>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 rounded-md p-4">
                            <div className="w-full md:col-span-2 space-y-4 text-lg">
                                {/* <MarkdownTransformer markdown={about.data?.content} /> */}
                                {/* <div dangerouslySetInnerHTML={{ __html: aboutGlobal.content || '' }} /> */}
                                {/* {JSON.stringify(aboutGlobal.content)} */}
                                <RichText className='rich-text text-xl' data={aboutGlobal.content} />
                            </div>

                            <div className="w-full md:col-span-1 flex items-start justify-center">
                                {/* <MKSubscriptionCard /> */}
                            </div>
                        </div>
                    </>)
                }
            </div >
        )
    }
    catch (error) {
        console.error(error);
        return (<>Unknown Error</>)
    }
}




export default AboutPage