import { siteConfig } from '@/constants/siteConfig';
import { GridItem } from '../GridItem/GridItem';
import type { GridColumnType } from '../GridItem/GridItem';
import styles from './AppFooter.module.scss';

export const AppFooter = ({
	startPc,
	endPc,
	startTab,
	endTab,
	startSp,
	endSp,
}: GridColumnType) => {
	return (
		<GridItem
			startPc={startPc}
			endPc={endPc}
			startTab={startTab}
			endTab={endTab}
			startSp={startSp}
			endSp={endSp}
		>
			<footer className={styles.footer}>
				<small className={styles.copy}>&copy;{siteConfig.siteName}</small>
			</footer>
		</GridItem>
	);
};
