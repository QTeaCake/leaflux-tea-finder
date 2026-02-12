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

const ACCESS_CODE = '2223';

export function AnalyticsGate() {
  const [isOpen, setIsOpen] = useState(false);
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { toast } = useToast();

  const handleAccess = () => {
    if (code === ACCESS_CODE) {
      setError('');
      toast({
        title: 'Access Granted',
        description: 'Redirecting to the analytics dashboard...',
      });
      setIsOpen(false);
      router.push('/analytics');
    } else {
      setError('Invalid access code. Please try again.');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          For Business
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-headline flex items-center gap-2">
            <Icons.analytics className="h-5 w-5 text-primary" />
            Business Analytics
          </DialogTitle>
          <DialogDescription>
            Enter the access code to view the analytics dashboard.
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
