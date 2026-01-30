"use client";

import { Social } from "@/payload-types";
import {
    Footer as FlowbiteFooter,
    FooterBrand,
    FooterCopyright,
    FooterDivider
} from "flowbite-react";
import { GalleryItem } from "../types/GalleryItem";
import Socials from "./Socials";

interface FooterProps {
    data: {
        title: string;
        logo: GalleryItem;
    }
    socials?: Social[];
}


const Footer = ({ data, socials }: FooterProps) => {

    const { title, logo } = data;

    return (
        <FlowbiteFooter container className="bg-primary-800 dark:bg-primary-800 rounded-none">
            <div className="w-full">
                <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
                    <div className="mb-4">
                        {logo && <FooterBrand
                            className="[&>span]:text-gray-300!"
                            href="/"
                            src={logo?.url || '/favicon.svg'}
                            alt={logo?.alt || 'Logo'}
                            name={title}
                        />}
                    </div>
                    {/* <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
                        <div>
                            <FooterTitle title="about" />
                            <FooterLinkGroup col>
                                <FooterLink href="#">Flowbite</FooterLink>
                                <FooterLink href="#">Tailwind CSS</FooterLink>
                            </FooterLinkGroup>
                        </div>
                        <div>
                            <FooterTitle title="Follow us" />
                            <FooterLinkGroup col>
                                <FooterLink href="#">Github</FooterLink>
                                <FooterLink href="#">Discord</FooterLink>
                            </FooterLinkGroup>
                        </div>
                        <div>
                            <FooterTitle title="Legal" />
                            <FooterLinkGroup col>
                                <FooterLink href="#">Privacy Policy</FooterLink>
                                <FooterLink href="#">Terms &amp; Conditions</FooterLink>
                            </FooterLinkGroup>
                        </div>
                    </div> */}
                </div>
                <FooterDivider className="lg:my-6 dark:border-gray-400" />
                <div className="w-full sm:flex sm:items-center sm:justify-between">
                    <FooterCopyright href="https://www.linkedin.com/in/dawit-kebebe-209239289/" by=" Dawit Kebebe Gelalcha" year={2026} className="text-gray-50" />
                    <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
                        <Socials socials={socials} className="text-gray-300!" />
                    </div>
                </div>
            </div>
        </FlowbiteFooter>
    )
}

export default Footer