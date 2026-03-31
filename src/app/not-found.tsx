import { AppBlock } from '@/components/AppBlock/AppBlock';
import { AppBreadcrumb } from '@/components/AppBreadcrumb/AppBreadcrumb';
import { AppFooter } from '@/components/AppFooter/AppFooter';
import { AppFooterNav } from '@/components/AppFooterNav/AppFooterNav';
import { AppHeader } from '@/components/AppHeader/AppHeader';
import { AppNotFound } from '@/components/AppNotFound/AppNotFound';
import { AppWrapper } from '@/components/AppWrapper/AppWrapper';
import {
	getCommonMetadata,
	getDefaultOpenGraph,
	siteMeta,
} from '@/constants/siteMeta';
import { siteRoutes } from '@/constants/siteRoutes';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	...getCommonMetadata(),
	title: `${siteRoutes.notFound.title}${siteMeta.titleSuffix}`,
	description: `${siteRoutes.notFound.title}${siteMeta.descriptionSuffix}`,
	openGraph: getDefaultOpenGraph(),
	alternates: {
		canonical: siteRoutes.notFound.path,
	},
	robots: {
		index: false,
		follow: false,
	},
};

export default function NotFoundPage() {
	const breadcrumbItems = [
		{
			text: siteRoutes.home.title,
			link: siteRoutes.home.path,
		},
		{
			text: siteRoutes.notFound.title,
			link: siteRoutes.notFound.path,
		},
	];
	return (
		<AppWrapper isSmall>
			<AppHeader />
			<AppBreadcrumb items={breadcrumbItems} />
			<AppBlock>
				<AppNotFound />
			</AppBlock>
			<AppFooterNav />
			<AppFooter />
		</AppWrapper>
	);
}
