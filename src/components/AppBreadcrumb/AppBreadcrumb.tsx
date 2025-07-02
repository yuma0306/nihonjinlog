import styles from '@/components/AppBreadcrumb/AppBreadcrumb.module.scss';
import Link from 'next/link';

type Props = {
	items: {
		text: string;
		link: string;
	}[];
};

export const AppBreadcrumb = ({ items }: Props) => {
	return (
		<ul className={styles.list}>
			{items.map((item, index) => (
				<li key={index} className={styles.item}>
					{index === items.length - 1 ? (
						<span className={styles.text}>{item.text}</span>
					) : (
						<Link className={styles.link} href={item.link}>
							{item.text}
						</Link>
					)}
				</li>
			))}
		</ul>
	);
};
