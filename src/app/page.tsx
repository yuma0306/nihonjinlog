import { AppFooter } from '@/components/AppFooter/AppFooter';
import { AppHeader } from '@/components/AppHeader/AppHeader';
import { AppMain } from '@/components/AppMain/AppMain';
import { AppWrapper } from '@/components/AppWrapper/AppWrapper';
import { HomeFv } from '@/components/HomeFv/HomeFv';
import { HomeIntro } from '@/components/HomeIntro/HomeIntro';
import { siteConfig } from '@/constants/siteConfig';
import {
	getCommonMetadata,
	getDefaultOpenGraph,
	siteMeta,
} from '@/constants/siteMeta';
import { siteRoutes } from '@/constants/siteRoutes';
import { endpoints, fetchList } from '@/libs/microcms';
import type { BlogType } from '@/libs/microcms.type';
import type { Metadata } from 'next';

const minFvPostLength = 6;

export const metadata: Metadata = {
	...getCommonMetadata(),
	title: siteConfig.siteName,
	description: siteMeta.description,
	openGraph: getDefaultOpenGraph(),
	alternates: {
		canonical: siteRoutes.home.path,
	},
};

export default async function HomePage() {
	const { contents: posts } = await fetchList<BlogType>(endpoints.blogs, {
		filters: 'recommend[equals]true',
	});
	return (
		<AppWrapper>
			<AppHeader isHome />
			<AppMain>
				<HomeFv posts={minFvPostLength ? copyPosts(posts) : posts} />
				<HomeIntro />
			</AppMain>
			<AppFooter />
		</AppWrapper>
	);
}

function copyPosts(posts: BlogType[]) {
	if (posts.length === 0) return [];
	if (posts.length > minFvPostLength) return posts;
	const doubledPosts = [...posts, ...posts];
	return copyPosts(doubledPosts);
}
