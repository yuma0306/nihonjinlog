'use client';

import type { BlogType } from '@/libs/microcms.type';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';
import { HomeFvCard } from '../HomeFvCard/HomeFvCard';
import styles from './HomeFv.module.scss';

type Props = {
	posts: BlogType[];
};

export const HomeFv = ({ posts }: Props) => {
	const [emblaRef, emblaApi] = useEmblaCarousel({
		loop: true,
		align: 'center',
	});

	const [selectedIndex, setSelectedIndex] = useState(0);
	const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

	const onSelect = useCallback(() => {
		if (!emblaApi) return;
		setSelectedIndex(emblaApi.selectedScrollSnap());
	}, [emblaApi]);

	const onReInit = useCallback(() => {
		if (!emblaApi) return;
		setScrollSnaps(emblaApi.scrollSnapList());
		onSelect();
	}, [emblaApi, onSelect]);

	useEffect(() => {
		if (!emblaApi) return;

		onReInit();
		emblaApi.on('reInit', onReInit);
		emblaApi.on('select', onSelect);

		return () => {
			emblaApi.off('reInit', onReInit);
			emblaApi.off('select', onSelect);
		};
	}, [emblaApi, onReInit, onSelect]);

	const scrollTo = useCallback(
		(index: number) => emblaApi?.scrollTo(index),
		[emblaApi],
	);

	return (
		<div className={styles.fv}>
			<div className={styles.slider}>
				<div className={styles.viewport} ref={emblaRef}>
					<div className={styles.container}>
						{posts.map((post, index) => {
							const eyecatch = post.eyecatch;
							if (!eyecatch?.width || !eyecatch?.height || !post.publishedAt) {
								return null;
							}
							return (
								<div className={styles.slide} key={index}>
									<HomeFvCard
										link={`/blog/${post.id}/`}
										image={eyecatch.url}
										width={eyecatch.width}
										height={eyecatch.height}
										time={post.publishedAt.slice(0, 10)}
										title={post.title}
										loading="eager"
										decoding="auto"
									/>
								</div>
							);
						})}
					</div>
				</div>
				<div className={styles.pagination}>
					{scrollSnaps.map((_, index) => (
						<button
							key={index}
							type="button"
							className={
								index === selectedIndex
									? `${styles.paginationDot} ${styles.paginationDotActive}`
									: styles.paginationDot
							}
							aria-label={`スライド ${index + 1} に移動`}
							aria-current={index === selectedIndex ? 'true' : undefined}
							onClick={() => scrollTo(index)}
						/>
					))}
				</div>
			</div>
		</div>
	);
};
