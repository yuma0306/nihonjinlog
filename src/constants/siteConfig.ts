export const siteConfig = {
	siteName: 'にほんじんログ',
	gtmId: '5MBX2WQF',
	baseUrl:
		process.env.NODE_ENV === 'development'
			? 'http://localhost:3000'
			: 'https://nihonjinlog.vercel.app',
};
