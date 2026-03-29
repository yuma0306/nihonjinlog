import type {
	MicroCMSContentId,
	MicroCMSDate,
	MicroCMSImage,
} from 'microcms-js-sdk';

export type BlogType = {
	id: MicroCMSContentId;
	title: string;
	content: string;
	label: string;
	tags: TagType[];
	recommend: boolean;
	description: string;
	noindex: boolean;
	nofollow: boolean;
} & Partial<{
	eyecatch: MicroCMSImage;
}> &
	MicroCMSDate;

export type TagType = {
	id: MicroCMSContentId;
	name: string;
} & MicroCMSDate;

export type InfoType = {
	id: MicroCMSContentId;
	title: string;
	content: string;
	description: string;
	noindex: boolean;
	nofollow: boolean;
} & MicroCMSDate;
