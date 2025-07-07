import type { TextareaHTMLAttributes } from 'react';
import styles from './ContactTextarea.module.scss';

export const ContactTextarea = ({
	...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) => {
	return <textarea {...props} className={styles.textarea} />;
};
