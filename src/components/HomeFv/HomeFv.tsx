'use client';

import { siteRoutes } from '@/constants/siteRoutes';
import type { ThailandType } from '@/libs/microcms.type';
import useEmblaCarousel from 'embla-carousel-react';
import { HomeFvCard } from '../HomeFvCard/HomeFvCard';
import styles from './HomeFv.module.scss';

type Props = {
	posts: ThailandType[];
};

export const HomeFv = ({ posts }: Props) => {
	const [emblaRef] = useEmblaCarousel({
		loop: true,
		align: 'center',
	});

	const copiedPosts = minFvPostLength ? copyPosts(posts) : posts;

	return (
		<div className={styles.fv}>
			<div className={styles.viewport} ref={emblaRef}>
				<ul className={styles.container}>
					{copiedPosts.map((post, index) => {
						const eyecatch = post.eyecatch;
						if (!eyecatch?.width || !eyecatch?.height || !post.publishedAt) {
							return;
						}
						return (
							<li className={styles.slide} key={index}>
								<HomeFvCard
									link={`${siteRoutes.thailand.path}${post.id}/`}
									image={eyecatch.url}
									width={eyecatch.width}
									height={eyecatch.height}
									time={post.publishedAt.slice(0, 10)}
									title={post.title}
									loading="eager"
									decoding="auto"
									hasColumn={false}
								/>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
};

const minFvPostLength = 5;

function copyPosts(posts: ThailandType[]) {
	if (posts.length === 0) return [];
	if (posts.length > minFvPostLength) return posts;
	const doubledPosts = [...posts, ...posts];
	return copyPosts(doubledPosts);
}
