import Image, { type ImageProps } from 'next/image';
import Link from 'next/link';
import styles from './AppCardLink.module.scss';

type Props = {
	link: string;
	image: string;
	width: number;
	height: number;
	time: string;
	title: string;
} & Omit<ImageProps, 'src' | 'width' | 'height' | 'alt'>;

export const AppCardLink = ({
	link,
	image,
	width,
	height,
	time,
	title,
	...restProps
}: Props) => {
	return (
		<Link className={styles.link} href={link}>
			<Image
				className={styles.image}
				alt={''}
				src={image}
				width={width}
				height={height}
				{...restProps}
			/>
			<time date-time={time} className={styles.time}>
				{time}
			</time>
			<p className={styles.title}>{title}</p>
		</Link>
	);
};
