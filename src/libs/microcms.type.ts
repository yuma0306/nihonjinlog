import type { MicroCMSImage, MicroCMSListContent } from 'microcms-js-sdk';

type DirectoriesType = MicroCMSListContent & {
	directory: string;
};

export type CategoriesType = MicroCMSListContent & {
	category: string;
};

export type BlogsType = MicroCMSListContent & {
	directory: DirectoriesType;
	title: string;
	content: string;
	description: string;
	isRecommend: boolean;
	noindex: boolean;
	nofollow: boolean;
} & Partial<{
		category: CategoriesType;
		eyecatch: MicroCMSImage;
	}>;
