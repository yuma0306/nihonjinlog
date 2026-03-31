import { AppBlock } from '@/components/AppBlock/AppBlock';
import { AppBreadcrumb } from '@/components/AppBreadcrumb/AppBreadcrumb';
import { AppCardLink } from '@/components/AppCardLink/AppCardLink';
import { AppFooter } from '@/components/AppFooter/AppFooter';
import { AppFooterNav } from '@/components/AppFooterNav/AppFooterNav';
import { AppHeader } from '@/components/AppHeader/AppHeader';
import { AppMain } from '@/components/AppMain/AppMain';
import { AppWrapper } from '@/components/AppWrapper/AppWrapper';
import { ArchiveList } from '@/components/ArchiveList/ArchiveList';
import {
	getCommonMetadata,
	getDefaultOpenGraph,
	siteMeta,
} from '@/constants/siteMeta';
import { siteRoutes } from '@/constants/siteRoutes';
import { trimTimefromDate } from '@/functions/date';
import { endpoints, fetchList } from '@/libs/microcms';
import type { ThailandType } from '@/libs/microcms.type';
import type { Metadata } from 'next';
import App from 'next/app';
import { notFound } from 'next/navigation';

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
	const { contents: posts } = await fetchList<ThailandType>(endpoints.thailand);
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
		<AppWrapper isSmall={false}>
			<AppHeader />
			<AppBreadcrumb items={breadcrumbItems} />
			<AppMain>
				<AppBlock>
					<ArchiveList>
						{posts.map(
							(post) =>
								post.eyecatch?.width &&
								post.eyecatch?.height &&
								post.publishedAt && (
									<li key={post.id.toString()}>
										<AppCardLink
											link={siteRoutes.thailandDetail.path(post.id)}
											image={post.eyecatch.url}
											width={post.eyecatch.width}
											height={post.eyecatch.height}
											time={trimTimefromDate(post.updatedAt)}
											title={post.title}
										/>
									</li>
								),
						)}
					</ArchiveList>
				</AppBlock>
			</AppMain>
			<AppFooterNav />
			<AppFooter />
		</AppWrapper>
	);
}
