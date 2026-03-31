import { siteConfig } from '@/constants/siteConfig';
import styles from './AppFooter.module.scss';

export const AppFooter = () => {
	return (
		<footer className={styles.footer}>
			<small className={styles.copy}>&copy;{siteConfig.siteName}</small>
		</footer>
	);
};
