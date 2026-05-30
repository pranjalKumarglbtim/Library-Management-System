# 🔥 Firebase Setup Guide - Step by Step

## ⚠️ Fixing "api-key-not-valid" Error

This error happens because the app is configured with demo Firebase credentials. You need to create your own Firebase project!

---

## 🚀 Complete Setup (5-10 Minutes)

### Step 1: Create Firebase Account

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Go to console" (top right)
3. Sign in with your Google account
4. If you don't have one, create a Google account first

---

### Step 2: Create New Project

1. Click **"Add project"** or **"Create a project"**
2. Enter project name: `library-management` (or anything you like)
3. Click **Continue**
4. **Google Analytics**: Toggle OFF (not needed for now)
5. Click **Create project**
6. Wait 30-60 seconds for creation
7. Click **Continue** when ready

---

### Step 3: Enable Email/Password Authentication

1. In the left sidebar, click **🔐 Authentication**
2. Click **Get started** button
3. Click on **Email/Password** in the Sign-in method tab
4. Toggle **Enable** to ON (blue)
5. Click **Save**

✅ Authentication is now enabled!

---

### Step 4: Create Web App

1. In project overview (home), find "Get started by adding Firebase to your app"
2. Click the **</>** (Web) icon
3. App nickname: `library-web` (or anything)
4. **Firebase Hosting**: Leave unchecked for now
5. Click **Register app**
6. You'll see a code snippet - **DON'T CLOSE THIS YET!**

---

### Step 5: Copy Your Configuration

You'll see something like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyAbc123...",
  authDomain: "library-management-abc.firebaseapp.com",
  projectId: "library-management-abc",
  storageBucket: "library-management-abc.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123def456"
};
```

**COPY ALL OF THIS!** ✂️

---

### Step 6: Update Your App

1. Open your project in code editor
2. Go to `src/config/firebase.ts`
3. **REPLACE** the demo config with your real config:

```typescript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// 🔥 YOUR REAL FIREBASE CONFIG - Replace this!
const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",              // ← Paste your apiKey
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
```

4. **Save the file** 💾

---

### Step 7: Enable Firestore Database (Optional but Recommended)

1. In Firebase Console, click **🗄️ Firestore Database** in left sidebar
2. Click **Create database**
3. **Start mode**: Select **Test mode** (for development)
4. Click **Next**
5. **Location**: Choose closest to you (or leave default)
6. Click **Enable**
7. Wait 1-2 minutes

✅ Database is ready!

---

### Step 8: Test Your App

1. Stop your dev server (Ctrl+C)
2. Start it again:
   ```bash
   npm run dev
   ```
3. Open http://localhost:5173
4. Try to **Sign Up** with:
   - Name: Test User
   - Email: test@example.com
   - Password: test123

**If successful**: You'll see the main dashboard! 🎉

---

## ✅ Success Checklist

- [x] Firebase project created
- [x] Authentication enabled (Email/Password)
- [x] Web app registered
- [x] Config copied to firebase.ts
- [x] Firestore database enabled (optional)
- [x] App restarted
- [x] Sign up tested

---

## 🎯 Common Issues & Solutions

### Issue: "Firebase: Error (auth/api-key-not-valid)"
**Solution**: You didn't update the config in `firebase.ts`. Replace ALL values with your real config.

### Issue: "Firebase: Error (auth/operation-not-allowed)"
**Solution**: Enable Email/Password authentication in Firebase Console (Step 3)

### Issue: Can't find firebase.ts file
**Location**: `src/config/firebase.ts`

### Issue: Changes not working
**Solution**: 
1. Stop dev server (Ctrl+C)
2. Clear browser cache
3. Start server again: `npm run dev`

### Issue: "Auth domain not authorized"
**Solution**: In Firebase Console → Authentication → Settings → Authorized domains → Add your domain

---

## 📸 Visual Guide

### Where to find things in Firebase Console:

```
Firebase Console Layout:
├── 🏠 Project Overview (Home)
├── 🔐 Authentication
│   └── Sign-in method tab
│       └── Email/Password (Enable this!)
├── 🗄️ Firestore Database
│   └── Create database
├── ⚙️ Project Settings (gear icon)
│   └── General tab
│       └── Your apps section
│           └── SDK setup and configuration
```

---

## 🔐 Security Rules (For Production)

After testing, update Firestore rules in Firebase Console:

1. Go to **Firestore Database**
2. Click **Rules** tab
3. Replace with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Authenticated users can read all books
    match /books/{bookId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
    
    // Authenticated users can read all members
    match /members/{memberId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
    
    // Authenticated users can manage transactions
    match /transactions/{transactionId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
  }
}
```

4. Click **Publish**

---

## 💡 Pro Tips

1. **Keep your API key safe**: Don't share it publicly (though it's OK in a frontend app)
2. **Use environment variables** for production: `.env` file
3. **Enable Google Analytics** later for insights
4. **Set up Firebase Hosting** for easy deployment
5. **Backup regularly**: Export Firestore data

---

## 🚀 Next Steps After Setup

Once authentication works:

1. ✅ Test sign up
2. ✅ Test login
3. ✅ Test logout
4. ✅ Add some books
5. ✅ Register members
6. ✅ Test borrowing
7. 🎉 Enjoy your app!

---

## 📞 Need More Help?

### Resources:
- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Console](https://console.firebase.google.com/)
- [Firebase Support](https://firebase.google.com/support)

### Check if Firebase is working:
```javascript
// In browser console (F12)
firebase.apps.length > 0  // Should be true
```

---

## 🎉 You're Almost There!

Just follow the steps above, and your authentication will work perfectly!

**Time needed**: 5-10 minutes  
**Difficulty**: Easy  
**Cost**: FREE (Firebase free tier is generous!)

---

**Happy coding! 🔥✨**
