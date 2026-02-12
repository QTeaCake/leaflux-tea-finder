import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { AnalyticsContent } from '@/components/analytics-content';

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <AnalyticsContent />
      </main>
      <Footer />
    </div>
  );
}
