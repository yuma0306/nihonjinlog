import { siteName } from '@/constants/siteConfig';
import Link from 'next/link';
import type React from 'react';
import styles from './AppHeader.module.scss';

type Props = {
	isHome?: boolean;
};

export const AppHeader = async ({ isHome = false }: Props) => {
	return (
		<header className={styles.header}>
			<div className={styles.inner}>
				{isHome ? (
					<h1 className={styles.logo}>{siteName}</h1>
				) : (
					<Link href={'/'} className={styles.logo} data-is-home={isHome}>
						{siteName}
					</Link>
				)}
			</div>
		</header>
	);
};
