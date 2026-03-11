# EV Charging Station Optimization Dashboard - India

## Project Overview

**Project Name**: EV India Charge Hub - Government EV Charging Station Optimization Platform

**Core Functionality**: A comprehensive dashboard for monitoring and optimizing electric vehicle charging infrastructure across all Indian states and cities, designed from a government policy and infrastructure planning perspective.

**Target Users**: Government officials, policy makers, infrastructure planners, and administrators responsible for EV ecosystem development in India.

---

## UI/UX Specification

### Color Palette (Government/Professional Theme)

- **Primary**: `#1E3A8A` (Deep Navy Blue - Trust & Authority)
- **Secondary**: `#059669` (Emerald Green - Sustainable Energy)
- **Accent**: `#F59E0B` (Amber - Energy/Power)
- **Background**: `#0F172A` (Dark Slate - Modern Dashboard)
- **Surface**: `#1E293B` (Elevated Surface)
- **Card**: `#334155` (Card Background)
- **Text Primary**: `#F8FAFC` (White)
- **Text Secondary**: `#94A3B8` (Muted)
- **Success**: `#22C55E` (Green)
- **Warning**: `#EAB308` (Yellow)
- **Error**: `#EF4444` (Red)
- **Border**: `#475569` (Subtle borders)

### Typography

- **Primary Font**: "DM Sans" (Clean, professional)
- **Monospace Font**: "JetBrains Mono" (For data/numbers)
- **Heading Sizes**: 
  - H1: 32px, Bold
  - H2: 24px, Semibold
  - H3: 18px, Medium
  - Body: 14px, Regular
  - Small: 12px, Regular

### Layout Structure

**Sidebar Navigation (Fixed Left - 280px)**
- Logo and Government Emblem area
- Navigation Menu:
  - Dashboard (Home)
  - Station Map
  - State Analytics
  - City Details
  - Reports
  - Settings
- User Profile section at bottom

**Main Content Area**
- Header with search, notifications, user menu
- Breadcrumb navigation
- Content area with responsive grid
- Footer with government disclaimer

### Responsive Breakpoints
- Mobile: < 768px (Sidebar collapses to hamburger)
- Tablet: 768px - 1024px
- Desktop: > 1024px

### Visual Effects
- Card hover: Subtle lift with shadow
- Button hover: Scale 1.02 with color shift
- Page transitions: Fade in with slight slide
- Data loading: Skeleton placeholders
- Charts: Animated on load

---

## Components Specification

### 1. Login Page
- Government branding with official logo
- Email/Password form
- "Official Government ID" label
- Remember me checkbox
- Forgot password link
- Background: Subtle Indian map pattern

### 2. Dashboard (Home)
- **Stats Cards Row**:
  - Total Charging Stations (India-wide)
  - Total EVs Registered
  - Stations Under Construction
  - Revenue Generated (₹)
- **India Map Visualization**: Interactive map showing station density
- **Recent Activity Feed**: Latest station additions, updates
- **Quick Stats by Top 5 States**: Bar chart

### 3. Station Map Page
- **Interactive India Map**: SVG-based map with state highlighting
- **City Markers**: Pulsing dots for charging stations
- **Filter Panel**:
  - State selector (dropdown)
  - City selector (dependent on state)
  - Station type (Fast/Slow)
  - Availability (Available/Busy/Offline)
- **Station List**: Scrollable list with station cards
- **Station Details Modal**: Full station information

### 4. State Analytics Page
- **State Selector**: Dropdown with all 28 states + 8 UTs
- **Metrics Display**:
  - Total stations per state
  - Coverage percentage
  - Station growth rate
  - EV adoption rate
- **Charts**:
  - Station distribution pie chart
  - Monthly installation trend line
  - City comparison bar chart

### 5. City Details Page
- **City Overview Card**:
  - City name and state
  - Population (for context)
  - EV penetration percentage
- **Station Grid**: All stations in the city
- **Performance Metrics**:
  - Average charging time
  - Peak hours analysis
  - Revenue per station

### 6. Reports Page
- Downloadable reports (mock)
- Monthly/Quarterly/Annual views
- Export options (PDF/Excel mock)

### 7. Settings Page
- Profile settings
- Notification preferences
- Theme toggle (Light/Dark)

---

## Functionality Specification

### Authentication System (Mock)
- Login with email/password
- Session stored in localStorage
- Protected routes
- Logout functionality
- Demo credentials: `admin@gov.in` / `govt123`

### Data Structure

**Indian States Data** (36 entities):
All 28 states + 8 Union Territories:
- Andaman & Nicobar, Andhra Pradesh, Arunachal Pradesh, Assam, Bihar
- Chandigarh, Chhattisgarh, Dadra & Nagar Haveli, Delhi, Goa
- Gujarat, Haryana, Himachal Pradesh, Jammu & Kashmir, Jharkhand
- Karnataka, Kerala, Ladakh, Lakshadweep, Madhya Pradesh
- Maharashtra, Manipur, Meghalaya, Mizoram, Nagaland
- Odisha, Puducherry, Punjab, Rajasthan, Sikkim
- Tamil Nadu, Telangana, Tripura, Uttar Pradesh, Uttarakhand, West Bengal

**Charging Station Data** (Mock - 50+ stations):
- Station ID
- Name
- Address
- State
- City
- Type (Fast/Slow)
- Ports (Type 1, Type 2, CCS2, CHAdeMO)
- Status (Active/Under Maintenance/Planned)
- Coordinates (lat/lng)
- Daily usage count
- Revenue

### Map Interactions
- Click state → Filter to that state
- Hover station → Show tooltip
- Click marker → Open details modal
- Zoom in/out controls

### Search Functionality
- Global search for stations
- Search by city, state, station name

---

## Page Flow

```
Login Page
    ↓ (on success)
Dashboard (default view)
    ├── Station Map (interactive map)
    ├── State Analytics (detailed state data)
    ├── City Details (city-specific)
    ├── Reports (download center)
    └── Settings (preferences)

Every page accessible via sidebar
Logout returns to Login
```

---

## Acceptance Criteria

1. ✅ Login page displays with government branding
2. ✅ Valid credentials redirect to dashboard
3. ✅ Dashboard shows all 4 stat cards with data
4. ✅ India map displays with state boundaries
5. ✅ Station map shows markers across multiple cities
6. ✅ State filter works correctly
7. ✅ City selector updates based on selected state
8. ✅ Station details modal opens on marker click
9. ✅ All 36 Indian states/UTs available in selectors
10. ✅ Logout clears session and returns to login
11. ✅ Responsive on mobile/tablet/desktop
12. ✅ No console errors on page load
13. ✅ All animations smooth and performant

---

## Running the Project

### In Youware Platform
1. Click "Run" or use the preview URL
2. Login with: admin@gov.in / govt123

### In VS Code (Local)
```bash
cd <project-folder>
npm install
npm run dev
```

### In Google Colab
This is a React web app - for Colab integration:
1. Deploy to Vercel/Netlify
2. Use the deployed URL in Colab iframe
3. Or use ngrok to expose local server

---

## Mock Data Notes

- Station data is generated programmatically
- Coordinates are approximate for demonstration
- Real implementation would connect to government APIs (e.g., DHI, NITI Aayog)
 Revenue figures are simulated
-