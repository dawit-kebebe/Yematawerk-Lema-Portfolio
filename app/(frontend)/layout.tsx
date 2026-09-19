import Header from "@/app/(frontend)/components/Header";
import config from "@/payload.config";
import { ThemeModeScript } from "flowbite-react";
import type { Metadata } from "next";
import { Geist, Michroma } from 'next/font/google';
import { getPayload } from "payload";
import Footer from "./components/Footer";
import GoogleCaptchaProvider from "./components/GoogleCaptchaProvider";
import "./globals.css";
import { SocialsType } from "./types/collections/Socials";
import { getThemeCSS } from "./utils/theme";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const michroma = Michroma({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-michroma',
	weight: ['400'],
});

export async function generateMetadata(): Promise<Metadata> {
	try {
		const payload = await getPayload({ config });
		const siteSettings: any = await payload.findGlobal({ slug: 'site-settings' } as any);

		const title: string = siteSettings?.siteTitle || 'My Site';
		const description: string = siteSettings?.siteDescription || '';

		const faviconUrl: string | undefined =
			siteSettings?.favicon &&
			typeof siteSettings.favicon === 'object' &&
			'url' in siteSettings.favicon
				? siteSettings.favicon.url
				: undefined;

		const ogImageUrl: string | undefined =
			siteSettings?.ogImage &&
			typeof siteSettings.ogImage === 'object' &&
			'url' in siteSettings.ogImage
				? siteSettings.ogImage.url
				: undefined;

		return {
			title,
			description,
			...(faviconUrl && {
				icons: { icon: faviconUrl },
			}),
			openGraph: {
				title,
				description,
				...(ogImageUrl && {
					images: [{ url: ogImageUrl }],
				}),
			},
		};
	} catch {
		// Fall back to safe defaults if the CMS is unreachable during build
		return {
			title: 'My Site',
			description: '',
		};
	}
}

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {

	const payload = await getPayload({ config });

	const headerGlobal: any = await payload.findGlobal({ slug: 'header' } as any);
	const socialsCollection = await payload.find({ collection: 'socials' } as any);

	const socials = (socialsCollection.docs as any)?.map((social: SocialsType) => {
		return {
			id: social.id,
			label: social.label,
			url: social.url,
			icon: social.icon
		}
	});

	const themeCSS = getThemeCSS(headerGlobal?.colorTheme);

	return (
		<html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${michroma.variable}`}>
			<head>
				<ThemeModeScript defaultMode="dark" />
				<style dangerouslySetInnerHTML={{ __html: themeCSS }} />
			</head>
			<body>
				{
					headerGlobal && <Header data={headerGlobal} />
				}
				<div className="max-w-450 mx-auto">
					<GoogleCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_FRONTEND_KEY || ''}>
						{children}
					</GoogleCaptchaProvider>
				</div>
				{
					headerGlobal && socials && <Footer data={headerGlobal} socials={socials} />
				}
			</body>
		</html >
	);
}

export const dynamic = 'force-dynamic';