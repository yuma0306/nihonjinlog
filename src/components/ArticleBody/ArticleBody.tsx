import type { BlogsType } from '@/libs/microcms.type';
import styles from './ArticleBody.module.scss';

type Props = {
	html: BlogsType['content'];
};

export const ArticleBody = ({ html }: Props) => {
	return (
		<div
			className={styles.body}
			// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
			dangerouslySetInnerHTML={{ __html: html }}
		/>
	);
};
