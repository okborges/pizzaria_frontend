import type { Metadata } from 'next';
import './globals.scss';

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
			<body>{children}</body>
		</html>
	);
}
