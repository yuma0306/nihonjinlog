import styles from '@/components/ArticleToc/ArticleToc.module.scss';
import type { BlogsType } from '@/libs/microcms.type';

export const ArticleToc = ({
	html,
}: {
	html: BlogsType['content'];
}) => {
	const tocList = extractTocList(html);

	return (
		<details className={styles.toc}>
			<summary className={styles.summary}>
				目次（読みたいところからどうぞ）
			</summary>
			<nav className={styles.nav}>{TocList(tocList)}</nav>
		</details>
	);
};

function extractTocList(html: BlogsType['content']) {
	const regex = /<h([23])[^>]*id="([^"]+)"[^>]*>([\s\S]*?)<\/h\1>/gi;
	return [...html.matchAll(regex)].map(
		(match) =>
			({
				id: match[2],
				text: match[3].replace(/<[^>]+>/g, '').trim(),
				tag: `h${match[1]}`,
			}) as const,
	);
}

const TocList = (tocList: TocItem[]) => {
	const grouped = tocList.reduce<
		Array<{
			h2: TocItem;
			h3: TocItem[];
		}>
	>((acc, item) => {
		if (item.tag === 'h2') {
			// biome-ignore lint/performance/noAccumulatingSpread: <explanation>
			return [...acc, { h2: item, h3: [] }];
		}
		const last = acc.at(-1);
		if (!last) {
			return acc;
		}
		return [
			...acc.slice(0, -1),
			{
				...last,
				h3: [...last.h3, item],
			},
		];
	}, []);
	return (
		<ul className={styles.list}>
			{grouped.map((group) => (
				<li
					key={group.h2.id}
					className={styles.item}
					data-has-sub-list={group.h3.length > 0}
				>
					<a href={`#${group.h2.id}`} className={styles.link}>
						{group.h2.text}
					</a>
					{group.h3.length > 0 && (
						<ul className={styles.list}>
							{group.h3.map((item) => (
								<li key={item.id} className={styles.item} data-sub-item>
									<a href={`#${item.id}`} className={styles.link}>
										{item.text}
									</a>
								</li>
							))}
						</ul>
					)}
				</li>
			))}
		</ul>
	);
};

type TocItem = ReturnType<typeof extractTocList>[number];
