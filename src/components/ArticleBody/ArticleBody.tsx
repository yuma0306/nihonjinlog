import type { ThailandType } from '@/libs/microcms.type';
import styles from './ArticleBody.module.scss';

type Props = {
	html: ThailandType['content'];
};

export const ArticleBody = ({ html }: Props) => {
	return (
		<div
			className={styles.articleBody}
			// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
			dangerouslySetInnerHTML={{ __html: html }}
		/>
	);
};
