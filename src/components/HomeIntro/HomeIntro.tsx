import { endpoints, fetchList } from '@/libs/microcms';
import type { TagType } from '@/libs/microcms.type';
import Link from 'next/link';
import { AppInner } from '../AppInner/AppInner';
import styles from './HomeIntro.module.scss';

export const HomeIntro = async () => {
	const { contents: tags } = await fetchList<TagType>(endpoints.tags);
	return (
		<section className={styles.intro}>
			<AppInner>
				<ul className={styles.tags}>
					{tags.map((tag) => (
						<li key={tag.id} className={styles.tag}>
							<Link className={styles.link} href={`/tag/${tag.id}/`}>
								#{tag.name}
							</Link>
						</li>
					))}
				</ul>
			</AppInner>
		</section>
	);
};
