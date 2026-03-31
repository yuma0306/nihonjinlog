import styles from './GridItem.module.scss';

export const GridItem = ({
	children,
	startPc,
	endPc,
	startTab,
	endTab,
	startSp,
	endSp,
}: {
	children: React.ReactNode;
	startPc: number;
	endPc: number;
	startTab: number;
	endTab: number;
	startSp: number;
	endSp: number;
}) => {
	return (
		<main
			className={styles.wrapper}
			data-start-pc={startPc}
			data-end-pc={endPc}
			data-start-tab={startTab}
			data-end-tab={endTab}
			data-start-sp={startSp}
			data-end-sp={endSp}
		>
			{children}
		</main>
	);
};
