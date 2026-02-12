import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { AboutContent } from '@/components/about-content';

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <AboutContent />
      </main>
      <Footer />
    </div>
  );
}
