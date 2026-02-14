'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Icons } from './icons';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export function AnalyticsGate({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { toast } = useToast();
  const auth = useAuth();

  const handleAccess = () => {
    if (!auth) {
      setError('Authentication service is not available. Please try again later.');
      return;
    }
    if (!email) {
      setError('Please enter an email address.');
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setError('');
        toast({
          title: 'Access Granted',
          description: 'Redirecting to the analytics dashboard...',
        });
        setIsOpen(false);
        router.push('/analytics');
      })
      .catch((authError) => {
        console.error('AnalyticsGate Auth Error:', authError);
        if (['auth/wrong-password', 'auth/user-not-found', 'auth/invalid-credential'].includes(authError.code)) {
            setError('Invalid email or password. Please try again.');
        } else {
            setError('An authentication error occurred. Please try again.');
        }
      });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-headline flex items-center gap-2">
            <Icons.analytics className="h-5 w-5 text-primary" />
            Business Analytics
          </DialogTitle>
          <DialogDescription>
            Enter your business credentials to view the analytics dashboard.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="col-span-3"
              placeholder="business@example.com"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="col-span-3"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAccess();
                }
              }}
            />
          </div>
          {error && <p className="text-center text-sm text-destructive">{error}</p>}
        </div>
        <DialogFooter>
          <Button onClick={handleAccess}>Enter</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
