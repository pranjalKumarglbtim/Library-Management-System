╔═══════════════════════════════════════════════════════════════════╗
║                                                                   ║
║     🔥 FIREBASE AUTHENTICATION ERROR - HOW TO FIX 🔥              ║
║                                                                   ║
╚═══════════════════════════════════════════════════════════════════╝

┌───────────────────────────────────────────────────────────────────┐
│ ⚠️  THE ERROR YOU'RE SEEING                                       │
└───────────────────────────────────────────────────────────────────┘

    Firebase: Error (auth/api-key-not-valid.-please-pass-a-valid-api-key.)


┌───────────────────────────────────────────────────────────────────┐
│ 💡 WHY IT HAPPENS                                                 │
└───────────────────────────────────────────────────────────────────┘

    The app uses DEMO Firebase credentials (they're fake!)
    You need to create YOUR OWN (free) Firebase project


┌───────────────────────────────────────────────────────────────────┐
│ ✅ THE FIX (5 MINUTES)                                            │
└───────────────────────────────────────────────────────────────────┘

    1️⃣  Go to: https://console.firebase.google.com/

    2️⃣  Create new project
        → Click "Add project"
        → Name it anything
        → Disable Google Analytics
        → Create!

    3️⃣  Enable Email/Password authentication
        → Click "Authentication"
        → Click "Get started"
        → Enable "Email/Password"
        → Save

    4️⃣  Get your config
        → Settings ⚙️  → Project settings
        → Scroll to "Your apps"
        → Click </> (Web)
        → Register app
        → COPY the config shown

    5️⃣  Update your code
        → Open: src/config/firebase.ts
        → REPLACE firebaseConfig with YOUR values
        → Save file

    6️⃣  Restart
        → Stop server (Ctrl+C)
        → npm run dev
        → Try signup again
        → ✅ Should work!


┌───────────────────────────────────────────────────────────────────┐
│ 🛠️  VERIFY YOUR CONFIG                                            │
└───────────────────────────────────────────────────────────────────┘

    Run this command:

        npm run check-firebase

    It will tell you if your config is correct!


┌───────────────────────────────────────────────────────────────────┐
│ 📖 DETAILED HELP                                                  │
└───────────────────────────────────────────────────────────────────┘

    File to read             What it contains
    ─────────────────────────────────────────────────────────────
    QUICK_FIX.md             Fast 5-minute solution
    FIREBASE_SETUP_GUIDE.md  Step-by-step with screenshots
    SOLUTION.md              Complete troubleshooting guide


┌───────────────────────────────────────────────────────────────────┐
│ 📝 EXAMPLE CONFIG                                                 │
└───────────────────────────────────────────────────────────────────┘

    BEFORE (Demo - won't work):
    ─────────────────────────────────────────────────────────────
    const firebaseConfig = {
      apiKey: "AIzaSyDemo_ReplaceWithYourOwnKey",  ❌ FAKE
      authDomain: "library-demo.firebaseapp.com",
      projectId: "library-demo",
      ...
    };

    AFTER (Your real config - will work!):
    ─────────────────────────────────────────────────────────────
    const firebaseConfig = {
      apiKey: "AIzaSyB3kL9pQm4nX2oP7qR8s...",      ✅ REAL
      authDomain: "my-project.firebaseapp.com",
      projectId: "my-project-123",
      ...
    };


┌───────────────────────────────────────────────────────────────────┐
│ ✓ CHECKLIST                                                       │
└───────────────────────────────────────────────────────────────────┘

    □  Created Firebase project
    □  Enabled Email/Password auth
    □  Copied config from Firebase Console
    □  Pasted into src/config/firebase.ts
    □  Replaced ALL values (not just apiKey!)
    □  Saved the file
    □  Restarted dev server
    □  Tested signup


┌───────────────────────────────────────────────────────────────────┐
│ 🆘 STILL NOT WORKING?                                             │
└───────────────────────────────────────────────────────────────────┘

    1. Run: npm run check-firebase
    2. Check Firebase Console → Authentication → Email/Password enabled?
    3. Clear browser cache
    4. Restart server
    5. Check browser console (F12) for errors
    6. Read SOLUTION.md for troubleshooting


┌───────────────────────────────────────────────────────────────────┐
│ 💰 COST                                                           │
└───────────────────────────────────────────────────────────────────┘

    100% FREE! ✨

    Firebase free tier includes:
    • Authentication: Unlimited users
    • Firestore: 1GB storage
    • Hosting: 10GB/month

    Perfect for development and small apps!


┌───────────────────────────────────────────────────────────────────┐
│ 🎯 WHAT HAPPENS AFTER                                             │
└───────────────────────────────────────────────────────────────────┘

    Once configured:
    ✅ Sign up works
    ✅ Login works
    ✅ User profile shows
    ✅ Logout works
    ✅ All features accessible
    ✅ Data can be saved to cloud (with Firestore)


┌───────────────────────────────────────────────────────────────────┐
│ 📞 RESOURCES                                                      │
└───────────────────────────────────────────────────────────────────┘

    Firebase Console:  https://console.firebase.google.com/
    Firebase Docs:     https://firebase.google.com/docs/auth
    Setup Guide:       See FIREBASE_SETUP_GUIDE.md
    Quick Fix:         See QUICK_FIX.md
    Troubleshooting:   See SOLUTION.md


╔═══════════════════════════════════════════════════════════════════╗
║                                                                   ║
║                    YOU'VE GOT THIS! 🚀                            ║
║                                                                   ║
║   Time: 5-10 minutes  │  Difficulty: Easy  │  Cost: FREE         ║
║                                                                   ║
╚═══════════════════════════════════════════════════════════════════╝
