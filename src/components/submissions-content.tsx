'use client';

import { useState, useEffect, useTransition, useMemo } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button, buttonVariants } from '@/components/ui/button';
import { Icons } from './icons';
import { format } from 'date-fns';
import { teaShops as allTeaShops, TeaShop } from '@/lib/tea-shops';
import { useToast } from '@/hooks/use-toast';
import { useFirestore, useCollection, useMemoFirebase, useUser } from '@/firebase';
import { collection, doc, deleteDoc, orderBy, query, Timestamp } from 'firebase/firestore';
import { Skeleton } from './ui/skeleton';

export type WaitlistSubmission = {
  id: string;
  email: string;
  submittedAt: Timestamp;
};

export type ContactSubmission = {
  id:string;
  name: string;
  email: string;
  message: string;
  submittedAt: Timestamp;
};

export type ShopSuggestionSubmission = {
  id: string;
  shopName: string;
  shopLocation: string;
  notes?: string;
  submittedAt: Timestamp;
};


// This component ensures date formatting only happens on the client,
// after hydration, to prevent a server-client mismatch.
function ClientFormattedDate({ date }: { date: Timestamp | Date }) {
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    // new Date() can be different on server and client, causing a hydration error.
    // By running this in useEffect, we ensure it only runs on the client.
    const dateObj = date instanceof Timestamp ? date.toDate() : date;
    setFormattedDate(format(dateObj, "PPP p"));
  }, [date]);

  // Render nothing on the server and initial client render.
  // The date will appear after the component mounts on the client.
  return <>{formattedDate || <Skeleton className="h-4 w-36" />}</>;
}


