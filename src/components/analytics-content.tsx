'use client';

import { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from './icons';
import { AnalyticsMap } from './analytics-map';
import type { TeaShop } from '@/lib/tea-shops';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';


type AnalyticsData = {
  shopClicks: Record<string, number>;
  teaTypeClicks: Record<string, number>;
  offeringClicks: Record<string, number>;
  ethicalClicks: number;
  websiteClicks: Record<string, number>;
  directionsClicks: Record<string, number>;
  locationSearches: Record<string, number>;
};

type AnalyticsContentProps = {
  analyticsData: AnalyticsData;
  teaShops: TeaShop[];
  apiKey: string | undefined;
};

const processChartData = (
  data: Record<string, number>,
  nameMapping?: Record<string, string>
) => {
  return Object.entries(data)
    .map(([key, value]) => ({
      name: nameMapping ? nameMapping[key] || key : key,
      clicks: value,
    }))
    .sort((a, b) => b.clicks - a.clicks)
    .slice(0, 7); // Show top 7
};

export function AnalyticsContent({ analyticsData, teaShops, apiKey }: AnalyticsContentProps) {
    const shopNameMap = useMemo(() => Object.fromEntries(teaShops.map(s => [s.id, s.name])), [teaShops]);

    const shopClickData = processChartData(analyticsData.shopClicks, shopNameMap);
    const websiteClickData = processChartData(analyticsData.websiteClicks, shopNameMap);
    const teaTypeClickData = processChartData(analyticsData.teaTypeClicks);
    const offeringClickData = processChartData({
        ...analyticsData.offeringClicks,
        'Ethical Sourcing': analyticsData.ethicalClicks
    });
    const locationSearchData = processChartData(analyticsData.locationSearches);

    const chartConfig = {
        clicks: {
          label: "Clicks",
          color: "hsl(var(--primary))",
        },
    } satisfies import('@/components/ui/chart').ChartConfig;
      
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
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Most Clicked Shops</CardTitle>
              <CardDescription>Top shops selected by users in the list.</CardDescription>
            </CardHeader>
            <CardContent>
              {shopClickData.length > 0 ? (
                <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                    <BarChart accessibilityLayer data={shopClickData}>
                        <XAxis dataKey="name" tickLine={false} tickMargin={10} axisLine={false} tickFormatter={(value) => value.slice(0, 15) + (value.length > 15 ? '...' : '')} />
                        <YAxis />
                        <Tooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="clicks" fill="var(--color-clicks)" radius={4} />
                    </BarChart>
                </ChartContainer>
              ) : <p className="text-muted-foreground">No shop click data yet.</p>}
            </CardContent>
          </Card>
           <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Most Clicked Website Links</CardTitle>
              <CardDescription>Direct traffic sent to shop websites. A key metric for monetization.</CardDescription>
            </CardHeader>
            <CardContent>
              {websiteClickData.length > 0 ? (
                <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                    <BarChart accessibilityLayer data={websiteClickData}>
                        <XAxis dataKey="name" tickLine={false} tickMargin={10} axisLine={false} tickFormatter={(value) => value.slice(0, 15) + (value.length > 15 ? '...' : '')} />
                        <YAxis />
                        <Tooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="clicks" fill="var(--color-clicks)" radius={4} />
                    </BarChart>
                </ChartContainer>
              ) : <p className="text-muted-foreground">No website click data yet.</p>}
            </CardContent>
          </Card>
           <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Popular Filters: Tea Types</CardTitle>
              <CardDescription>Which types of tea are users most interested in finding?</CardDescription>
            </CardHeader>
            <CardContent>
              {teaTypeClickData.length > 0 ? (
                <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                    <BarChart accessibilityLayer data={teaTypeClickData}>
                        <XAxis dataKey="name" tickLine={false} tickMargin={10} axisLine={false} />
                        <YAxis />
                        <Tooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="clicks" fill="var(--color-clicks)" radius={4} />
                    </BarChart>
                </ChartContainer>
              ) : <p className="text-muted-foreground">No filter data yet.</p>}
            </CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Popular Filters: Offerings</CardTitle>
              <CardDescription>User interest in shop offerings and values.</CardDescription>
            </CardHeader>
            <CardContent>
              {offeringClickData.length > 0 ? (
                 <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                    <BarChart accessibilityLayer data={offeringClickData}>
                        <XAxis dataKey="name" tickLine={false} tickMargin={10} axisLine={false} />
                        <YAxis />
                        <Tooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="clicks" fill="var(--color-clicks)" radius={4} />
                    </BarChart>
                </ChartContainer>
              ) : <p className="text-muted-foreground">No filter data yet.</p>}
            </CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">User Interest by Location (Demand)</CardTitle>
              <CardDescription>Top locations searched by users, indicating regional demand.</CardDescription>
            </CardHeader>
            <CardContent>
              {locationSearchData.length > 0 ? (
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
