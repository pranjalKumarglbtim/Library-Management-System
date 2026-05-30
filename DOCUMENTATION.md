# Library Management System - Documentation

## Overview

![Library Logo](https://img.shields.io/badge/📚-Library%20System-blueviolet?style=for-the-badge)

This is a modern web-based library management system built with React, TypeScript, and Tailwind CSS. It provides complete functionality for managing books, members, and borrowing transactions.

## Live Demo

**URL**: https://pranjalKumarglbtim.github.io/Library-Management-System/

![Live Demo Badge](https://img.shields.io/badge/Live-Demo-green?style=for-the-badge&logo=github-pages)

## Features

### User Authentication
- Firebase-based email/password authentication
- Sign up and sign in functionality
- Secure session management

### Book Management
- Add new books with ISBN, title, author, and year
- Edit existing book details
- Delete books (only if not borrowed)
- Search books by title, author, or ISBN
- Grid and table view modes

### Member Management
- Register new students/members
- View all registered members
- Track borrowed books per member
- Delete members (only if they have no borrowed books)

### Borrowing System
- Borrow books with 14-day loan period
- Automatic due date calculation
- Return books and clear borrowing status
- Overdue book detection and tracking
- Fine calculation for overdue books

### Dashboard & Analytics
- Real-time statistics display
- Total books, available/borrowed counts
- Total members count
- Overdue books tracking
- Total fines collected
- Animated counters for visual appeal

### Transaction History
- Complete borrow/return history
- Export transaction records to CSV

## Project Structure

```
src/
├── components/     # Reusable React components
├── context/        # React context (AuthContext)
├── utils/          # Utility functions (storage, library, export)
├── config/         # Firebase configuration
├── types/          # TypeScript interfaces
├── App.tsx         # Main application component
└── main.tsx        # Application entry point
```

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation
```bash
npm install
```

### Firebase Configuration
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Email/Password authentication
4. Update `src/config/firebase.ts` with your config
5. Restart the development server

### Running the Application
```bash
npm run dev
```

### Building for Production
```bash
npm run build
```

## Screenshots

### Dashboard
![Dashboard](https://raw.githubusercontent.com/pranjalKumarglbtim/Library-Management-System/main/src/assets/screenshot1.png)

### Book Management
![Books](https://raw.githubusercontent.com/pranjalKumarglbtim/Library-Management-System/main/src/assets/screenshot1.png)

### Student Portal
![Student Portal](https://raw.githubusercontent.com/pranjalKumarglbtim/Library-Management-System/main/src/assets/screenshot1.png)

### Authentication
![Login](https://raw.githubusercontent.com/pranjalKumarglbtim/Library-Management-System/main/src/assets/screenshot1.png)

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.2.6 | UI Library |
| TypeScript | 5.9.3 | Type Safety |
| Vite | 7.3.2 | Build Tool |
| Tailwind CSS | 4.1.17 | Styling |
| Firebase | 12.13.0 | Authentication |

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run check-firebase` - Verify Firebase config

## Pages

### 1. Dashboard
Real-time analytics and quick overview of library statistics.

### 2. Books
Manage all books with search, filter, and sort capabilities.

### 3. Student Registration
Register and manage student members.

### 4. Borrow Books
Students can select their ID and borrow/return books.

### 5. History
View all borrowing transactions with export option.

## Default Credentials

The application comes with sample data:
- **Books**: 5 sample books preloaded
- **Members**: 2 sample members (MEM001, MEM002)

## License

MIT License