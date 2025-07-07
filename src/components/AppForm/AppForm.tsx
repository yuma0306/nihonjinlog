import type { FormHTMLAttributes, ReactNode } from 'react';
import styles from './AppForm.module.scss';

type Props = {
	children: ReactNode;
} & FormHTMLAttributes<HTMLFormElement>;

export const AppForm = ({ children, ...props }: Props) => {
	return (
		<form {...props} className={styles.form}>
			{children}
		</form>
	);
};
