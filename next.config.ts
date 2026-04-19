import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	reactStrictMode: true,
	trailingSlash: true,
	images: {
		formats: ['image/avif', 'image/webp'],
		minimumCacheTTL: 60 * 60 * 24 * 7, // 7日
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'images.microcms-assets.io',
				pathname: '/**',
			},
		],
	},
};

export default nextConfig;
