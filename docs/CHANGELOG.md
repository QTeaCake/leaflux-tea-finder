# Changelog - LeafLux Tea Finder

## Recent Updates

### 🏗 Architecture & Infrastructure
- **BigQuery Integration**: Switched from manual document updates to event-based streaming using the "Stream Collections to BigQuery" extension.
- **Email Automation**: Added admin notifications to all form submissions (Waitlist, Contact, Suggestions) using the "Trigger Email" extension.
- **Firebase Initialization**: Resolved circular dependencies and compilation hangs by refactoring the Firebase provider logic.
- **Error Handling**: Implemented robust diagnostic overlays for Google Maps billing and API configuration errors.

### ✨ Features & UI
- **Secret Locations**: Added a new batch of authentic tea shops in the New York region (Rochester, Williamsville, White Plains, etc.).
- **Enhanced Filters**: Improved the tea type filtering logic to support pure, flavored, and herbal categories.
- **Admin Roles**: Enforced Database Access Control (DBAC) using `roles_admin` and `roles_business` collections for dashboard access.

### 🐛 Bug Fixes
- **Auth Fix**: Resolved "auth/invalid-credential" errors by removing hardcoded email fields in the login gates.
- **Map Recovery**: Fixed an issue where the map would fail to load due to missing Firebase service exports.
- **Server Stability**: Removed unauthorized `firebase-admin` usage to comply with client-side only constraints.
