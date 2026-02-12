import { Header } from '@/components/header';
import { TeaFinder } from '@/components/tea-finder';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <TeaFinder />
      </main>
      <Footer />
    </div>
  );
}
