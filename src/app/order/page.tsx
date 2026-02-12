import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { OrderContent } from '@/components/order-content';

export default function OrderPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <OrderContent />
      </main>
      <Footer />
    </div>
  );
}