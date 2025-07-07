import * as yup from 'yup';

export const contactSchema = yup.object({
	name: yup.string().required('お名前は必須です'),
	email: yup
		.string()
		.email('有効なメールアドレスを入力してください')
		.required('メールアドレスは必須です'),
	message: yup
		.string()
		.required('内容は必須です')
		.min(10, '内容は10文字以上で入力してください'),
});
