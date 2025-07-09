import { siteName } from '@/constants/siteConfig';
import { endpoints, fetchList } from '@/libs/microcms';
import type { InfoType } from '@/libs/microcms.type';
import Link from 'next/link';
import type React from 'react';
import { AppInner } from '../AppInner/AppInner';
import styles from './AppFooter.module.scss';

export const AppFooter = async () => {
	const { contents: posts } = await fetchList<InfoType>(endpoints.info);
	const footerList = [
		{
			title: 'お問い合わせ',
			href: '/contact',
		},
		...posts.map((post) => ({
			title: post.title,
			href: `/info/${post.id}/`,
		})),
	];
	return (
		<footer className={styles.footer}>
			<AppInner>
				{footerList && (
					<ul className={styles.list}>
						{footerList.map((item, index) => (
							<li key={index}>
								<Link className={styles.link} href={item.href}>
									{item.title}
								</Link>
							</li>
						))}
					</ul>
				)}
				<small className={styles.copy}>&copy;{siteName}</small>
			</AppInner>
		</footer>
	);
};
