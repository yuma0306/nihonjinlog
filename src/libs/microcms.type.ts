import type { MicroCMSImage, MicroCMSListContent } from 'microcms-js-sdk';

export type InfoType = MicroCMSListContent & {
	title: string;
	content: string;
	description: string;
	noindex: boolean;
	nofollow: boolean;
};

export type CategoryType = MicroCMSListContent & {
	name: string;
};

export type ThailandType = MicroCMSListContent & {
	title: string;
	content: string;
	label: string;
	category: CategoryType;
	recommend: boolean;
	description: string;
	noindex: boolean;
	nofollow: boolean;
} & Partial<{
		eyecatch: MicroCMSImage;
	}>;
