import { createClient } from 'microcms-js-sdk';
import type { MicroCMSQueries } from 'microcms-js-sdk';

export const endpoints = {
	categories: 'categories',
	directories: 'directories',
	blogs: 'blogs',
} as const;

if (!process.env.MICROCMS_SERVICE_DOMAIN) {
	throw new Error('MICROCMS_SERVICE_DOMAINがありません。');
}
if (!process.env.MICROCMS_API_KEY) {
	throw new Error('MICROCMS_API_KEYがありません。');
}

const client = createClient({
	serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
	apiKey: process.env.MICROCMS_API_KEY,
});

export const fetchList = async <T>(
	endpoint: keyof typeof endpoints,
	queries?: MicroCMSQueries,
) => {
	const data = await client.getList<T>({
		endpoint: endpoint,
		queries,
	});
	return data;
};

export const fetchListDetail = async <T>(
	endpoint: keyof typeof endpoints,
	contentId: string,
	queries?: MicroCMSQueries,
) => {
	const detailData = await client.getListDetail<T>({
		endpoint: endpoint,
		contentId,
		queries,
	});
	return detailData;
};
