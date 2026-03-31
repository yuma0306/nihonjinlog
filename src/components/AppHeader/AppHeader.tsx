import { siteConfig } from '@/constants/siteConfig';
import Link from 'next/link';
import styles from './AppHeader.module.scss';

type Props = {
	isHome?: boolean;
};

export const AppHeader = async ({ isHome = false }: Props) => {
	return (
		<header className={styles.header}>
			{isHome ? (
				<h1 className={styles.logo}>{siteConfig.siteName}</h1>
			) : (
				<Link href={'/'} className={styles.logo} data-is-home={isHome}>
					{siteConfig.siteName}
				</Link>
			)}
		</header>
	);
};
