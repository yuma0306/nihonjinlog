import styles from '@/components/AppHeadingLv1/AppHeadingLv1.module.scss';

export const AppHeadingLv1 = ({ children }: { children: React.ReactNode }) => {
	return <h1 className={styles.heading}>{children}</h1>;
};
