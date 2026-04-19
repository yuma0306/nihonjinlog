import { GoogleTagManager } from '@next/third-parties/google';
import { Noto_Serif_JP } from 'next/font/google';
import '../styles/global.scss';
import { siteConfig } from '@/constants/siteConfig';
import type { Viewport } from 'next';

const font = Noto_Serif_JP({
	weight: ['400', '500', '700'],
	subsets: ['latin'],
	display: 'swap',
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ja" data-scroll-behavior="smooth">
			{process.env.NODE_ENV === 'production' && siteConfig.gtmId && (
				<GoogleTagManager gtmId={`GTM-${siteConfig.gtmId}`} />
			)}
			<body className={font.className}>{children}</body>
		</html>
	);
}

export const viewport: Viewport = {
	themeColor: '#565656',
};
