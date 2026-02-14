import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { AnalyticsContent } from '@/components/analytics-content';
import { teaShops } from '@/lib/tea-shops';

export default function AnalyticsPage() {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    return (
        <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
            <AnalyticsContent 
                teaShops={teaShops} 
                apiKey={apiKey}
            />
        </main>
        <Footer />
        </div>
    );
}
