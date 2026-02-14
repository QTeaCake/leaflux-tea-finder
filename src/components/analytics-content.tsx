'use client';

import { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from './icons';
import { AnalyticsMap } from './analytics-map';
import type { TeaShop } from '@/lib/tea-shops';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useFirestore, useDoc, useMemoFirebase } from '@/firebase';
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
      name: nameMapping ? nameMapping[key] || key : key,
      clicks: value,
    }))
    .sort((a, b) => b.clicks - a.clicks)
    .slice(0, 7); // Show top 7
};

export function AnalyticsContent({ teaShops, apiKey }: AnalyticsContentProps) {
  const db = useFirestore();
  const analyticsRef = useMemoFirebase(() => db ? doc(db, 'analytics', 'data') : null, [db]);
  const { data: analyticsData, isLoading } = useDoc<AnalyticsData>(analyticsRef);

  const shopNameMap = useMemo(() => Object.fromEntries(teaShops.map(s => [s.id, s.name])), [teaShops]);

  const shopClickData = processChartData(analyticsData?.shopClicks, shopNameMap);
  const websiteClickData = processChartData(analyticsData?.websiteClicks, shopNameMap);
  const teaTypeClickData = processChartData(analyticsData?.teaTypeClicks);
  const offeringClickData = processChartData({
      ...analyticsData?.offeringClicks,
      'Ethical Sourcing': analyticsData?.ethicalClicks || 0
  });
  const locationSearchData = processChartData(analyticsData?.locationSearches);

  const chartConfig = {
      clicks: {
        label: "Clicks",
        color: "hsl(var(--primary))",
      },
  } satisfies import('@/components/ui/chart').ChartConfig;

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
                        <TableCell className="font-medium capitalize">{item.name}</TableCell>
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
