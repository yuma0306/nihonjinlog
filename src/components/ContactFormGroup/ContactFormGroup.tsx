import styles from './ContactFormGroup.module.scss';

type Props = {
	children: React.ReactNode;
};

export const ContactFormGroup = ({ children }: Props) => {
	return <div className={styles.group}>{children}</div>;
};
