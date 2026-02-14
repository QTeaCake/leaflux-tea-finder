'use client';

import { useMemo, useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from './icons';
import { AnalyticsMap } from './analytics-map';
import type { TeaShop } from '@/lib/tea-shops';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useFirestore, useDoc, useMemoFirebase, useUser } from '@/firebase';
import { doc } from 'firebase/firestore';
import { Skeleton } from './ui/skeleton';

type AnalyticsData = {
  shopClicks?: Record<string, number>;
  teaTypeClicks?: Record<string, number>;
  offeringClicks?: Record<string, number>;
  ethicalClicks?: number;
  websiteClicks?: Record<string, number>;
  directionsClicks?: Record<string, number>;
  locationSearches?: Record<string, number>;
};

type AnalyticsContentProps = {
  teaShops: TeaShop[];
  apiKey: string | undefined;
};

const processChartData = (
  data: Record<string, number> | undefined,
  nameMapping?: Record<string, string>
) => {
  if (!data) return [];
  return Object.entries(data)
    .map(([key, value]) => ({
      name: nameMapping ? nameMapping[key] || key : key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      clicks: value,
    }))
    .sort((a, b) => b.clicks - a.clicks)
    .slice(0, 7); // Show top 7
};

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
            <CardDescription>
              You are signed in, but your account does not have privileges to view this page.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-muted-foreground">
              To view this dashboard, you must have either an 'Admin' or 'Business' role. Please ask an administrator to grant your user account the appropriate rights in the Firestore database.
            </p>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Your User ID (UID)</h4>
              <div className="p-3 bg-muted rounded-md font-mono text-sm break-all">
                {uid}
              </div>
               <p className="text-xs text-muted-foreground mt-1">This is the unique identifier for your account.</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Instructions for Admin</h4>
              <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
                <li>Go to the project's <strong>Firestore Database</strong> in the Firebase Console.</li>
                <li>To grant admin access, create a document in the <code className="font-mono bg-muted p-1 rounded text-foreground">roles_admin</code> collection with this UID as the Document ID.</li>
                <li>To grant business access, create a document in the <code className="font-mono bg-muted p-1 rounded text-foreground">roles_business</code> collection with this UID as the Document ID.</li>
              </ol>
            </div>
            <p className="text-sm text-muted-foreground pt-2">
              Once this is done, please refresh this page.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export function AnalyticsContent({ teaShops, apiKey }: AnalyticsContentProps) {
  const db = useFirestore();
  const { user, isUserLoading: isAuthLoading } = useUser();

  // 1. Check for roles
  const adminRoleRef = useMemoFirebase(() => (db && user ? doc(db, 'roles_admin', user.uid) : null), [db, user]);
  const businessRoleRef = useMemoFirebase(() => (db && user ? doc(db, 'roles_business', user.uid) : null), [db, user]);
  
  const { data: adminRole, isLoading: isAdminLoading } = useDoc(adminRoleRef);
  const { data: businessRole, isLoading: isBusinessLoading } = useDoc(businessRoleRef);

  const isConfirmedAdmin = !!adminRole;
  const isConfirmedBusinessUser = !!businessRole;
  const isAuthorized = isConfirmedAdmin || isConfirmedBusinessUser;

  // 2. Make analytics query dependent on authorization
  const analyticsRef = useMemoFirebase(() => (db && isAuthorized ? doc(db, 'analytics', 'data') : null), [db, isAuthorized]);
  const { data: analyticsData, isLoading: loadingAnalytics } = useDoc<AnalyticsData>(analyticsRef);
  
  const pageIsLoading = isAuthLoading || (user && (isAdminLoading || isBusinessLoading));

  const isLoading = pageIsLoading || (isAuthorized && loadingAnalytics);

  const shopNameMap = useMemo(() => Object.fromEntries(teaShops.map(s => [s.id, s.name])), [teaShops]);

  const shopClickData = processChartData(analyticsData?.shopClicks, shopNameMap);
  const websiteClickData = processChartData(analyticsData?.websiteClicks, shopNameMap);
  const teaTypeClickData = processChartData(analyticsData?.teaTypeClicks);
  const offeringClickData = processChartData({
      ...(analyticsData?.offeringClicks || {}),
      'Ethical Sourcing': analyticsData?.ethicalClicks || 0
  });
  const locationSearchData = processChartData(analyticsData?.locationSearches);

  const chartConfig = {
      clicks: {
        label: "Clicks",
        color: "hsl(var(--primary))",
      },
  } satisfies import('@/components/ui/chart').ChartConfig;

  if (pageIsLoading) {
    return (
      <section className="w-full py-12 md:py-20 lg:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6 text-center">
            <Icons.spinner className="h-10 w-10 animate-spin mx-auto text-primary" />
            <h1 className="font-headline text-2xl font-bold mt-4">Verifying Access...</h1>
        </div>
      </section>
    )
  }

  if (!user) {
    return (
        <section className="w-full py-12 md:py-20 lg:py-24 bg-background">
            <div className="container mx-auto px-4 md:px-6 text-center">
                <h1 className="font-headline text-3xl font-bold mb-4">Access Denied</h1>
                <p className="text-muted-foreground">You must be logged in to view this page. Please use the "For Business" button in the footer.</p>
            </div>
        </section>
    )
  }
  
  if (!isAuthorized) {
      return <AccessDenied uid={user.uid} />;
  }

  const renderChart = (data: {name: string, clicks: number}[], title: string, description: string) => (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? <Skeleton className="h-[200px] w-full" /> : data.length > 0 ? (
          <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
              <BarChart accessibilityLayer data={data}>
                  <XAxis dataKey="name" tickLine={false} tickMargin={10} axisLine={false} tickFormatter={(value) => value.slice(0, 15) + (value.length > 15 ? '...' : '')} />
                  <YAxis />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="clicks" fill="var(--color-clicks)" radius={4} />
              </BarChart>
          </ChartContainer>
        ) : <p className="text-muted-foreground">No data yet.</p>}
      </CardContent>
    </Card>
  );
      
  return (
    <section className="w-full py-12 md:py-20 lg:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center space-y-6 text-center mb-12 lg:mb-20">
          <div className="bg-primary/10 p-4 rounded-full">
            <Icons.analytics className="h-12 w-12 text-primary" />
          </div>
          <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Business Analytics Dashboard
          </h1>
          <p className="max-w-[800px] text-foreground/80 md:text-xl">
            Insights into market opportunities and user engagement trends.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {renderChart(shopClickData, "Most Clicked Shops", "Top shops selected by users in the list.")}
          {renderChart(websiteClickData, "Most Clicked Website Links", "Direct traffic sent to shop websites. A key metric for monetization.")}
          {renderChart(teaTypeClickData, "Popular Filters: Tea Types", "Which types of tea are users most interested in finding?")}
          {renderChart(offeringClickData, "Popular Filters: Offerings", "User interest in shop offerings and values.")}
          
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">User Interest by Location (Demand)</CardTitle>
              <CardDescription>Top locations searched by users, indicating regional demand.</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? <Skeleton className="h-48 w-full" /> : locationSearchData.length > 0 ? (
                 <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Location</TableHead>
                      <TableHead className="text-right">Searches</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {locationSearchData.map(item => (
                      <TableRow key={item.name}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell className="text-right">{item.clicks}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : <p className="text-muted-foreground">No location search data yet.</p>}
            </CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Tea Shop Distribution</CardTitle>
              <CardDescription>This heatmap visualizes tea shop density, highlighting saturated markets ('tea oases') versus untapped markets ('tea deserts').</CardDescription>
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
