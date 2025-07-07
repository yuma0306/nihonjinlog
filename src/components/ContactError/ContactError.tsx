import styles from './ContactError.module.scss';

type Props = {
	children: React.ReactNode;
	isSuccess: boolean;
};

export const ContactError = ({ children, isSuccess }: Props) => {
	return (
		<p className={styles.message} data-success={isSuccess}>
			{children}
		</p>
	);
};
