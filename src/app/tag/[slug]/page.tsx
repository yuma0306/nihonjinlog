import { AppBlock } from '@/components/AppBlock/AppBlock';
import { AppBreadcrumb } from '@/components/AppBreadcrumb/AppBreadcrumb';
import { AppCardLink } from '@/components/AppCardLink/AppCardLink';
import { AppFooter } from '@/components/AppFooter/AppFooter';
import { AppHeader } from '@/components/AppHeader/AppHeader';
import { AppMain } from '@/components/AppMain/AppMain';
import { AppWrapper } from '@/components/AppWrapper/AppWrapper';
import { ArchiveList } from '@/components/ArchiveList/ArchiveList';
import { HolizonalSpacer } from '@/components/HolizonalSpacer/HolizonalSpacer';
import { getCommonMetadata, siteMeta } from '@/constants/siteMeta';
import { siteRoutes } from '@/constants/siteRoutes';
import { trimTimefromDate } from '@/functions/date';
import { endpoints, fetchList } from '@/libs/microcms';
import type { BlogType, TagType } from '@/libs/microcms.type';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
	const { contents: tags } = await fetchList<TagType>(endpoints.tags);
	const paths = tags.map((tag) => {
		return {
			slug: tag.id,
		};
	});
	return paths;
}
export const dynamicParams = false;
export const revalidate = 3600;

type Props = {
	params: Promise<{
		slug: string;
	}>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params;
	const { contents: tagContents } = await fetchList<TagType>(endpoints.tags, {
		filters: `id[equals]${slug}`,
	});
	tagContents.length === 0 && notFound();

	const tagName = tagContents[0].name;
	return {
		...getCommonMetadata(),
		title: `${tagName}の記事一覧${siteMeta.titleSuffix}`,
		description: `${tagName}の記事一覧${siteMeta.descriptionSuffix}`,
		openGraph: {
			title: `${tagName}の記事一覧${siteMeta.titleSuffix}`,
			description: `${tagName}の記事一覧${siteMeta.descriptionSuffix}`,
			images: siteMeta.og.image,
			type: siteMeta.og.type,
		},
		alternates: {
			canonical: `${siteRoutes.info.path}${tagContents[0].id}/`,
		},
	};
}

export default async function TagArchivePage({ params }: Props) {
	const { slug } = await params;
	const { contents: tagContents } = await fetchList<TagType>(endpoints.tags, {
		filters: `id[equals]${slug}`,
	});
	tagContents.length === 0 && notFound();

	const tagName = tagContents[0].name;
	const { contents } = await fetchList<BlogType>(endpoints.blogs);
	const posts = contents.filter((item) =>
		item.tags.some((tag) => tag.id.toString() === slug),
	);
	if (posts.length === 0) {
		notFound();
	}
	const breadcrumbItems = [
		{
			text: siteRoutes.home.title,
			link: siteRoutes.home.path,
		},
		{
			text: `#${tagName}の記事一覧`,
			link: `${siteRoutes.blog.path}${slug}/`,
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
