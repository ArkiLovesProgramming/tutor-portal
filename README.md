# Champ Code Academy - Tutor Portal

A modern tutor portal frontend for Champ Code Academy, built with React, TypeScript, and Tailwind CSS.

## Features

- **Login System** - Simulated authentication with email/password
- **Dashboard** - Overview of teaching schedule with multiple views
- **Today's Lessons** - Quick view of today's scheduled classes
- **Lesson Management** - Browse Historic, Upcoming, and Available lessons
- **Take Class** - Optimistic UI for claiming available classes
- **Filtering** - Filter by month or custom date range
- **Empty States** - Elegant empty state handling for all lesson types
- **Dark Mode** - Toggle between light and dark themes
- **Responsive Design** - Mobile-friendly with Sheet/Drawer navigation

## Tech Stack

- React 18 + TypeScript
- Vite 5 (Build Tool)
- Tailwind CSS v4 (Styling)
- Zustand (State Management)
- React Router v6 (Routing)
- date-fns (Date Utilities)
- Lucide React (Icons)

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Environment Variables

Create a `.env` file if needed:

```env
VITE_API_URL=http://localhost:3000/api
```

## Project Structure

```
src/
├── components/
│   ├── ui/              # Reusable UI components
│   ├── layouts/         # Layout components (LoginLayout, DashboardLayout)
│   ├── dashboard/       # Dashboard-specific components
│   └── login/           # Login form component
├── pages/               # Page components
├── services/            # API services and mock data
├── store/               # Zustand state management
├── types/               # TypeScript type definitions
├── lib/                 # Utility functions
└── App.tsx              # Main app with routing
```

## Key Implementation Details

### Optimistic UI Updates

When a tutor clicks "Take Class", the UI updates immediately while the API call happens in the background. If the API fails, the changes are rolled back.

### Responsive Sidebar

- **Desktop**: Fixed sidebar on the left
- **Mobile**: Hamburger menu triggers a Sheet/Drawer from the left

### Filter Logic

- Date Range has priority over Month Filter
- Selecting a date range automatically clears the month selection
- Selecting a month automatically clears the date range

## Demo

Use any email address to log in (demo mode - no real authentication).

## License

MIT
