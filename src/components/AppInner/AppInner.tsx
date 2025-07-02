import styles from './AppInner.module.scss';

type Props = {
	children: React.ReactNode;
};

export const AppInner = ({ children }: Props) => {
	return (
		<>
			<div className={styles.inner}>{children}</div>
		</>
	);
};
