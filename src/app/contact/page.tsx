import { AppBlock } from '@/components/AppBlock/AppBlock';
import { AppBreadcrumb } from '@/components/AppBreadcrumb/AppBreadcrumb';
import { AppFooter } from '@/components/AppFooter/AppFooter';
import { AppFooterNav } from '@/components/AppFooterNav/AppFooterNav';
import { AppHeader } from '@/components/AppHeader/AppHeader';
import { AppWrapper } from '@/components/AppWrapper/AppWrapper';
import { ContactForm } from '@/components/ContactForm/ContactForm';
import { GridItem } from '@/components/GridItem/GridItem';
import { getCommonMetadata, getDefaultOpenGraph } from '@/constants/siteMeta';
import { siteRoutes } from '@/constants/siteRoutes';

export const metadata = {
	...getCommonMetadata(),
	title: siteRoutes.contact.title,
	description: 'お問い合わせフォーム',
	openGraph: getDefaultOpenGraph(),
	alternates: {
		canonical: siteRoutes.contact.path,
	},
};

const breadcrumbItems = [
	{
		text: siteRoutes.home.title,
		link: siteRoutes.home.path,
	},
	{
		text: siteRoutes.contact.title,
		link: siteRoutes.contact.path,
	},
];

export default function ContactPage() {
	return (
		<AppWrapper>
			<AppHeader startPc={2} endPc={12} />
			<AppBreadcrumb items={breadcrumbItems} startPc={2} endPc={12} />
			<GridItem startPc={2} endPc={12}>
				<AppBlock variant="section">
					<ContactForm />
				</AppBlock>
			</GridItem>
			<AppFooterNav startPc={2} endPc={12} />
			<AppFooter startPc={2} endPc={12} />
		</AppWrapper>
	);
}
