import type { Metadata } from 'next';
import './globals.scss';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
	title: `Pizzaria`,
	description: `Totem de pizzas`,
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='pt-br'>
			<Toaster position='bottom-right' />
			<body>{children}</body>
		</html>
	);
}
