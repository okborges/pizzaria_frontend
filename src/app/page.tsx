import logo from '../../public/logo.svg';
import Image from 'next/image';
import styles from './page.module.scss';
import Link from 'next/link';
import { api } from '@/services/api';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

async function handleLogin(formData: FormData) {
	'use server';

	const email = formData.get('email');
	const password = formData.get('password');

	if (email === '' || password === '') {
		console.log('PREENCHA TODOS OS CAMPOS');
		return;
	}

	try {
		const response = await api.post('/login', {
			email,
			password,
		});

		if (!response.data.token) {
			return;
		}

		console.log(response.data);

		const expressTime = 60 * 60 * 24 * 30 * 1000;
		const cookieStore = await cookies();

		cookieStore.set('session', response.data.token, {
			maxAge: expressTime,
			path: '/',
			httpOnly: false,
			secure: process.env.NODE_ENV === 'production',
		});
	} catch (err) {
		console.log('error');
		console.log(err);
	}
	redirect('/dashboard');
}

export default function Home() {
	return (
		<main className={styles.containerCenter}>
			<Image src={logo} alt='logo' />
			<section className={styles.login}>
				<form action={handleLogin}>
					<input
						type='email'
						required
						name='email'
						placeholder='Digite seu email...'
						className={styles.input}
					/>

					<input
						type='password'
						required
						name='password'
						placeholder='***********'
						className={styles.input}
					/>

					<button type='submit'>Acessar</button>
				</form>

				<Link href='/signup' className={styles.text}>
					Não possui uma conta? Cadastre-se
				</Link>
			</section>
		</main>
	);
}
