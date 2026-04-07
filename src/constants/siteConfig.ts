export const siteConfig = {
	siteName: 'にほんじんログ',
	gtmId: 'P9S9MBMF',
	baseUrl:
		process.env.NODE_ENV === 'development'
			? 'http://localhost:3000'
			: 'https://nihonjinlog.com',
};
