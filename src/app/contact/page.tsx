import { AppBlock } from '@/components/AppBlock/AppBlock';
import { AppHeader } from '@/components/AppHeader/AppHeader';
import { AppInner } from '@/components/AppInner/AppInner';
import { AppMain } from '@/components/AppMain/AppMain';
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
		<AppWrapper>
			<AppHeader />
			<AppMain>
				<AppBlock variant="section">
					<AppInner>
						<ContactForm />
					</AppInner>
				</AppBlock>
			</AppMain>
		</AppWrapper>
	);
}
