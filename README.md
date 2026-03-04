# LeafLux's Tea Finder

LeafLux is a high-end discovery platform for authentic tea shops, built with Next.js and Firebase. It helps users bridge the gap between "tea deserts" and thriving tea oases through intelligent mapping and AI-powered recommendations.

## 🚀 Features

- **Nearby Discovery**: Find tea shops within a custom radius based on your geolocation.
- **Advanced Filtering**: Filter by specific tea types (Oolong, Matcha, Pu-erh, etc.) and offerings (Loose leaf, teaware, classes).
- **AI Tea Sommelier**: Get personalized brewing and shop recommendations powered by Genkit and Gemini 2.5 Flash.
- **Automated Communication**: Integrated "Trigger Email" extension for instant waitlist and contact form confirmations.
- **Enterprise Analytics**: Real-time event streaming to Google BigQuery for deep market analysis.
- **Business Dashboard**: Historical analytics visualization for shop clicks, website traffic, and regional demand.
- **Community Driven**: Users can suggest new shops and "praise" their favorites.

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS + Shadcn/UI
- **Database/Auth**: Firebase Firestore & Firebase Auth
- **AI**: Genkit 1.x with Gemini 2.5 Flash
- **Maps**: Google Maps Platform (JavaScript API & Geocoding)
- **Backend Automation**: Firebase Extensions (Trigger Email, Stream to BigQuery)
- **Deployment**: Firebase App Hosting

## 📁 Project Structure

- `src/app/`: Application routes and page layouts.
- `src/components/`: Reusable UI components and feature-specific logic.
- `src/lib/`: Data definitions (`tea-shops.ts`) and utility functions.
- `src/ai/`: Genkit flows and AI prompt definitions.
- `src/firebase/`: Client-side Firebase SDK initialization and hooks.
- `docs/`: Backend schemas and architectural documentation.

## 🚦 Getting Started

1.  **Install dependencies**:
    ```bash
    npm install
    ```
2.  **Environment Setup**: Create a `.env.local` and add:
    ```
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key_here
    NEXT_PUBLIC_ADMIN_EMAIL=your_email_here
    ```
3.  **Run development server**:
    ```bash
    npm run dev
    ```

Open [http://localhost:9002](http://localhost:9002) to view the app.
