import styles from './AppWrapper.module.scss';

type Props = {
	children: React.ReactNode;
	isSmall: boolean;
};

export const AppWrapper = ({ children, isSmall }: Props) => {
	return (
		<div className={styles.wrapper} data-is-small={isSmall}>
			{children}
		</div>
	);
};
