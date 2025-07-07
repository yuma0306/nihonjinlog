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
		index: {
			title: 'ブログ記事一覧',
			path: '/blog/',
		},
	},
	tag: {
		index: {
			path: '/tag/',
		},
	},
	info: {
		index: {
			path: '/info/',
		},
	},
	contact: {
		title: 'お問い合わせ',
		path: '/contact/',
	},
} as const;
