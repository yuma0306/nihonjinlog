'use client';

import { siteRoutes } from '@/constants/siteRoutes';
import { contactSchema } from '@/schema/contactSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { AppButton } from '../AppButton/AppButton';
import { AppForm } from '../AppForm/AppForm';
import { AppHeadingLv1 } from '../AppHeadingLv1/AppHeadingLv1';
import { ContactError } from '../ContactError/ContactError';
import { ContactFormGroup } from '../ContactFormGroup/ContactFormGroup';
import { ContactFormLabel } from '../ContactFormLabel/ContactFormLabel';
import { ContactInput } from '../ContactInput/ContactInput';
import { ContactTextarea } from '../ContactTextarea/ContactTextarea';

type ContactFormType = {
	name: string;
	email: string;
	message: string;
};

const fields = [
	{
		name: 'name',
		label: 'お名前',
		type: 'text',
		component: ContactInput,
	},
	{
		name: 'email',
		label: 'メールアドレス',
		type: 'email',
		component: ContactInput,
	},
	{
		name: 'message',
		label: '内容',
		type: undefined,
		component: ContactTextarea,
	},
] as const;

export const ContactForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting, touchedFields, isValid },
		reset,
	} = useForm<ContactFormType>({
		resolver: yupResolver(contactSchema),
		mode: 'onTouched',
		defaultValues: {
			name: '',
			email: '',
			message: '',
		},
	});

	const onSubmit = async (data: ContactFormType) => {
		try {
			console.log('送信データ:', data);
			alert('お問い合わせを送信しました。ありがとうございます。');
			reset();
		} catch (error) {
			console.error('送信エラー:', error);
			alert('送信に失敗しました。もう一度お試しください。');
		}
	};

	const getIsSuccess = (fieldName: keyof ContactFormType) => {
		const isTouched = touchedFields[fieldName];
		const hasError = errors[fieldName];
		if (isTouched && !hasError) {
			return true;
		}
		if (hasError) {
			return false;
		}
		return undefined;
	};

	return (
		<AppForm onSubmit={handleSubmit(onSubmit)} noValidate>
			<AppHeadingLv1>{siteRoutes.contact.title}</AppHeadingLv1>
			{fields.map((field) => {
				const isSuccess = getIsSuccess(field.name as keyof ContactFormType);
				const error = errors[field.name as keyof ContactFormType];
				const Component = field.component;
				const commonProps = {
					id: field.name,
					...register(field.name),
					'data-success': isSuccess,
				};
				return (
					<ContactFormGroup key={field.name}>
						<ContactFormLabel htmlFor={field.name} required>
							{field.label}
						</ContactFormLabel>
						{field.name === 'message' ? (
							<Component {...commonProps} />
						) : (
							<Component {...commonProps} type={field.type} />
						)}
						{isSuccess !== undefined && (
							<ContactError isSuccess={isSuccess}>
								{isSuccess ? '入力済み' : error?.message}
							</ContactError>
						)}
					</ContactFormGroup>
				);
			})}
			<AppButton type="submit" disabled={!isValid || isSubmitting}>
				{isSubmitting ? '送信中...' : '送信'}
			</AppButton>
		</AppForm>
	);
};
