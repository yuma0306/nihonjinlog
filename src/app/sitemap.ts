import { siteConfig } from '@/constants/siteConfig';
import { siteRoutes } from '@/constants/siteRoutes';
import { endpoints, fetchList } from '@/libs/microcms';
import type { BlogsType, CategoriesType } from '@/libs/microcms.type';
import type { MetadataRoute } from 'next';

const toSitemapDate = (date: string | Date) =>
	new Date(date).toISOString().split('T')[0];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const routes = [
		{
			url: `${siteConfig.baseUrl}/`,
			lastModified: toSitemapDate(new Date()),
		},
	];

	const { contents: thailandPosts } = await fetchList<BlogsType>(
		endpoints.blogs,
	);
	const thailandPostUrls = thailandPosts.map((thailandPost) => {
		return {
			url: `${siteConfig.baseUrl}${siteRoutes.thailandDetail.path(thailandPost.id)}`,
			lastModified: toSitemapDate(thailandPost.updatedAt),
		};
	});

	const { contents: categories } = await fetchList<CategoriesType>(
		endpoints.categories,
	);
	const categoryUrls = categories.map((category) => {
		return {
			url: `${siteConfig.baseUrl}${siteRoutes.category.path(category.id)}`,
			lastModified: toSitemapDate(category.updatedAt),
		};
	});

	return [...routes, ...thailandPostUrls];
}
