import styles from './GridItem.module.scss';

export type GridColumnType = Partial<{
	startPc: number;
	endPc: number;
	startTab: number;
	endTab: number;
	startSp: number;
	endSp: number;
}>;

export const GridItem = ({
	children,
	startPc = 1,
	endPc = -1,
	startTab = 1,
	endTab = -1,
	startSp = 1,
	endSp = -1,
}: {
	children: React.ReactNode;
} & GridColumnType) => {
	return (
		<div
			className={styles.wrapper}
			data-start-pc={startPc}
			data-end-pc={endPc}
			data-start-tab={startTab}
			data-end-tab={endTab}
			data-start-sp={startSp}
			data-end-sp={endSp}
		>
			{children}
		</div>
	);
};
