import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from './icons';

export function TeaEducationContent() {
  return (
    <section className="w-full py-12 md:py-20 lg:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center space-y-6 text-center mb-12 lg:mb-20">
          <div className="bg-primary/10 p-4 rounded-full">
            <Icons.education className="h-12 w-12 text-primary" />
          </div>
          <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            The World of Tea: A Beginner's Guide
          </h1>
          <p className="max-w-[800px] text-foreground/80 md:text-xl">
            Demystifying the rich world of tea, from the six main types to the tools used to brew them and the experiences that deepen our appreciation for this ancient craft.
          </p>
        </div>

        {/* Types of Tea Section */}
        <div className="max-w-4xl mx-auto mb-16 lg:mb-24">
            <h2 className="font-headline text-3xl font-bold text-center mb-8">The Six Main Types of Tea</h2>
            <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
                <AccordionTrigger className="font-semibold text-lg">Green Tea</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base">
                Unoxidized and minimally processed, green tea is known for its fresh, vegetal, and grassy flavors. It's rich in antioxidants and has a bright, vibrant character. Popular varieties include Sencha, Matcha, and Dragon Well.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
                <AccordionTrigger className="font-semibold text-lg">Black Tea</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base">
                Fully oxidized, black tea offers bold, robust, and malty flavors. It's the most common type of tea in the West. Well-known examples include Assam, Darjeeling, and Earl Grey. It has a higher caffeine content than less oxidized teas.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
                <AccordionTrigger className="font-semibold text-lg">Oolong Tea</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base">
                Partially oxidized, oolong tea sits between green and black tea, offering an incredibly diverse range of flavors—from light and floral to dark and roasted. Its complexity makes it a favorite among connoisseurs.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
                <AccordionTrigger className="font-semibold text-lg">White Tea</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base">
                The least processed of all teas, white tea is made from young leaves and buds. It has a delicate, subtle, and often sweet flavor profile with floral and fruity notes. Silver Needle and White Peony are prized varieties.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
                <AccordionTrigger className="font-semibold text-lg">Puerh Tea</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base">
                A fermented tea from Yunnan, China, Puerh (or Pu-erh) is unique in that its flavor develops and improves with age, much like fine wine. It can be earthy, woody, and smooth, and is often sold in compressed cakes.
                </AccordionContent>
            </AccordionItem>
             <AccordionItem value="item-6">
                <AccordionTrigger className="font-semibold text-lg">Yellow & Dark Teas</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base">
                These are rarer categories. Yellow tea undergoes a unique, slow drying process that gives it a mellow, smooth taste, removing the grassiness of green tea. Dark tea (Hei Cha) is post-fermented (like Puerh, but from different regions) and is known for its deep, rich, and earthy tones.
                </AccordionContent>
            </AccordionItem>
            </Accordion>
        </div>

        {/* Teaware Section */}
        <div className="max-w-6xl mx-auto mb-16 lg:mb-24">
            <h2 className="font-headline text-3xl font-bold text-center mb-8">Essential & Unique Teaware</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <Card className="flex flex-col p-6 bg-card">
                    <CardHeader className="p-0 mb-4">
                        <CardTitle className="font-headline text-2xl">Gaiwan</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 flex-grow">
                        <p className="text-muted-foreground">
                        A simple and versatile lidded bowl for brewing and drinking tea. It gives the brewer precise control over infusion time and is excellent for appreciating the aroma of oolong and green teas. A lesser-known essential for serious enthusiasts.
                        </p>
                    </CardContent>
                </Card>
                 <Card className="flex flex-col p-6 bg-card">
                    <CardHeader className="p-0 mb-4">
                        <CardTitle className="font-headline text-2xl">Kyusu</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 flex-grow">
                        <p className="text-muted-foreground">
                        A traditional Japanese side-handled teapot, designed specifically for brewing green tea. Its built-in filter and shape allow leaves to expand fully, extracting maximum flavor without bitterness.
                        </p>
                    </CardContent>
                </Card>
                <Card className="flex flex-col p-6 bg-card">
                    <CardHeader className="p-0 mb-4">
                        <CardTitle className="font-headline text-2xl">Yixing Teapot</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 flex-grow">
                        <p className="text-muted-foreground">
                        Made from unglazed clay from Yixing, China, these small pots are porous and absorb the oils of the tea over time. Each pot is typically dedicated to one type of tea (e.g., oolong or puerh) to enhance its flavor.
                        </p>
                    </CardContent>
                </Card>
                 <Card className="flex flex-col p-6 bg-card">
                    <CardHeader className="p-0 mb-4">
                        <CardTitle className="font-headline text-2xl">Chawan & Chasen</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 flex-grow">
                        <p className="text-muted-foreground">
                        The essential duo for preparing Matcha. The Chawan is the tea bowl, and the Chasen is the bamboo whisk used to froth the powdered green tea into a smooth, creamy beverage.
                        </p>
                    </CardContent>
                </Card>
                <Card className="flex flex-col p-6 bg-card">
                    <CardHeader className="p-0 mb-4">
                        <CardTitle className="font-headline text-2xl">Tea Pets</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 flex-grow">
                        <p className="text-muted-foreground">
                        A whimsical but beloved piece of teaware, these small clay figurines are kept on the tea tray. Tea drinkers "nourish" them by pouring leftover tea over them, which over time changes their color and patina. A lesser-known and fun part of tea culture.
                        </p>
                    </CardContent>
                </Card>
                 <Card className="flex flex-col p-6 bg-card">
                    <CardHeader className="p-0 mb-4">
                        <CardTitle className="font-headline text-2xl">Fairness Cup (Gong Dao Bei)</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 flex-grow">
                        <p className="text-muted-foreground">
                         A small pitcher used to ensure that everyone receives tea of the same strength. The tea is first decanted from the teapot into the fairness cup, and then served to guests. It's a symbol of hospitality and equality in the tea ceremony.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>

        {/* Tastings and Classes Section */}
        <div className="max-w-4xl mx-auto">
          <h2 className="font-headline text-3xl font-bold text-center mb-8">What to Expect from Tastings & Classes</h2>
          <div className="grid gap-8 md:grid-cols-2">
            <Card className="shadow-lg p-6">
                <CardHeader className="p-0 items-center text-center">
                <div className="bg-accent/10 p-3 rounded-lg w-fit mb-4">
                    <Icons.ai className="h-10 w-10 text-accent" />
                </div>
                <CardTitle className="font-headline text-3xl">Tea Tastings</CardTitle>
                </CardHeader>
                <CardContent className="p-0 pt-4">
                <p className="text-muted-foreground text-center">
                    A tea tasting is a guided sensory experience. Expect to sample several different teas, often focusing on a specific type or region. A host will explain the tea's origin, processing, and flavor notes. You'll learn to evaluate the dry leaf, the aroma of the wet leaf, and the color and taste of the liquor. It's about appreciation, not just drinking.
                </p>
                </CardContent>
            </Card>
            <Card className="shadow-lg p-6">
                <CardHeader className="p-0 items-center text-center">
                <div className="bg-primary/10 p-3 rounded-lg w-fit mb-4">
                    <Icons.classes className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="font-headline text-3xl">Tea Classes</CardTitle>
                </CardHeader>
                <CardContent className="p-0 pt-4">
                <p className="text-muted-foreground text-center">
                    Tea classes are more educational and often hands-on. You might learn about the history of tea, different processing methods, or how to properly use specific teaware like a Gaiwan. The focus is on building knowledge and practical skills that you can take home to improve your own brewing practice.
                </p>
                </CardContent>
            </Card>
          </div>
        </div>

      </div>
    </section>
  );
}
