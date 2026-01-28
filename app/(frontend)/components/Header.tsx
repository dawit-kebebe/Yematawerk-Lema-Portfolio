"use client";

import { Button, DarkThemeToggle, Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";

interface HeaderProps {
    data: {
        globalType: string;
        title: string;
        logo: {
            alt: string;
            filename: string;
            mimeType: string;
            filesize: number;
            width: number;
            height: number;
            id: string;
            url: string;
            thumbnailURL: string | null;
        };
        navigationLinks: {
            label: string;
            url: string;
            id: string;
        }[];
        cta_button: {
            label: string;
            url: string;
        } | null;
        id: string;
    }
}

export function Header({ data }: HeaderProps) {

    return (
        <Navbar fluid rounded className="sticky top-0 left-0 z-100 shadow-lg">
            <NavbarBrand href="https://flowbite-react.com">
                <Image src={data.logo?.url || '/favicon.svg'} alt={data.logo?.alt || 'Logo'} width={40} height={40} className="mr-3 h-6 sm:h-9" />
                <span className="hidden sm:inline self-center whitespace-nowrap text-xl font-semibold text-gray-900 dark:text-white">{data.title}</span>
            </NavbarBrand>
            <div className="flex md:order-2">
                <DarkThemeToggle className="mx-4 p-4 text-xl cursor-pointer" />
                {/* {data.cta_button && (
                    <Button className="hidden sm:block text-xl cursor-pointer"><Link href={data.cta_button.url}>{data.cta_button.label}</Link></Button>
                )} */}
                <NavbarToggle />
            </div>
            <NavbarCollapse>
                {/* <NavbarLink href="#" className="text-xl">
                    Home
                </NavbarLink>
                
                <NavbarLink href="#" className="text-xl">Portfolio</NavbarLink>
                <NavbarLink href="#" className="text-xl">Stats</NavbarLink>
                <NavbarLink href="#" className="text-xl">Testimonials</NavbarLink>
                <NavbarLink href="#" className="text-xl">Blogs</NavbarLink>
                <NavbarLink href="#" className="text-xl">Contacts</NavbarLink> */}
                {data.navigationLinks.map((link) => (
                    <NavbarLink key={link.id} href={link.url} className="text-xl">
                        {link.label}
                    </NavbarLink>
                ))}
                {/* {data.cta_button && (
                    <Button className="sm:hidden mt-2 block text-xl cursor-pointer"><Link href={data.cta_button.url}>{data.cta_button.label}</Link></Button>
                )} */}
            </NavbarCollapse>
        </Navbar>
    );
}


export default Header