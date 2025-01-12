import { Header } from './components/header';
import { Toaster } from 'sonner';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Header />
			<Toaster position='bottom-right' />
			{children}
		</>
	);
}
