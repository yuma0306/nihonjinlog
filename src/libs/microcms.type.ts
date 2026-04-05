import type { MicroCMSImage, MicroCMSListContent } from 'microcms-js-sdk';

export type DirectoriesType = MicroCMSListContent & {
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

// 	{
// 		"id": "privacy",
// 		"createdAt": "2026-04-05T13:39:08.133Z",
// 		"updatedAt": "2026-04-05T13:48:33.447Z",
// 		"publishedAt": "2026-04-05T13:48:33.447Z",
// 		"revisedAt": "2026-04-05T13:48:33.447Z",
// 		"directory": {
// 				"id": "info",
// 				"createdAt": "2026-04-05T13:43:41.360Z",
// 				"updatedAt": "2026-04-05T13:43:41.360Z",
// 				"publishedAt": "2026-04-05T13:43:41.360Z",
// 				"revisedAt": "2026-04-05T13:43:41.360Z",
// 				"directory": "お知らせ"
// 		},
// 		"title": "プライバシーポリシー",
// 		"content": "<p>当サイトのプライバシーポリシー・免責事項を次の通り記載します。</p><h2 id=\"h44d5444b1f\">個人情報の利用目的について</h2><p>当サイトでは、お問い合わせやコメント投稿の際に氏名・メールアドレス等の個人情報を入力いただく場合があります。</p><p>取得した個人情報は、必要な連絡のみに利用させていただくもので、これらの目的以外では利用いたしません。</p><h2 id=\"hf69738665e\">個人情報の第三者開示について</h2><p>取得した個人情報は適切に管理し、以下に該当する場合を除いて第三者に開示することはありません。</p><ul><li>本人の同意が得られた場合</li><li>法令により開示が求められた場合</li></ul><h2 id=\"hd385d2aa51\">Cookieの使用について</h2><p>当サイトでは、広告配信やアクセス解析のためにCookieを使用しています。</p><p>Cookieによりブラウザを識別していますが、特定の個人の識別はできない状態で匿名性が保たれています。</p><p>Cookieの使用を望まない場合、ブラウザからCookieを無効に設定できます。</p><h2 id=\"h759597956f\">アクセス解析ツールについて</h2><h3 id=\"hcaf7e5f177\">Google AnalyticsとGoogle Search Consoleの使用について</h3><p>当サイトでは、Googleによるアクセス解析ツール「Google Analytics」及び「Google Search Console」を使用しています。</p><p>これらはトラフィックデータの収集のためにCookieを使用しています。</p><p>このトラフィックデータは匿名で収集されており、個人を特定するものではありません。</p><p>この機能はCookieを無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。</p><p>この規約に関しての詳細はGoogleアナリティクスサービス利用規約のページやGoogleポリシーと規約ページをご覧ください。</p><h3 id=\"h5e860befcb\">Microsoft Clarityの使用について</h3><p>当サイトでは、Microsoftによるアクセス解析ツール「Microsoft Clarity」を利用しています。</p><p>Microsoft Clarityによるトラフィックデータの収集には個人情報が含まれることがあります。</p><p>Microsoft Clarityの個人情報の取り扱いに関してはMicrosoft Privacy Statementをご覧ください。</p><h2 id=\"h9994d708a6\">免責事項</h2><p>当サイトは、掲載内容によって生じた損害に対する一切の責任を負いません。</p><p>各コンテンツでは、できる限り正確な情報提供を心がけておりますが、正確性や安全性を保証するものではありません。</p><p>また、リンク先の他サイトで提供される情報・サービスについても、責任を負いかねますのでご了承ください。</p><h2 id=\"hca91cda6eb\">著作権</h2><p>当サイトに掲載されている文章・画像の著作権は、運営者に帰属しています。</p><p>法的に認められている引用の範囲を超えて、無断で転載することを禁止します。</p><h2 id=\"h700abcd629\">プライバシーポリシーの変更</h2><p>当サイトは、個人情報に関して適用される日本の法令を遵守するとともに、本プライバシーポリシーの内容を適宜見直して改善に努めます。</p><p>修正された最新のプライバシーポリシーは常に本ページにて開示されます。</p>",
// 		"description": "プライバシーポリシー・免責事項について",
// 		"isNoindex": false,
// 		"isNofollow": false,
// 		"isRecommend": false,
// 		"category": null
// },
