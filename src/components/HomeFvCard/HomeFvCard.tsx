import Image, { type ImageProps } from 'next/image';
import Link from 'next/link';
import styles from './HomeFvCard.module.scss';

type Props = {
	link: string;
	image: string;
	width: number;
	height: number;
	time: string;
	title: string;
	hasColumn: boolean;
} & Omit<ImageProps, 'src' | 'width' | 'height' | 'alt'>;

export const HomeFvCard = ({
	link,
	image,
	width,
	height,
	time,
	title,
	hasColumn,
	...restProps
}: Props) => {
	return (
		<Link className={styles.link} href={link} data-has-column={hasColumn}>
			<div className={styles.imageWrapper}>
				<Image
					className={styles.image}
					alt={''}
					src={image}
					width={width}
					height={height}
					{...restProps}
				/>
			</div>
			<div className={styles.body}>
				<time date-time={time} className={styles.time}>
					{time}
				</time>
				<p className={styles.title}>{title}</p>
			</div>
		</Link>
	);
};
