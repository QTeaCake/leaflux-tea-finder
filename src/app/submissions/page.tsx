import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { SubmissionsContent } from '@/components/submissions-content';
import { getSubmissions } from '@/lib/services';
import { teaShops } from '@/lib/tea-shops';

// This is a simplified setup for prototyping. In a real-world application,
// this page would be protected by a robust authentication system (e.g., NextAuth, Clerk)
// to ensure only authorized users can view submissions. The current password-gate
// is a client-side convenience and does not protect the route from direct URL access.

export default async function SubmissionsPage() {
    const submissions = await getSubmissions();

    return (
        <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
            <SubmissionsContent submissions={submissions} teaShops={teaShops} />
        </main>
        <Footer />
        </div>
    );
}
