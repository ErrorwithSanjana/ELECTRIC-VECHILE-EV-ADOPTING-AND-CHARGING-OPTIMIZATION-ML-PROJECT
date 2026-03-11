# EV India Charge Hub - Project Documentation

## Project Overview

**Project Name**: EV India Charge Hub (Electric Vehicle Charging Station Optimization Dashboard)

**Project Type**: React + TypeScript + Vite + Tailwind CSS Web Application

**Description**: A comprehensive government-focused dashboard for monitoring and optimizing electric vehicle charging infrastructure across all Indian states and cities. Built from a Government of India perspective with official branding.

## Features Implemented

### 1. Authentication System
- Login page with Government of India branding
- Mock authentication (demo credentials: admin@gov.in / govt123)
- Session persistence using localStorage
- Protected routes

### 2. Dashboard
- Real-time stats cards showing:
  - Total Charging Stations (India-wide)
  - Electric Vehicles Registered
  - Stations Under Construction
  - Total Revenue
- Interactive India map visualization
- Top states by station count
- Recently added stations list

### 3. Station Map
- Interactive SVG-based India map
- Station markers with status indicators
- Advanced filtering by:
  - State
  - City
  - Station Type (Fast/Slow)
  - Availability (Active/Maintenance/Planned)
- Search functionality
- Station details modal

### 4. State Analytics
- Select any of 36 Indian States/UTs
- Detailed metrics per state:
  - Total stations
  - Coverage percentage
  - EV adoption rate
  - Station distribution (Fast vs Slow)
  - Top cities
  - Performance metrics

### 5. City Details
- View charging stations by city
- Filter by state
- Search cities
- City-wise statistics

### 6. Reports Center
- Multiple report types (Monthly, Quarterly, Annual, etc.)
- Customizable date selection
- Report preview with key metrics

### 7. Settings
- Profile management
- Notification preferences
- Dark/Light mode toggle
- Security settings

## Technology Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 3.4
- **State Management**: Zustand
- **Routing**: React Router DOM
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Data Coverage

### Indian States & Union Territories (36)
All 28 states + 8 UTs included:
- Andaman & Nicobar, Andhra Pradesh, Arunachal Pradesh, Assam, Bihar
- Chandigarh, Chhattisgarh, Dadra & Nagar Haveli, Delhi, Goa
- Gujarat, Haryana, Himachal Pradesh, Jammu & Kashmir, Jharkhand
- Karnataka, Kerala, Ladakh, Lakshadweep, Madhya Pradesh
- Maharashtra, Manipur, Meghalaya, Mizoram, Nagaland
- Odisha, Puducherry, Punjab, Rajasthan, Sikkim
- Tamil Nadu, Telangana, Tripura, Uttar Pradesh, Uttarakhand, West Bengal

### Charging Stations
- 100+ mock charging stations across major Indian cities
- Realistic data including:
  - Station names and addresses
  - GPS coordinates
  - Charging types (Fast/Slow)
  - Port types (Type 1, Type 2, CCS2, CHAdeMO)
  - Status (Active, Under Maintenance, Planned)
  - Revenue and usage data

## Running the Project

### In Youware Platform
Click "Run" to start the application

### In VS Code (Local)
```bash
cd <project-folder>
npm install
npm run dev
```

### In Google Colab
This is a React web app. To use with Colab:
1. Deploy to Vercel/Netlify: `npm run build` then deploy the `dist` folder
2. Use the deployed URL in Colab iframe
3. Or use ngrok to expose local server

## Demo Credentials

- **Email**: admin@gov.in
- **Password**: govt123

## Project Structure

```
src/
├── App.tsx              # Main app with routing
├── main.tsx             # Entry point
├── index.css            # Global styles
├── types/
│   └── index.ts         # TypeScript interfaces
├── store/
│   └── useAppStore.ts   # Zustand state management
├── data/
│   └── mockData.ts      # Mock data for India
├── components/
│   └── Sidebar.tsx      # Navigation sidebar
└── pages/
    ├── LoginPage.tsx    # Login screen
    ├── DashboardPage.tsx # Main dashboard
    ├── StationMapPage.tsx # Interactive map
    ├── AnalyticsPage.tsx # State analytics
    ├── CitiesPage.tsx   # City details
    ├── ReportsPage.tsx # Reports center
    └── SettingsPage.tsx # Settings
```

## Future Enhancements

To make this production-ready:
1. Enable Youbase backend for real authentication
2. Connect to government APIs (DHI, NITI Aayog)
3. Add real-time data updates
4. Implement PDF report generation
5. Add user role management
6. Integrate with actual mapping services (Google Maps, Mapbox)

---

**Built for Government of India - Ministry of Power**
