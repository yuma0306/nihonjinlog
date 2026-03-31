import { AppBlock } from '@/components/AppBlock/AppBlock';
import { AppFooter } from '@/components/AppFooter/AppFooter';
import { AppFooterNav } from '@/components/AppFooterNav/AppFooterNav';
import { AppHeader } from '@/components/AppHeader/AppHeader';
import { AppWrapper } from '@/components/AppWrapper/AppWrapper';
import { ContactForm } from '@/components/ContactForm/ContactForm';
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

export default function ContactPage() {
	return (
		<AppWrapper isSmall={false}>
			<AppHeader />
			<AppBlock variant="section">
				<ContactForm />
			</AppBlock>
			<AppFooterNav />
			<AppFooter />
		</AppWrapper>
	);
}
