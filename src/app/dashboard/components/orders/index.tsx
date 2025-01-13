'use client';
import { use } from 'react';
import styles from './styles.module.scss';
import { RefreshCw } from 'lucide-react';
import Modalorder from '../modal';
import { OrderContext } from '@/providers/order';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface OrderProps {
	id: string;
	table: number;
	name: string;
	draft: boolean;
	status: boolean;
}

interface Props {
	orders: OrderProps[];
}

export default function Orders({ orders }: Props) {
	const { isOpen, onRequestOpen } = use(OrderContext);
	const router = useRouter();

	async function handleDetailOrder(order_id: string) {
		await onRequestOpen(order_id);
	}

	function handleRefresh() {
		router.refresh();
		toast.success('Pedidos atualizados');
	}

	return (
		<>
			<main className={styles.container}>
				<section className={styles.containerHeader}>
					<h1>Últimos pedidos</h1>
					<button onClick={handleRefresh}>
						<RefreshCw size={24} color='#3fffa3' />
					</button>
				</section>

				<section className={styles.listOrders}>
					{orders.length === 0 && <span>Nenhum pedido encontrado</span>}

					{orders.map((order) => (
						<button
							key={order.id}
							className={styles.orderItem}
							onClick={() => handleDetailOrder(order.id)}
						>
							<div className={styles.tag} />
							<span>{`Mesa ${order.table}`}</span>
						</button>
					))}
				</section>
			</main>
			{isOpen && <Modalorder />}
		</>
	);
}
