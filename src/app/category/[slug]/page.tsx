import { AppBreadcrumb } from '@/components/AppBreadcrumb/AppBreadcrumb';
import { AppFooter } from '@/components/AppFooter/AppFooter';
import { AppFooterNav } from '@/components/AppFooterNav/AppFooterNav';
import { AppHeader } from '@/components/AppHeader/AppHeader';
import { AppWrapper } from '@/components/AppWrapper/AppWrapper';
import { ArchiveList } from '@/components/ArchiveList/ArchiveList';
import { HomeFvCard } from '@/components/HomeFvCard/HomeFvCard';
import { getCommonMetadata, siteMeta } from '@/constants/siteMeta';
import { siteRoutes } from '@/constants/siteRoutes';
import { trimTimefromDate } from '@/functions/date';
import { endpoints, fetchList } from '@/libs/microcms';
import type { BlogsType } from '@/libs/microcms.type';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';

export async function generateStaticParams() {
	const { contents: tags } = await fetchList<BlogsType>(endpoints.categories);
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
	const { contents: category } = await fetchList<BlogsType>(
		endpoints.categories,
		{
			filters: `id[equals]${slug}`,
		},
	);
	category.length === 0 && notFound();

	const categoryName = category[0].category;
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
	const { contents: tagContents } = await fetchList<BlogsType>(
		endpoints.categories,
		{
			filters: `id[equals]${slug}`,
		},
	);
	tagContents.length === 0 && notFound();

	const { contents } = await fetchList<BlogsType>(endpoints.blogs, {
		filters: `category[equals]${slug}`,
	});
	const posts = contents.filter(
		(item) => item.category?.id.toString() === slug,
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
			text: siteRoutes.category.title,
			link: siteRoutes.category.path(slug),
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
							link={siteRoutes.thailandDetail.path(post?.id)}
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
