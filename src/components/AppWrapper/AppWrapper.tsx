import styles from './AppWrapper.module.scss';

type Props = {
	children: React.ReactNode;
};

export const AppWrapper = ({ children }: Props) => {
	return <div className={styles.wrapper}>{children}</div>;
};
