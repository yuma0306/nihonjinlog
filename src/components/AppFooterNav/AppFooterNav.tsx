import { siteRoutes } from '@/constants/siteRoutes';
import { endpoints, fetchList } from '@/libs/microcms';
import type { InfoType } from '@/libs/microcms.type';
import Link from 'next/link';
import styles from './AppFooterNav.module.scss';

export const AppFooterNav = async () => {
	const { contents: posts } = await fetchList<InfoType>(endpoints.info);
	const footerList = [
		{
			title: siteRoutes.contact.title,
			href: siteRoutes.contact.path,
		},
		...posts.map((post) => ({
			title: post.title,
			href: `${siteRoutes.info.path}${post.id}/`,
		})),
	];
	return (
		footerList && (
			<nav className={styles.nav}>
				<ul className={styles.list}>
					{footerList.map((item, index) => (
						<li key={index}>
							<Link className={styles.link} href={item.href}>
								{item.title}
							</Link>
						</li>
					))}
				</ul>
			</nav>
		)
	);
};
