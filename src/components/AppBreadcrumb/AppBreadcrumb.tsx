import Link from 'next/link';
import { GridItem } from '../GridItem/GridItem';
import type { GridColumnType } from '../GridItem/GridItem';
import styles from './AppBreadcrumb.module.scss';

type Props = {
	items: {
		text: string;
		link: string;
	}[];
} & GridColumnType;

export const AppBreadcrumb = ({
	items,
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
			<nav className={styles.nav}>
				<ul className={styles.list}>
					{items.map((item, index) => (
						<li key={index} className={styles.item}>
							{index === items.length - 1 ? (
								<span className={styles.text}>{item.text}</span>
							) : (
								<Link className={styles.link} href={item.link}>
									{item.text}
								</Link>
							)}
						</li>
					))}
				</ul>
			</nav>
		</GridItem>
	);
};
