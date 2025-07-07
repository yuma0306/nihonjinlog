import styles from './ContactFormLabel.module.scss';

type Props = {
	htmlFor: string;
	required: boolean;
	children: React.ReactNode;
};

export const ContactFormLabel = ({ htmlFor, required, children }: Props) => {
	return (
		<label htmlFor={htmlFor} className={styles.label}>
			<span className={styles.tag} data-required={required}>
				{required ? '必須' : '任意'}
			</span>
			<span className={styles.text}>{children}</span>
		</label>
	);
};
