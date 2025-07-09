export const siteRoutes = {
	home: {
		title: 'ホーム',
		path: '/',
	},
	notFound: {
		title: 'ページが見つかりません',
		path: '/404/',
	},
	blog: {
		title: 'ブログ記事一覧',
		path: '/blog/',
	},
	tag: {
		path: '/tag/',
	},
	info: {
		path: '/info/',
	},
	contact: {
		title: 'お問い合わせ',
		path: '/contact/',
	},
} as const;
