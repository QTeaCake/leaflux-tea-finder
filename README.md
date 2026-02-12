# LeafLux's Tea Finder

This is a Next.js application built with Firebase Studio that helps users discover authentic tea shops.

## Features

- **Nearby Tea Shop Discovery**: Find tea shops based on your location.
- **Advanced Filtering**: Filter shops by offerings like loose leaf tea, teaware, tea classes, and ethical sourcing practices.
- **Interactive Map**: Visualize shop locations on a map.
- **Personalized Recommendations**: Get AI-powered tea recommendations based on your preferences.
- **Waitlist & Contact**: Sign up for updates and send feedback.

## Getting Started

First, install the dependencies:
```bash
npm install
```

Then, run the development server:
```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

### Google Maps API Key

This project uses the Google Maps API to display shop locations. To enable the map feature, you need to provide a Google Maps API key.

1.  Create a `.env.local` file in the root of the project.
2.  Add your API key to the file:

    ```
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSyC6r59ETVjJAnpYzBC5KdOHF6ZpFeQ-Qco
    ```

You can get an API key from the [Google Cloud Console](https://console.cloud.google.com/google/maps-apis/overview). You will need to enable the "Maps JavaScript API", "Places API", and "Geocoding API".
