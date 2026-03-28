# LeafLux's Tea Finder

LeafLux is a high-end discovery platform for authentic tea shops, built with Next.js and Firebase. It helps users bridge the gap between "tea deserts" and thriving tea oases through intelligent mapping and AI-powered recommendations.

## 🚀 Features

- **Nearby Discovery**: Find tea shops within a custom radius based on your geolocation.
- **Advanced Filtering**: Filter by specific tea types (Oolong, Matcha, Pu-erh, etc.) and offerings (Loose leaf, teaware, classes).
- **AI Tea Sommelier**: Get personalized brewing and shop recommendations powered by Genkit and Gemini 2.5 Flash.
- **Automated Communication**: Integrated "Trigger Email" extension for instant waitlist and contact form confirmations, including admin notifications.
- **Enterprise Analytics**: Real-time event streaming to Google BigQuery via the "Stream Collections to BigQuery" extension for deep market analysis.
- **Business Dashboard**: Historical analytics visualization for shop clicks, website traffic, and regional demand.
- **Community Driven**: Users can suggest new shops, add custom tags, and "praise" their favorites.

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS + Shadcn/UI
- **Database/Auth**: Firebase Firestore & Firebase Auth
- **AI**: Genkit 1.x with Gemini 2.5 Flash
- **Maps**: Google Maps Platform (JavaScript API & Geocoding)
- **Backend Automation**: Firebase Extensions (Trigger Email, Stream Collections to BigQuery)
- **Deployment**: Firebase App Hosting

## 📁 Project Structure

- `src/app/`: Application routes and page layouts.
- `src/components/`: Reusable UI components and feature-specific logic.
- `src/lib/`: Data definitions (`tea-shops.ts`) and utility functions.
- `src/ai/`: Genkit flows and AI prompt definitions.
- `src/firebase/`: Client-side Firebase SDK initialization, hooks, and error handling.
- `docs/`: Backend schemas, architectural documentation, and sync guides.

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

## 🔄 Syncing with GitHub

This project is linked to: [https://github.com/QTeaCake/leaflux-tea-finder.git](https://github.com/QTeaCake/leaflux-tea-finder.git)

To sync changes made in Firebase Studio back to your GitHub repository:
1.  Open the **Source Control** tab in the sidebar.
2.  Stage your changes (click the `+` icon next to "Changes").
3.  Write a descriptive commit message (e.g., "Add New York tea shops and BigQuery streaming").
4.  Click the **Commit** button, then click the **...** (three dots) and select **Push** to send changes to GitHub.
