import { siteConfig } from '@/constants/siteConfig';
import Link from 'next/link';
import { GridItem } from '../GridItem/GridItem';
import type { GridColumnType } from '../GridItem/GridItem';
import styles from './AppHeader.module.scss';

type Props = {
	isHome?: boolean;
} & GridColumnType;

export const AppHeader = async ({
	isHome = false,
	startPc,
	endPc,
	startTab,
	endTab,
	startSp,
	endSp,
}: Props) => {
	return (
		<GridItem
			startPc={startPc}
			endPc={endPc}
			startTab={startTab}
			endTab={endTab}
			startSp={startSp}
			endSp={endSp}
		>
			<header className={styles.header}>
				{isHome ? (
					<h1 className={styles.logo}>{siteConfig.siteName}</h1>
				) : (
					<Link href={'/'} className={styles.logo} data-is-home={isHome}>
						{siteConfig.siteName}
					</Link>
				)}
			</header>
		</GridItem>
	);
};
