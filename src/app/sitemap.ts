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
	] as const;

	const thailandArchives = [
		{
			url: `${siteConfig.baseUrl}${siteRoutes.thailand.path}`,
			lastModified: toSitemapDate(new Date()),
		},
	] as const;

	const { contents: thailandPosts } = await fetchList<BlogsType>(
		endpoints.blogs,
		{ filters: 'directory[equals]thailand' },
	);
	const thailandPostUrls = thailandPosts.map((thailandPost) => {
		return {
			url: `${siteConfig.baseUrl}${siteRoutes.thailandDetail.path(thailandPost.id)}`,
			lastModified: toSitemapDate(thailandPost.updatedAt),
		};
	});

	const { contents: infoPosts } = await fetchList<BlogsType>(endpoints.blogs, {
		filters: 'directory[equals]info',
	});
	const infoPostUrls = infoPosts.map((thailandPost) => {
		return {
			url: `${siteConfig.baseUrl}${siteRoutes.infoDetail.path(thailandPost.id)}`,
			lastModified: toSitemapDate(thailandPost.updatedAt),
		};
	});

	const { contents: categories } = await fetchList<CategoriesType>(
		endpoints.categories,
	);
	const categoryUrls = categories.map((category) => {
		return {
			url: `${siteConfig.baseUrl}${siteRoutes.category.path(category.id)}`,
			lastModified: toSitemapDate(new Date()),
		};
	});

	return [
		...routes,
		...thailandArchives,
		...thailandPostUrls,
		...infoPostUrls,
		...categoryUrls,
	];
}
