import MKAltCard from '@frontend/components/MKAltCard';
import { readingTime } from '@frontend/utils/readtime';
import { Social } from '@/payload-types';
import config from "@/payload.config";
import { RichText } from '@payloadcms/richtext-lexical/react';
import Image from 'next/image';
import { getPayload } from 'payload';
import { BsStopwatch } from 'react-icons/bs';
import { ContactUs } from '@frontend/blocks/ContactUs';
import { getLexicalText } from '@frontend/utils/getLexicalText';

const AboutPage = async () => {

    try {
        let socials: Social[] = [];
        const payload = await getPayload({ config });

        const aboutGlobal = await payload.findGlobal({ slug: 'about' })
        const socialsCollection = await payload.find({ collection: 'socials' });

        socials = socialsCollection.docs

        if (typeof aboutGlobal?.banner === 'string') {
            return (<>Banner image not found</>)
        }

        return (
            <div className='mt-4 w-full px-2 md:px-4'>
                {
                    aboutGlobal && (<>
                        <MKAltCard
                            className={`relative w-full h-80 md:h-150 mb-12`}
                        >
                            <Image
                                src={`${aboutGlobal.banner.url}`}
                                alt={`Banner image for ${aboutGlobal.banner.alt}`}
                                width={aboutGlobal.banner.width || 1920}
                                height={aboutGlobal.banner.height || 1080}
                                className='w-full h-full object-cover'
                                loading="lazy"
                                placeholder="blur"
                                blurDataURL={`${aboutGlobal.banner.thumbnailURL || "/default-banner.png"}`}
                            />
                            <div className="absolute left-0 top-0 z-1 p-4 h-full w-full flex flex-col gap-4 justify-end px-2 md:px-16 bg-[rgba(0,0,0,0.5)]">
                                <span className="w-fit h-fit p-4">
                                    <h1 className="text-gray-50 md:text-8xl sm:text-5xl text-4xl font-semibold line-clamp-1">{aboutGlobal.title}</h1>
                                    {aboutGlobal.description ? <p className="text-gray-50 sm:text-3xl text-2xl my-4 overflow-hidden wrap-break-words line-clamp-3">{aboutGlobal.description}</p> : null}
                                    <p className="flex items-center gap-2 text-white sm:text-2xl text-xl font-light">
                                        <span><BsStopwatch /></span>
                                        <span>{`${readingTime(getLexicalText(aboutGlobal.content) || '').toString()} min read`}</span>
                                    </p>
                                </span>
                            </div>
                        </MKAltCard>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 p-4">
                            <div className="w-full md:col-span-2 space-y-4 text-lg">
                                <RichText className='rich-text text-xl' data={aboutGlobal.content} />
                            </div>

                            <div className="w-full md:col-span-1 flex items-start justify-center">
                                <ContactUs apiEndpoint="/api/contact" socials={socials} />
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

export const revalidate = 3600; // Revalidate every hour