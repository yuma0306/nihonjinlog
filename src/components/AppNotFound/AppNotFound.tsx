import { siteRoutes } from '@/constants/siteRoutes';
import Link from 'next/link';
import styles from './AppNotFound.module.scss';

export const AppNotFound = () => {
	return (
		<div className={styles.notFound}>
			<p>{siteRoutes.notFound.title}</p>
			<Link href={siteRoutes.notFound.path} className={styles.link}>
				{siteRoutes.home.title}へ戻る
			</Link>
		</div>
	);
};
