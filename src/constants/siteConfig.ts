const domain = 'https://nihonjinlog.vercel.app/';
export const siteName = 'にほんじんログ';
export const gtmId = '5MBX2WQF';
export const baseUrl =
	process.env.NODE_ENV === 'development'
		? 'http://localhost:3000'
		: `https://${domain}`;
