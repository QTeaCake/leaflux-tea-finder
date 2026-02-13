'use client';

import { useState, useEffect, useTransition } from 'react';
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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button, buttonVariants } from '@/components/ui/button';
import { Icons } from './icons';
import { format } from 'date-fns';
import type { TeaShop } from '@/lib/tea-shops';
import type { Submissions } from '@/lib/services';
import { useToast } from '@/hooks/use-toast';
import { deleteSubmissionAction } from '@/app/actions';


type Props = {
  submissions: Submissions;
  teaShops: TeaShop[];
};

// This component ensures date formatting only happens on the client,
// after hydration, to prevent a server-client mismatch.
function ClientFormattedDate({ dateString }: { dateString: string }) {
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    // new Date() can be different on server and client, causing a hydration error.
    // By running this in useEffect, we ensure it only runs on the client.
    setFormattedDate(format(new Date(dateString), "PPP p"));
  }, [dateString]);

  // Render nothing on the server and initial client render.
  // The date will appear after the component mounts on the client.
  return <>{formattedDate}</>;
}


export function SubmissionsContent({ submissions, teaShops }: Props) {
  const sortedTeaShops = [...teaShops].sort((a, b) => a.name.localeCompare(b.name));
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleDelete = (type: 'waitlist' | 'contact' | 'suggestions', submittedAt: string) => {
    startTransition(async () => {
      const result = await deleteSubmissionAction(type, submittedAt);
      if (result?.errors?._form) {
        toast({
            variant: 'destructive',
            title: 'Error Deleting Submission',
            description: result.errors._form[0],
        });
      } else {
        toast({
            title: 'Submission Deleted',
            description: 'The entry has been removed.',
        });
      }
    });
  };
  
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

        <Tabs defaultValue="contact" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="contact">Contact Us ({submissions.contact.length})</TabsTrigger>
            <TabsTrigger value="suggestions">Shop Suggestions ({submissions.suggestions.length})</TabsTrigger>
            <TabsTrigger value="waitlist">Waitlist ({submissions.waitlist.length})</TabsTrigger>
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
                    {submissions.contact.length > 0 ? (
                      submissions.contact.map((s) => (
                        <TableRow key={s.submittedAt}>
                          <TableCell className="font-medium whitespace-nowrap">
                            <ClientFormattedDate dateString={s.submittedAt} />
                          </TableCell>
                          <TableCell>{s.name}</TableCell>
                          <TableCell>{s.email}</TableCell>
                          <TableCell>{s.message}</TableCell>
                          <TableCell className="text-right">
                             <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="icon" disabled={isPending}>
                                  <Icons.trash className="h-4 w-4 text-destructive" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete this submission.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    disabled={isPending}
                                    className={buttonVariants({ variant: "destructive" })}
                                    onClick={() => handleDelete('contact', s.submittedAt)}
                                  >
                                    {isPending ? <Icons.spinner className="animate-spin" /> : "Delete"}
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
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
                  <h4 className="font-medium mb-2 text-foreground">Currently Indexed Shops ({teaShops.length})</h4>
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
                    {submissions.suggestions.length > 0 ? (
                      submissions.suggestions.map((s) => (
                        <TableRow key={s.submittedAt}>
                          <TableCell className="font-medium whitespace-nowrap">
                             <ClientFormattedDate dateString={s.submittedAt} />
                          </TableCell>
                          <TableCell>{s.shopName}</TableCell>
                          <TableCell>{s.shopLocation}</TableCell>
                          <TableCell>{s.notes}</TableCell>
                           <TableCell className="text-right">
                             <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="icon" disabled={isPending}>
                                  <Icons.trash className="h-4 w-4 text-destructive" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete this submission.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    disabled={isPending}
                                    className={buttonVariants({ variant: "destructive" })}
                                    onClick={() => handleDelete('suggestions', s.submittedAt)}
                                  >
                                    {isPending ? <Icons.spinner className="animate-spin" /> : "Delete"}
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
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
                    {submissions.waitlist.length > 0 ? (
                      submissions.waitlist.map((s) => (
                        <TableRow key={s.submittedAt}>
                          <TableCell className="font-medium whitespace-nowrap">
                             <ClientFormattedDate dateString={s.submittedAt} />
                          </TableCell>
                          <TableCell>{s.email}</TableCell>
                          <TableCell className="text-right">
                             <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="icon" disabled={isPending}>
                                  <Icons.trash className="h-4 w-4 text-destructive" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete this submission.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    disabled={isPending}
                                    className={buttonVariants({ variant: "destructive" })}
                                    onClick={() => handleDelete('waitlist', s.submittedAt)}
                                  >
                                    {isPending ? <Icons.spinner className="animate-spin" /> : "Delete"}
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
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
