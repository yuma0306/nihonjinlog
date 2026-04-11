import type { BlogsType } from '@/libs/microcms.type';
import styles from './ArticleBody.module.scss';

export const ArticleBody = ({
	html,
}: {
	html: BlogsType['content'];
}) => {
	return (
		<div
			className={styles.body}
			// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
			dangerouslySetInnerHTML={{ __html: html }}
		/>
	);
};
