import type { Metadata } from "next";
import { Poppins, Michroma } from 'next/font/google';
import "./globals.css";
import Header from "@/app/(frontend)/components/Header";
import { ThemeModeScript } from "flowbite-react";
import { getPayload } from "payload";
import config from "@/payload.config";

const poppins = Poppins({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-poppins',
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const michroma = Michroma({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-michroma',
	// adjust weights if needed; michroma may only have limited weights
	weight: ['400'],
});

export const metadata: Metadata = {
	title: "Yematawerk Lema",
	description: "Personal portfolio of Yematawerk Lema. A Digital Marketer, Graphic Designer and Youtube Strategist.",
	icons: '/'
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {

	const payload = await getPayload({ config });

	const headerGlobal = await payload.findGlobal({ slug: 'header' } as any)

	return (
		<html lang="en" suppressHydrationWarning className={`${poppins.variable} ${michroma.variable}`}>
			<head>
				<ThemeModeScript />
			</head>
			<body>
				{
					headerGlobal && <Header data={headerGlobal} />
				}
				<div className="max-w-450 mx-auto">
					{children}
				</div>
			</body>
		</html>
	);
}
