import { AppFooter } from '@/components/AppFooter/AppFooter';
import { AppFooterNav } from '@/components/AppFooterNav/AppFooterNav';
import { AppHeader } from '@/components/AppHeader/AppHeader';
import { AppWrapper } from '@/components/AppWrapper/AppWrapper';
import { HomeFv } from '@/components/HomeFv/HomeFv';
import { siteConfig } from '@/constants/siteConfig';
import {
	getCommonMetadata,
	getDefaultOpenGraph,
	siteMeta,
} from '@/constants/siteMeta';
import { siteRoutes } from '@/constants/siteRoutes';
import { endpoints, fetchList } from '@/libs/microcms';
import type { BlogsType } from '@/libs/microcms.type';
import type { Metadata } from 'next';

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
	const { contents: posts } = await fetchList<BlogsType>(endpoints.blogs, {
		filters: 'isRecommend[equals]true[and]directory[equals]thailand',
	});
	return (
		<AppWrapper>
			<AppHeader isHome />
			<HomeFv posts={posts} />
			<AppFooterNav />
			<AppFooter />
		</AppWrapper>
	);
}
