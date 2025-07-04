import { AppBlock } from '@/components/AppBlock/AppBlock';
import { AppBreadcrumb } from '@/components/AppBreadcrumb/AppBreadcrumb';
import { AppFooter } from '@/components/AppFooter/AppFooter';
import { AppGrid } from '@/components/AppGrid/AppGrid';
import { AppHeader } from '@/components/AppHeader/AppHeader';
import { AppMain } from '@/components/AppMain/AppMain';
import { AppWrapper } from '@/components/AppWrapper/AppWrapper';
import { ArticleBody } from '@/components/ArticleBody/ArticleBody';
import { ArticleHead } from '@/components/ArticleHead/ArticleHead';
import { HolizonalSpacer } from '@/components/HolizonalSpacer/HolizonalSpacer';
import { getCommonMetadata, siteMeta } from '@/constants/siteMeta';
import { siteRoutes } from '@/constants/siteRoutes';
import { endpoints, fetchList, fetchListDetail } from '@/libs/microcms';
import type { BlogType } from '@/libs/microcms.type';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
	const { contents } = await fetchList<BlogType>(endpoints.blogs);
	const paths = contents.map((post) => {
		return {
			slug: post.id,
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
	const post = await fetchListDetail<BlogType>(endpoints.blogs, slug);
	!post && notFound();

	return {
		...getCommonMetadata(),
		title: post.title + siteMeta.titleSuffix,
		description: post.description + siteMeta.descriptionSuffix,
		openGraph: {
			type: siteMeta.og.type,
			title: post.title + siteMeta.titleSuffix,
			description: post.description + siteMeta.descriptionSuffix,
			images: post.eyecatch?.url
				? [
						{
							url: post.eyecatch.url,
							width: post.eyecatch.width,
							height: post.eyecatch.height,
							alt: post.title,
						},
					]
				: siteMeta.og.image,
		},
		alternates: {
			canonical: `${siteRoutes.blog.index.path}${post.id}/`,
		},
		robots: {
			index: !post.noindex,
			follow: !post.nofollow,
		},
	};
}

export default async function BlogDetailPage({ params }: Props) {
	const { slug } = await params;
	const post = await fetchListDetail<BlogType>(endpoints.blogs, slug);
	!post && notFound();

	const breadcrumbItems = [
		{
			text: siteRoutes.home.title,
			link: siteRoutes.home.path,
		},
		{
			text: siteRoutes.blog.index.title,
			link: `${siteRoutes.blog.index.path}`,
		},
		{
			text: post.title,
			link: `${siteRoutes.blog.index.path}${post.id}/`,
		},
	];

	return (
		<AppWrapper>
			<AppHeader />
			<AppMain>
				<HolizonalSpacer>
					<AppBreadcrumb items={breadcrumbItems} />
					<AppBlock>
						<AppGrid as="div">
							<ArticleHead
								createdAt={post.createdAt}
								updatedAt={post.updatedAt}
								title={post.title}
								eyecatch={post.eyecatch}
								tags={post.tags}
							/>
							<ArticleBody html={post.content} />
						</AppGrid>
					</AppBlock>
				</HolizonalSpacer>
			</AppMain>
			<AppFooter />
		</AppWrapper>
	);
}
