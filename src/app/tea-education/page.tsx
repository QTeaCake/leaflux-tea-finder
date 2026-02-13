import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { TeaEducationContent } from '@/components/tea-education-content';

export default function TeaEducationPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <TeaEducationContent />
      </main>
      <Footer />
    </div>
  );
}
