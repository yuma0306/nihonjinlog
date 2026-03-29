import styles from './AppInner.module.scss';

type Props = {
	children: React.ReactNode;
} & Partial<{
	variant: 'div' | 'section' | 'header' | 'footer';
}>;

export const AppInner = ({ children, variant = 'div' }: Props) => {
	const Element = variant;
	return (
		<>
			<Element className={styles.inner}>{children}</Element>
		</>
	);
};
