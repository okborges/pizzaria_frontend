'use client';

import Image from 'next/image';
import { ChangeEvent, useState } from 'react';
import { UploadCloud } from 'lucide-react';
import { Button } from '@/app/dashboard/components/button';
import { api } from '@/services/api';
import { getCookieClient } from '@/lib/cookieClient';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import styles from './styles.module.scss';

interface CategoryProps {
	id: string;
	name: string;
}

interface Props {
	categories: CategoryProps[];
}

export default function Form({ categories }: Props) {
	const router = useRouter();
	const [image, setImage] = useState<File>();
	const [previewImage, setPreviewImage] = useState('');

	async function handleRegisterProduct(formData: FormData) {
		const category = formData.get('category');
		const name = formData.get('name');
		const price = formData.get('price');
		const description = formData.get('description');

		if (!category || !name || !price || !description || !image) {
			toast.warning('Preencha todos os campos!');
			return;
		}

		const data = new FormData();

		data.append('name', name);
		data.append('price', price);
		data.append('description', description);
		data.append('category_id', category);
		data.append('file', image);

		const token = await getCookieClient();

		await api
			.post('/product', data, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.catch((error) => {
				console.log(error);
				toast.error('Erro ao cadastrar produto!');
				return;
			});

		toast.success('Produto cadastrado com sucesso!');
		router.push('/dashboard');
	}

	function handleFile(e: ChangeEvent<HTMLInputElement>) {
		if (e.target.files && e.target.files[0]) {
			const image = e.target.files[0];

			if (image.type !== 'image/jpeg' && image.type !== 'image/png') {
				toast.error('Formato de imagem inválido!');
				return;
			}

			setImage(image);
			setPreviewImage(URL.createObjectURL(image));
		}
	}

	return (
		<main className={styles.container}>
			<h1>Novo produto</h1>

			<form className={styles.form} action={handleRegisterProduct}>
				<label className={styles.labelImage}>
					<span>
						<UploadCloud size={30} color='#FFF' />
					</span>

					<input
						type='file'
						accept='image/png, image/jpeg'
						onChange={handleFile}
					/>

					{previewImage && (
						<Image
							alt='Imagem de preview'
							src={previewImage}
							className={styles.preview}
							fill={true}
							quality={100}
							priority={true}
						/>
					)}
				</label>

				<select name='category'>
					{categories.map((category, index) => (
						<option key={index} value={category.id}>
							{category.name}
						</option>
					))}
				</select>

				<input
					type='text'
					name='name'
					placeholder='Digite o nome do produto...'
					className={styles.input}
				/>

				<input
					type='text'
					name='price'
					placeholder='Preço do produto...'
					className={styles.input}
				/>

				<textarea
					className={styles.input}
					placeholder='Digite a descrição do produto...'
					name='description'
				></textarea>

				<Button name='Cadastrar produto' />
			</form>
		</main>
	);
}
