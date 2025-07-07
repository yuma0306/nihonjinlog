import styles from '@/components/AppBlock/AppBlock.module.scss';

type Props = {
	children: React.ReactNode;
} & Partial<{
	variant: 'div' | 'section';
}>;

export const AppBlock = ({ children, variant = 'div' }: Props) => {
	const Element = variant;
	return <Element className={styles.block}>{children}</Element>;
};
