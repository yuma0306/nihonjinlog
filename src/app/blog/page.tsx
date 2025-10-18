import { AppBlock } from '@/components/AppBlock/AppBlock';
import { AppBreadcrumb } from '@/components/AppBreadcrumb/AppBreadcrumb';
import { AppCardLink } from '@/components/AppCardLink/AppCardLink';
import { AppFooter } from '@/components/AppFooter/AppFooter';
import { AppHeader } from '@/components/AppHeader/AppHeader';
import { AppMain } from '@/components/AppMain/AppMain';
import { AppWrapper } from '@/components/AppWrapper/AppWrapper';
import { ArchiveList } from '@/components/ArchiveList/ArchiveList';
import { HolizonalSpacer } from '@/components/HolizonalSpacer/HolizonalSpacer';
import {
	getCommonMetadata,
	getDefaultOpenGraph,
	siteMeta,
} from '@/constants/siteMeta';
import { siteRoutes } from '@/constants/siteRoutes';
import { trimTimefromDate } from '@/functions/date';
import { endpoints, fetchList } from '@/libs/microcms';
import type { BlogType } from '@/libs/microcms.type';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
	...getCommonMetadata(),
	title: `${siteRoutes.blog.title}${siteMeta.titleSuffix}`,
	description: `${siteRoutes.blog.title}${siteMeta.descriptionSuffix}`,
	openGraph: getDefaultOpenGraph(),
	alternates: {
		canonical: siteRoutes.blog.path,
	},
};

export default async function BlogArchivePage() {
	const { contents: posts } = await fetchList<BlogType>(endpoints.blogs);
	posts.length === 0 && notFound();

	const breadcrumbItems = [
		{
			text: siteRoutes.home.title,
			link: siteRoutes.home.path,
		},
		{
			text: siteRoutes.blog.title,
			link: `${siteRoutes.blog.path}`,
		},
	];
	return (
		<AppWrapper>
			<AppHeader />
			<AppMain>
				<HolizonalSpacer>
					<AppBreadcrumb items={breadcrumbItems} />
					<AppBlock>
						<ArchiveList>
							{posts.map(
								(post) =>
									post.eyecatch?.width &&
									post.eyecatch?.height &&
									post.publishedAt && (
										<li key={post.id.toString()}>
											<AppCardLink
												link={`/blog/${post.id}/`}
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
				</HolizonalSpacer>
			</AppMain>
			<AppFooter />
		</AppWrapper>
	);
}
