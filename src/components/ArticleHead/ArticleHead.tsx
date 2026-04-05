import styles from '@/components/ArticleHead/ArticleHead.module.scss';
import { siteRoutes } from '@/constants/siteRoutes';
import { trimTimefromDate } from '@/functions/date';
import type { BlogsType } from '@/libs/microcms.type';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
	title: BlogsType['title'];
	createdAt: BlogsType['createdAt'];
	updatedAt: BlogsType['updatedAt'];
} & Partial<{
	category: BlogsType['category'];
	eyecatch: BlogsType['eyecatch'];
}>;

export const ArticleHead = ({
	title,
	createdAt,
	updatedAt,
	eyecatch,
	category,
}: Props) => {
	return (
		<div className={styles.articleHead}>
			<div className={styles.dateWrapper}>
				<time className={styles.date}>
					公開日：{trimTimefromDate(createdAt)}
				</time>
				<time className={styles.date}>
					更新日：{trimTimefromDate(updatedAt)}
				</time>
			</div>
			<h1 className={styles.heading}>{title}</h1>
			{category !== undefined && (
				<ul className={styles.category}>
					<li className={styles.categoryItem}>
						<Link
							href={siteRoutes.category.path(category?.id)}
							className={styles.categoryLink}
						>
							{category?.category}
						</Link>
					</li>
				</ul>
			)}
			{eyecatch?.width && eyecatch?.height && (
				<Image
					className={styles.thumbnail}
					alt={title}
					src={eyecatch.url}
					height={eyecatch.height}
					width={eyecatch.width}
					priority
				/>
			)}
		</div>
	);
};
