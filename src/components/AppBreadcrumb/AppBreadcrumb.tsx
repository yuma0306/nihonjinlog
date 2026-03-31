import Link from 'next/link';
import styles from './AppBreadcrumb.module.scss';

type Props = {
	items: {
		text: string;
		link: string;
	}[];
};

export const AppBreadcrumb = ({ items }: Props) => {
	return (
		<nav className={styles.nav}>
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
		</nav>
	);
};
