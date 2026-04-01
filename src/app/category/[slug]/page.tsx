import { AppBlock } from '@/components/AppBlock/AppBlock';
import { AppBreadcrumb } from '@/components/AppBreadcrumb/AppBreadcrumb';
import { AppCardLink } from '@/components/AppCardLink/AppCardLink';
import { AppFooter } from '@/components/AppFooter/AppFooter';
import { AppFooterNav } from '@/components/AppFooterNav/AppFooterNav';
import { AppHeader } from '@/components/AppHeader/AppHeader';
import { AppWrapper } from '@/components/AppWrapper/AppWrapper';
import { ArchiveList } from '@/components/ArchiveList/ArchiveList';
import { getCommonMetadata, siteMeta } from '@/constants/siteMeta';
import { siteRoutes } from '@/constants/siteRoutes';
import { trimTimefromDate } from '@/functions/date';
import { endpoints, fetchList } from '@/libs/microcms';
import type { CategoryType, ThailandType } from '@/libs/microcms.type';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
	const { contents: tags } = await fetchList<CategoryType>(
		endpoints.categories,
	);
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
	const { contents: category } = await fetchList<CategoryType>(
		endpoints.categories,
		{
			filters: `id[equals]${slug}`,
		},
	);
	category.length === 0 && notFound();

	const categoryName = category[0].name;
	return {
		...getCommonMetadata(),
		title: `${categoryName}の記事一覧${siteMeta.titleSuffix}`,
		description: `${categoryName}の記事一覧${siteMeta.descriptionSuffix}`,
		openGraph: {
			title: `${categoryName}の記事一覧${siteMeta.titleSuffix}`,
			description: `${categoryName}の記事一覧${siteMeta.descriptionSuffix}`,
			images: siteMeta.og.image,
			type: siteMeta.og.type,
		},
		alternates: {
			canonical: siteRoutes.category.path(category[0].id),
		},
	};
}

export default async function TagArchivePage({ params }: Props) {
	const { slug } = await params;
	const { contents: tagContents } = await fetchList<CategoryType>(
		endpoints.categories,
		{
			filters: `id[equals]${slug}`,
		},
	);
	tagContents.length === 0 && notFound();

	const { contents } = await fetchList<ThailandType>(endpoints.thailand);
	const posts = contents.filter((item) => item.category.id.toString() === slug);
	if (posts.length === 0) {
		notFound();
	}
	const breadcrumbItems = [
		{
			text: siteRoutes.home.title,
			link: siteRoutes.home.path,
		},
		{
			text: siteRoutes.category.title,
			link: siteRoutes.category.path(slug),
		},
	];
	return (
		<AppWrapper>
			<AppHeader />
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
			<AppFooterNav />
			<AppFooter />
		</AppWrapper>
	);
}
