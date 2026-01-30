import { Social } from '@/payload-types';
import Link from 'next/link';
import { BsPinterest } from 'react-icons/bs';

interface SocialsProps {
    className?: string;
    socials?: Social[];
}

const Socials = ({ className, socials }: SocialsProps) => {
    return (
        <div className={`text-gray-700 dark:text-gray-300  flex flex-nowrap items-center w-full justify-center gap-4 my-4 ${className}`}>
            {
                socials?.map((social) => {
                    let IconComponent;
                    switch (social.icon) {
                        case 'facebook':
                            IconComponent = require('react-icons/bs').BsFacebook;
                            break;
                        case 'instagram':
                            IconComponent = require('react-icons/bs').BsInstagram;
                            break;
                        case 'twitter':
                            IconComponent = require('react-icons/bs').BsTwitterX;
                            break;
                        case 'tiktok':
                            IconComponent = require('react-icons/bs').BsTiktok;
                            break;
                        case 'youtube':
                            IconComponent = require('react-icons/bs').BsYoutube;
                            break;
                        case 'email':
                            IconComponent = require('react-icons/bs').BsMailbox2;
                            break;
                        case 'linkedin':
                            IconComponent = require('react-icons/bs').BsLinkedin;
                            break;
                        case 'github':
                            IconComponent = require('react-icons/bs').BsGithub;
                            break;
                        case 'pinterest':
                            IconComponent = BsPinterest;
                            break;
                        case 'website':
                        default:
                            IconComponent = require('react-icons/bs').BsGlobe;
                            break;
                    }

                    return IconComponent ? (
                        <Link
                            key={social.id}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={social.label}
                            className={`hover:text-${social.icon === 'facebook' ? 'blue-500' :
                                social.icon === 'instagram' ? 'pink-500' :
                                    social.icon === 'twitter' ? 'sky-500' :
                                        social.icon === 'tiktok' ? 'black' :
                                            social.icon === 'youtube' ? 'red-600' :
                                                social.icon === 'email' ? 'green-500' :
                                                    social.icon === 'linkedin' ? 'blue-500' :
                                                        social.icon === 'github' ? 'gray-900' :
                                                            social.icon === 'pinterest' ? 'red-500' :
                                                                'purple-500'
                                }`}
                        >
                            <IconComponent size={28} />
                        </Link>
                    ) : null;
                })
            }

        </div>
    )
}

export default Socials