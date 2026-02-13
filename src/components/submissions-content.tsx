'use client';

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
import { Icons } from './icons';
import { format } from 'date-fns';
import type { TeaShop } from '@/lib/tea-shops';

type Submissions = {
  waitlist: { email: string; submittedAt: string }[];
  contact: { name: string; email: string; message: string; submittedAt: string }[];
  suggestions: { shopName: string; shopLocation: string; notes?: string; submittedAt: string }[];
};

type Props = {
  submissions: Submissions;
  teaShops: TeaShop[];
};

export function SubmissionsContent({ submissions, teaShops }: Props) {
  const sortedTeaShops = [...teaShops].sort((a, b) => a.name.localeCompare(b.name));
  
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
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {submissions.contact.length > 0 ? (
                      submissions.contact.map((s, i) => (
                        <TableRow key={i}>
                          <TableCell className="font-medium whitespace-nowrap">{format(new Date(s.submittedAt), "PPP p")}</TableCell>
                          <TableCell>{s.name}</TableCell>
                          <TableCell>{s.email}</TableCell>
                          <TableCell>{s.message}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center h-24">No submissions yet.</TableCell>
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
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {submissions.suggestions.length > 0 ? (
                      submissions.suggestions.map((s, i) => (
                        <TableRow key={i}>
                          <TableCell className="font-medium whitespace-nowrap">{format(new Date(s.submittedAt), "PPP p")}</TableCell>
                          <TableCell>{s.shopName}</TableCell>
                          <TableCell>{s.shopLocation}</TableCell>
                          <TableCell>{s.notes}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center h-24">No suggestions yet.</TableCell>
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
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {submissions.waitlist.length > 0 ? (
                      submissions.waitlist.map((s, i) => (
                        <TableRow key={i}>
                          <TableCell className="font-medium whitespace-nowrap">{format(new Date(s.submittedAt), "PPP p")}</TableCell>
                          <TableCell>{s.email}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={2} className="text-center h-24">No signups yet.</TableCell>
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
