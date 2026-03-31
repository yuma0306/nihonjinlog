import styles from '@/components/AppMain/AppMain.module.scss';

export const AppMain = ({ children }: { children: React.ReactNode }) => {
	return <main className={styles.main}>{children}</main>;
};
