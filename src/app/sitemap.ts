import { siteConfig } from '@/constants/siteConfig';
import { siteRoutes } from '@/constants/siteRoutes';
import { endpoints, fetchList } from '@/libs/microcms';
import type {
	CategoryType,
	InfoType,
	ThailandType,
} from '@/libs/microcms.type';
import type { MetadataRoute } from 'next';

const toSitemapDate = (date: string | Date) =>
	new Date(date).toISOString().split('T')[0];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const routes = [
		{
			url: `${siteConfig.baseUrl}/`,
			lastModified: toSitemapDate(new Date()),
			changeFrequency: 'weekly' as const,
			priority: 1.0,
		},
	];

	const { contents: thailandPosts } = await fetchList<ThailandType>(
		endpoints.thailand,
	);
	const thailandPostUrls = thailandPosts.map((thailandPost) => {
		return {
			url: `${siteConfig.baseUrl}${siteRoutes.thailandDetail.path(thailandPost.id)}`,
			lastModified: toSitemapDate(thailandPost.updatedAt),
			changeFrequency: 'weekly' as const,
			priority: 0.8,
		};
	});

	const { contents: categories } = await fetchList<CategoryType>(
		endpoints.categories,
	);
	const categoryUrls = categories.map((category) => {
		return {
			url: `${siteConfig.baseUrl}${siteRoutes.category.path(category.id)}`,
			lastModified: toSitemapDate(category.updatedAt),
			changeFrequency: 'weekly' as const,
			priority: 0.8,
		};
	});

	const { contents: infos } = await fetchList<InfoType>(endpoints.info);
	const infoUrls = infos.map((info) => {
		return {
			url: `${siteConfig.baseUrl}${siteRoutes.info.path}${info.id}/`,
			lastModified: toSitemapDate(info.updatedAt),
			changeFrequency: 'monthly' as const,
			priority: 0.3,
		};
	});

	return [...routes, ...thailandPostUrls, ...infoUrls];
}
