import type { ButtonHTMLAttributes } from 'react';
import styles from './AppButton.module.scss';

type Props = {
	children: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const AppButton = ({ children, ...props }: Props) => {
	return (
		<button className={styles.button} {...props}>
			{children}
		</button>
	);
};
