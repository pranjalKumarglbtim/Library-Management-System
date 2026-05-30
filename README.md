# Library Management System

A modern web-based library management system built with React, TypeScript, and Tailwind CSS.

## Features

- **User Authentication** - Firebase-based sign up and sign in
- **Book Management** - Add, edit, delete, and search books
- **Member Management** - Student registration and management
- **Borrow/Return Books** - Track book loans with due dates
- **Real-time Analytics** - Live statistics dashboard
- **Transaction History** - Track all borrowing activities
- **Export Data** - Export books, members, and records to CSV

## Tech Stack

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Authentication**: Firebase Authentication
- **State Management**: React Hooks + localStorage

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

The application will run at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Email/Password authentication in Authentication section
4. Update `src/config/firebase.ts` with your Firebase config
5. Restart the application

## Project Structure

```
src/
├── components/     # React components
├── context/        # React context providers
├── utils/          # Utility functions
├── config/         # Configuration files
├── types/          # TypeScript type definitions
├── App.tsx         # Main application
└── main.tsx        # Entry point
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run check-firebase` - Check Firebase configuration

## License

MIT