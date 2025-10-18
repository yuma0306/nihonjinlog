import { type NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
	const { name, email, message } = await req.json();

	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: process.env.GMAIL_USER,
			pass: process.env.GMAIL_APP_PASSWORD,
		},
	});

	const mailOptions = {
		from: email,
		to: process.env.GMAIL_USER,
		subject: `【お問い合わせ】${name}さんより`,
		text: `お名前: ${name}\nメールアドレス: ${email}\n\n${message}`,
	};

	try {
		await transporter.sendMail(mailOptions);
		return NextResponse.json({ success: true }, { status: 200 });
	} catch (error) {
		console.error('メール送信失敗:', error);
		return NextResponse.json(
			{ success: false, error: '送信に失敗しました' },
			{ status: 500 },
		);
	}
}
