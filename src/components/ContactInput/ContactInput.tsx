import type { InputHTMLAttributes } from 'react';
import styles from './ContactInput.module.scss';

export const ContactInput = ({
	...props
}: InputHTMLAttributes<HTMLInputElement>) => {
	return <input {...props} className={styles.input} />;
};
