import { AppBreadcrumb } from '@/components/AppBreadcrumb/AppBreadcrumb';
import { AppFooter } from '@/components/AppFooter/AppFooter';
import { AppFooterNav } from '@/components/AppFooterNav/AppFooterNav';
import { AppHeader } from '@/components/AppHeader/AppHeader';
import { AppWrapper } from '@/components/AppWrapper/AppWrapper';
import { ArchiveList } from '@/components/ArchiveList/ArchiveList';
import { HomeFvCard } from '@/components/HomeFvCard/HomeFvCard';
import {
	getCommonMetadata,
	getDefaultOpenGraph,
	siteMeta,
} from '@/constants/siteMeta';
import { siteRoutes } from '@/constants/siteRoutes';
import { trimTimefromDate } from '@/functions/date';
import { endpoints, fetchList } from '@/libs/microcms';
import type { BlogsType } from '@/libs/microcms.type';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
	...getCommonMetadata(),
	title: `${siteRoutes.thailand.title}${siteMeta.titleSuffix}`,
	description: `${siteRoutes.thailand.title}${siteMeta.descriptionSuffix}`,
	openGraph: getDefaultOpenGraph(),
	alternates: {
		canonical: siteRoutes.thailand.path,
	},
};

export default async function ThailandArchivePage() {
	const { contents: posts } = await fetchList<BlogsType>(endpoints.blogs, {
		filters: 'directory[equals]thailand',
	});
	posts.length === 0 && notFound();

	const breadcrumbItems = [
		{
			text: siteRoutes.home.title,
			link: siteRoutes.home.path,
		},
		{
			text: siteRoutes.thailand.title,
			link: siteRoutes.thailand.path,
		},
	];
	return (
		<AppWrapper>
			<AppHeader />
			<AppBreadcrumb items={breadcrumbItems} />
			<ArchiveList>
				{posts.reduce<ReactNode[]>((cells, post) => {
					const eyecatch = post.eyecatch;
					if (!eyecatch?.width || !eyecatch?.height || !post.publishedAt) {
						return cells;
					}
					cells.push(
						<HomeFvCard
							key={post.id}
							link={siteRoutes.thailandDetail.path(post.id)}
							image={eyecatch.url}
							width={eyecatch.width}
							height={eyecatch.height}
							time={trimTimefromDate(post.updatedAt)}
							title={post.title}
							hasColumn
						/>,
					);
					return cells;
				}, [])}
			</ArchiveList>
			<AppFooterNav />
			<AppFooter />
		</AppWrapper>
	);
}
