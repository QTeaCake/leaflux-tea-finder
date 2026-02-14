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


export function SubmissionsGate({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { toast } = useToast();
  const auth = useAuth();

  const handleAccess = () => {
    if (!auth) {
      setError('Authentication service is not available. Please try again later.');
      return;
    }

    // Use the user's actual email address for authentication.
    const adminEmail = 'mayo.anastatius@gmail.com';
    signInWithEmailAndPassword(auth, adminEmail, code)
      .then(() => {
        setError('');
        toast({
          title: 'Access Granted',
          description: 'Redirecting to submissions dashboard...',
        });
        setIsOpen(false);
        router.push('/submissions');
      })
      .catch((authError) => {
        console.error('SubmissionsGate Auth Error:', authError);
        // Provide a generic but clear error for invalid credentials
        if (['auth/wrong-password', 'auth/user-not-found', 'auth/invalid-credential'].includes(authError.code)) {
            setError('Invalid access code. Please try again.');
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
            <Icons.inbox className="h-5 w-5 text-primary" />
            View Submissions
          </DialogTitle>
          <DialogDescription>
            Enter the access code to view form submissions.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="access-code" className="text-right">
              Code
            </Label>
            <Input
              id="access-code"
              type="password"
              value={code}
              onChange={(e) => setCode(e.target.value)}
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