export function SubmissionsContent() {
  const sortedTeaShops = [...allTeaShops].sort((a, b) => a.name.localeCompare(b.name));
  const [isPending, startTransition] = useTransition();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{type: 'waitlist' | 'contact' | 'suggestions', id: string} | null>(null);

  const { toast } = useToast();
  const db = useFirestore();
  const { user, isUserLoading: isAuthLoading } = useUser(); // Get user and auth loading state

  // Queries will only be created if db and user are available
  const waitlistQuery = useMemoFirebase(() => db && user ? query(collection(db, 'waitlistEntries'), orderBy('submittedAt', 'desc')) : null, [db, user]);
  const contactQuery = useMemoFirebase(() => db && user ? query(collection(db, 'feedbackSubmissions'), orderBy('submittedAt', 'desc')) : null, [db, user]);
  const suggestionsQuery = useMemoFirebase(() => db && user ? query(collection(db, 'shopSuggestionSubmissions'), orderBy('submittedAt', 'desc')) : null, [db, user]);

  const { data: waitlist, isLoading: loadingWaitlist } = useCollection<WaitlistSubmission>(waitlistQuery);
  const { data: contact, isLoading: loadingContact } = useCollection<ContactSubmission>(contactQuery);
  const { data: suggestions, isLoading: loadingSuggestions } = useCollection<ShopSuggestionSubmission>(suggestionsQuery);

  const isLoading = isAuthLoading || loadingWaitlist || loadingContact || loadingSuggestions;

  const handleDelete = () => {
    if (!itemToDelete || !db) return;
    const { type, id } = itemToDelete;

    startTransition(async () => {
        let collectionName = '';
        if (type === 'waitlist') collectionName = 'waitlistEntries';
        else if (type === 'contact') collectionName = 'feedbackSubmissions';
        else if (type === 'suggestions') collectionName = 'shopSuggestionSubmissions';

        if (!collectionName) return;

      try {
        await deleteDoc(doc(db, collectionName, id));
        toast({
            title: 'Submission Deleted',
            description: 'The entry has been removed.',
        });
      } catch (error) {
        console.error('Error deleting document:', error);
        toast({
            variant: 'destructive',
            title: 'Error Deleting Submission',
            description: 'Could not delete submission.',
        });
      } finally {
        setDialogOpen(false);
        setItemToDelete(null);
      }
    });
  };

  const openDeleteDialog = (type: 'waitlist' | 'contact' | 'suggestions', id: string) => {
    setItemToDelete({ type, id });
    setDialogOpen(true);
  }

  // If user is not authenticated after loading, show an access denied message.
  if (!isAuthLoading && !user) {
    return (
        <section className="w-full py-12 md:py-20 lg:py-24 bg-background">
            <div className="container mx-auto px-4 md:px-6 text-center">
                <h1 className="font-headline text-3xl font-bold mb-4">Access Denied</h1>
                <p className="text-muted-foreground">You must be logged in to view this page. Please use the "Submissions" button in the footer.</p>
            </div>
        </section>
    )
  }
  
  return (
    <section className="w-full py-12 md:py-20 lg:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center space-y-6 text-center mb-12 lg:mb-16">
          <div className="bg-primary/10 p-4 rounded-full">
            <Icons.inbox className="h-12 w-12 text-primary" />
          </div>
          <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Form Submissions
          </h1>
          <p className="max-w-[800px] text-foreground/80 md:text-xl">
            Here are the latest entries from your website's forms.
          </p>
        </div>

        <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete this submission.
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setItemToDelete(null)}>Cancel</AlertDialogCancel>
                <AlertDialogAction
                    disabled={isPending}
                    className={buttonVariants({ variant: "destructive" })}
                    onClick={handleDelete}
                >
                    {isPending ? <Icons.spinner className="animate-spin" /> : "Delete"}
                </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

        <Tabs defaultValue="contact" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="contact">Contact Us ({contact?.length ?? 0})</TabsTrigger>
            <TabsTrigger value="suggestions">Shop Suggestions ({suggestions?.length ?? 0})</TabsTrigger>
            <TabsTrigger value="waitlist">Waitlist ({waitlist?.length ?? 0})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <CardTitle>Contact Form Submissions</CardTitle>
                <CardDescription>Messages from your users.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Message</TableHead>
                      <TableHead className="text-right w-[50px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      <TableRow><TableCell colSpan={5} className="h-24 text-center"><Icons.spinner className="h-6 w-6 animate-spin mx-auto" /></TableCell></TableRow>
                    ) : contact && contact.length > 0 ? (
                      contact.map((s) => (
                        <TableRow key={s.id}>
                          <TableCell className="font-medium whitespace-nowrap">
                            <ClientFormattedDate date={s.submittedAt} />
                          </TableCell>
                          <TableCell>{s.name}</TableCell>
                          <TableCell>{s.email}</TableCell>
                          <TableCell>{s.message}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon" disabled={isPending} onClick={() => openDeleteDialog('contact', s.id)}>
                                <Icons.trash className="h-4 w-4 text-destructive" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center h-24">No submissions yet.</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="suggestions">
          <Card>
              <CardHeader>
                <CardTitle>Shop Suggestion Submissions</CardTitle>
                <CardDescription>New tea shops suggested by your users. Use the dropdown to see shops already in the system.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div>
                  <h4 className="font-medium mb-2 text-foreground">Currently Indexed Shops ({allTeaShops.length})</h4>
                  <Select>
                    <SelectTrigger className="w-full md:w-[300px]">
                      <SelectValue placeholder="View existing shops..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {sortedTeaShops.length > 0 ? (
                          sortedTeaShops.map((shop) => (
                            <SelectItem key={shop.id} value={shop.name} className="select-text">
                              {shop.name}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value="none" disabled>No shops available</SelectItem>
                        )}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Shop Name</TableHead>
                      <TableHead>Location / Website</TableHead>
                      <TableHead>Notes</TableHead>
                      <TableHead className="text-right w-[50px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                     {isLoading ? (
                      <TableRow><TableCell colSpan={5} className="h-24 text-center"><Icons.spinner className="h-6 w-6 animate-spin mx-auto" /></TableCell></TableRow>
                    ) : suggestions && suggestions.length > 0 ? (
                      suggestions.map((s) => (
                        <TableRow key={s.id}>
                          <TableCell className="font-medium whitespace-nowrap">
                             <ClientFormattedDate date={s.submittedAt} />
                          </TableCell>
                          <TableCell>{s.shopName}</TableCell>
                          <TableCell>{s.shopLocation}</TableCell>
                          <TableCell>{s.notes}</TableCell>
                           <TableCell className="text-right">
                             <Button variant="ghost" size="icon" disabled={isPending} onClick={() => openDeleteDialog('suggestions', s.id)}>
                                <Icons.trash className="h-4 w-4 text-destructive" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center h-24">No suggestions yet.</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="waitlist">
          <Card>
              <CardHeader>
                <CardTitle>Waitlist Signups</CardTitle>
                <CardDescription>Users interested in future updates.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead className="text-right w-[50px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                     {isLoading ? (
                      <TableRow><TableCell colSpan={3} className="h-24 text-center"><Icons.spinner className="h-6 w-6 animate-spin mx-auto" /></TableCell></TableRow>
                    ) : waitlist && waitlist.length > 0 ? (
                      waitlist.map((s) => (
                        <TableRow key={s.id}>
                          <TableCell className="font-medium whitespace-nowrap">
                             <ClientFormattedDate date={s.submittedAt} />
                          </TableCell>
                          <TableCell>{s.email}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon" disabled={isPending} onClick={() => openDeleteDialog('waitlist', s.id)}>
                                <Icons.trash className="h-4 w-4 text-destructive" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={3} className="text-center h-24">No signups yet.</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
