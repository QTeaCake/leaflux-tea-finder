import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { SubmissionsContent } from '@/components/submissions-content';

// This is a simplified setup for prototyping. In a real-world application,
// this page would be protected by a robust authentication system (e.g., NextAuth, Clerk)
// to ensure only authorized users can view submissions. The current password-gate
// is a client-side convenience and does not protect the route from direct URL access.
// Firestore security rules are now the primary mechanism for protecting this data.

export default function SubmissionsPage() {
    return (
        <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
            <SubmissionsContent />
        </main>
        <Footer />
        </div>
    );
}
