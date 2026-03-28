# QTeaCake's Tea Finder

QTeaCake is a high-end discovery platform for authentic tea shops, built with Next.js and Firebase. It helps users bridge the gap between "tea deserts" and thriving tea oases through intelligent mapping and AI-powered recommendations.

## 🚀 Features

- **Nearby Discovery**: Find tea shops within a custom radius based on your geolocation.
- **Advanced Filtering**: Filter by specific tea types (Oolong, Matcha, Pu-erh, etc.) and offerings (Loose leaf, teaware, classes).
- **AI Tea Sommelier**: Get personalized brewing and shop recommendations powered by Genkit and Gemini 2.5 Flash.
- **Automated Communication**: Integrated "Trigger Email" extension for instant waitlist and contact form confirmations.
- **Enterprise Analytics**: Real-time event streaming to Google BigQuery via the "Stream Collections to BigQuery" extension.

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS + Shadcn/UI
- **Database/Auth**: Firebase Firestore & Firebase Auth
- **AI**: Genkit 1.x with Gemini 2.5 Flash
- **Maps**: Google Maps Platform (JavaScript API & Geocoding)

## ⚙️ Environment Variables & API Setup

For security, `.env` files are not synced to GitHub. When deploying to **Vercel** or **Firebase App Hosting**, you must manually add these variables in their respective dashboards:

| Variable | Description |
| :--- | :--- |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Your Google Maps Platform API Key |
| `NEXT_PUBLIC_ADMIN_EMAIL` | The email address that will receive notifications |

### How to get your Google Maps API Key:
1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Select your project: **studio-8763188321-d5a29**.
3. Go to **APIs & Services** > **Credentials**.
4. Copy your key from the **API Keys** section.

## 🚦 Getting Started

1.  **Install dependencies**:
    ```bash
    npm install
    ```
2.  **Run development server**:
    ```bash
    npm run dev
    ```

## 🔄 Syncing with GitHub

To sync changes back to GitHub:
1.  Open the **Source Control** tab in the sidebar.
2.  Stage your changes.
3.  Commit and Push.
