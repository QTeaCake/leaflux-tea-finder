'use client';

import { useMemo, useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from './icons';
import { AnalyticsMap } from './analytics-map';
import type { TeaShop } from '@/lib/tea-shops';
import { Bar, BarChart, XAxis, YAxis, Tooltip } from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import type { ChartConfig } from '@/components/ui/chart';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useFirestore, useMemoFirebase, useDoc, useUser } from '@/firebase';
import { collection, doc, onSnapshot } from 'firebase/firestore';
import { Skeleton } from './ui/skeleton';

type AnalyticsEvent = {
  type: string;
  value: string;
  timestamp: any;
};

type AnalyticsContentProps = {
  teaShops: TeaShop[];
  apiKey: string | undefined;
};

function aggregate(events: AnalyticsEvent[], type: string): Record<string, number> {
  return events
    .filter(e => e.type === type)
    .reduce((acc, e) => {
      acc[e.value] = (acc[e.value] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
}

function topEntries(counts: Record<string, number>, nameMap?: Record<string, string>, limit = 7) {
  return Object.entries(counts)
    .map(([key, value]) => ({
      name: nameMap ? (nameMap[key] || key) : key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      clicks: value,
    }))
    .sort((a, b) => b.clicks - a.clicks)
    .slice(0, limit);
}

function AccessDenied({ uid }: { uid: string }) {
  return (
    <section className="w-full py-12 md:py-20 lg:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <Card className="max-w-3xl mx-auto shadow-lg border-destructive">
          <CardHeader>
            <CardTitle className="font-headline text-2xl flex items-center gap-3">
              <Icons.logo className="h-7 w-7 text-destructive" />
              Access Required
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-muted-foreground">
              Your account does not have privileges to view this page. An administrator must grant your account the 'Admin' or 'Business' role in Firestore.
            </p>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Your User ID (UID)</h4>
              <div className="p-3 bg-muted rounded-md font-mono text-sm break-all">{uid}</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export function AnalyticsContent({ teaShops, apiKey }: AnalyticsContentProps) {
  const db = useFirestore();
  const { user, isUserLoading: isAuthLoading } = useUser();

  const adminRoleRef = useMemoFirebase(() => (db && user ? doc(db, 'roles_admin', user.uid) : null), [db, user]);
  const businessRoleRef = useMemoFirebase(() => (db && user ? doc(db, 'roles_business', user.uid) : null), [db, user]);
  const { data: adminRole, isLoading: isAdminLoading } = useDoc(adminRoleRef);
  const { data: businessRole, isLoading: isBusinessLoading } = useDoc(businessRoleRef);

  const isAuthorized = !!adminRole || !!businessRole;
  const pageIsLoading = isAuthLoading || (!!user && (isAdminLoading || isBusinessLoading));

  const [events, setEvents] = useState<AnalyticsEvent[] | null>(null);
  const [eventsLoading, setEventsLoading] = useState(false);

  useEffect(() => {
    if (!db || !isAuthorized) return;
    setEventsLoading(true);
    const unsub = onSnapshot(collection(db, 'analyticsEvents'), (snap) => {
      setEvents(snap.docs.map(d => d.data() as AnalyticsEvent));
      setEventsLoading(false);
    }, () => setEventsLoading(false));
    return () => unsub();
  }, [db, isAuthorized]);

  const isLoading = pageIsLoading || (isAuthorized && eventsLoading);

  const shopNameMap = useMemo(
    () => Object.fromEntries(teaShops.map(s => [s.id, s.name])),
    [teaShops]
  );

  const stats = useMemo(() => {
    if (!events) return null;
    return {
      shopClicks: topEntries(aggregate(events, 'shopClick'), shopNameMap),
      websiteClicks: topEntries(aggregate(events, 'websiteClick'), shopNameMap),
      locationSearches: topEntries(aggregate(events, 'locationSearch')),
      teaDeserts: topEntries(aggregate(events, 'teaDesert')),
      totalSearches: events.filter(e => e.type === 'locationSearch').length,
      totalShopClicks: events.filter(e => e.type === 'shopClick').length,
      totalWebsiteClicks: events.filter(e => e.type === 'websiteClick').length,
      totalDesertSearches: events.filter(e => e.type === 'teaDesert').length,
    };
  }, [events, shopNameMap]);

  const chartConfig: ChartConfig = {
    clicks: { label: 'Count', color: 'hsl(var(--primary))' },
  };

  if (pageIsLoading) {
    return (
      <section className="w-full py-12 md:py-20 lg:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <Icons.spinner className="h-10 w-10 animate-spin mx-auto text-primary" />
          <h1 className="font-headline text-2xl font-bold mt-4">Verifying Access...</h1>
        </div>
      </section>
    );
  }

  if (!user) {
    return (
      <section className="w-full py-12 md:py-20 lg:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="font-headline text-3xl font-bold mb-4">Access Denied</h1>
          <p className="text-muted-foreground">You must be logged in. Use the "For Business" button in the footer.</p>
        </div>
      </section>
    );
  }

  if (!isAuthorized) return <AccessDenied uid={user.uid} />;

  const renderBarChart = (data: { name: string; clicks: number }[], title: string, description: string) => (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-[200px] w-full" />
        ) : data.length > 0 ? (
          <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <BarChart accessibilityLayer data={data}>
              <XAxis
                dataKey="name"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(v) => v.slice(0, 15) + (v.length > 15 ? '…' : '')}
              />
              <YAxis />
              <Tooltip content={<ChartTooltipContent />} />
              <Bar dataKey="clicks" fill="var(--color-clicks)" radius={4} />
            </BarChart>
          </ChartContainer>
        ) : (
          <p className="text-muted-foreground">No data yet.</p>
        )}
      </CardContent>
    </Card>
  );

  return (
    <section className="w-full py-12 md:py-20 lg:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center space-y-6 text-center mb-12 lg:mb-16">
          <div className="bg-primary/10 p-4 rounded-full">
            <Icons.analytics className="h-12 w-12 text-primary" />
          </div>
          <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Tea Desert Analytics
          </h1>
          <p className="max-w-[800px] text-foreground/80 md:text-xl">
            Real demand data — where people are searching for tea and finding nothing.
          </p>
        </div>

        {/* Summary stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {([
            { label: 'Total Searches', value: stats?.totalSearches ?? 0 },
            { label: 'Shop Clicks', value: stats?.totalShopClicks ?? 0 },
            { label: 'Website Visits', value: stats?.totalWebsiteClicks ?? 0 },
            { label: 'Tea Desert Hits', value: stats?.totalDesertSearches ?? 0 },
          ] as const).map(({ label, value }) => (
            <Card key={label} className="shadow-sm text-center p-4">
              <p className="text-3xl font-bold text-primary">{isLoading ? '—' : value}</p>
              <p className="text-sm text-muted-foreground mt-1">{label}</p>
            </Card>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {renderBarChart(
            stats?.locationSearches ?? [],
            'Searches by Location',
            'Where users are looking for tea — your demand map.'
          )}

          {/* Tea desert table */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Tea Desert Locations</CardTitle>
              <CardDescription>
                Searches that found zero nearby shops — the highest-value data for investors.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-48 w-full" />
              ) : (stats?.teaDeserts ?? []).length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Location</TableHead>
                      <TableHead className="text-right">Desert Searches</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {(stats?.teaDeserts ?? []).map(item => (
                      <TableRow key={item.name}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell className="text-right font-bold text-primary">{item.clicks}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-muted-foreground">No tea desert searches recorded yet.</p>
              )}
            </CardContent>
          </Card>

          {renderBarChart(
            stats?.shopClicks ?? [],
            'Most Clicked Shops',
            'Which shops users are most interested in.'
          )}
          {renderBarChart(
            stats?.websiteClicks ?? [],
            'Website Link Clicks',
            'Direct traffic sent to shop websites.'
          )}

          <Card className="shadow-lg lg:col-span-2">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Shop Distribution Map</CardTitle>
              <CardDescription>
                Tea shop density — saturated markets vs. tea deserts.
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <AnalyticsMap shops={teaShops} apiKey={apiKey} />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
