import type { MicroCMSContentId } from 'microcms-js-sdk';

export const siteRoutes = {
	home: {
		title: 'ホーム',
		path: '/',
	},
	notFound: {
		title: 'ページが見つかりません',
		path: '/404/',
	},
	thailand: {
		title: 'タイライフ',
		path: '/thailand/',
	},
	thailandDetail: {
		title: 'タイライフ詳細',
		path(id: MicroCMSContentId['id']) {
			return `/thailand/${id}/`;
		},
	},
	category: {
		title: 'カテゴリ一覧',
		path(id: MicroCMSContentId['id']) {
			return `/category/${id}/`;
		},
	},
	info: {
		title: 'お知らせ一覧',
		path: '/info/',
	},
	infoDetail: {
		title: 'お知らせ詳細',
		path(id: MicroCMSContentId['id']) {
			return `/info/${id}/`;
		},
	},
	contact: {
		title: 'お問い合わせ',
		path: '/contact/',
	},
} as const;
