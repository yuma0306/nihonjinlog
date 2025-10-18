import { baseUrl } from '@/constants/siteConfig';
import { siteRoutes } from '@/constants/siteRoutes';
import { endpoints, fetchList } from '@/libs/microcms';
import type { BlogType, InfoType, TagType } from '@/libs/microcms.type';
import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const routes = [
		{
			url: `${baseUrl}/`,
			lastModified: new Date(),
			changeFrequency: 'weekly' as const,
			priority: 1.0,
		},
	];

	const { contents: blogs } = await fetchList<BlogType>(endpoints.blogs);
	const blogUrls = blogs.map((blog) => {
		return {
			url: `${baseUrl}${siteRoutes.blog.path}${blog.id}/`,
			lastModified: new Date(blog.updatedAt),
			changeFrequency: 'weekly' as const,
			priority: 0.8,
		};
	});

	const { contents: tags } = await fetchList<TagType>(endpoints.tags);
	const tagUrls = tags.map((tag) => {
		return {
			url: `${baseUrl}${siteRoutes.tag.path}${tag.id}/`,
			lastModified: new Date(tag.updatedAt),
			changeFrequency: 'weekly' as const,
			priority: 0.8,
		};
	});

	const { contents: infos } = await fetchList<InfoType>(endpoints.info);
	const infoUrls = infos.map((info) => {
		return {
			url: `${baseUrl}${siteRoutes.info.path}${info.id}/`,
			lastModified: new Date(info.updatedAt),
			changeFrequency: 'monthly' as const,
			priority: 0.3,
		};
	});

	return [...routes, ...blogUrls, ...tagUrls, ...infoUrls];
}
