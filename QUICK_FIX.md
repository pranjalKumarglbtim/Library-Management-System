# 🔧 QUICK FIX: Firebase API Key Error

## ⚠️ Error You're Seeing

```
Firebase: Error (auth/api-key-not-valid.-please-pass-a-valid-api-key.)
```

## ✅ SOLUTION (5 Minutes)

### 🚀 Fast Track

**1. Open Firebase Console**
```
https://console.firebase.google.com/
```

**2. Create Project**
- Click "Add project"
- Name: `my-library-app`
- Disable Google Analytics
- Create!

**3. Enable Authentication**
- Click "Authentication" in sidebar
- Click "Get started"
- Enable "Email/Password"
- Save

**4. Get Your Config**
- Click ⚙️ (gear icon) → Project settings
- Scroll to "Your apps"
- Click `</>` (Web platform)
- Register app: `library-web`
- **COPY THE CONFIG** (see example below)

**5. Update Your Code**
- Open: `src/config/firebase.ts`
- Replace with YOUR config:

```typescript
const firebaseConfig = {
  apiKey: "AIzaSyAbc123...",              // ← Your actual key
  authDomain: "my-library-app.firebaseapp.com",
  projectId: "my-library-app",
  storageBucket: "my-library-app.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

**6. Restart App**
```bash
# Stop server (Ctrl+C)
npm run dev
```

**7. Test**
- Go to http://localhost:5173
- Click "Sign Up"
- Create account
- ✅ Should work now!

---

## 🔍 Check Your Config

Run this to verify:
```bash
npm run check-firebase
```

---

## 📖 Need Detailed Help?

See `FIREBASE_SETUP_GUIDE.md` for:
- Screenshots
- Troubleshooting
- Security rules
- Production setup

---

## 💡 Quick Checklist

- [ ] Created Firebase project
- [ ] Enabled Email/Password auth
- [ ] Copied config to firebase.ts
- [ ] Replaced ALL demo values
- [ ] Restarted dev server
- [ ] Tested sign up

---

## 🎯 Common Mistakes

❌ **Only copied part of config**
✅ Copy ALL fields (apiKey, authDomain, etc.)

❌ **Forgot to enable Email/Password**
✅ Must enable in Authentication → Sign-in method

❌ **Didn't restart server**
✅ Stop (Ctrl+C) and run `npm run dev` again

❌ **Typo in config**
✅ Copy-paste exactly, don't type manually

---

## 🆘 Still Not Working?

### Check These:

1. **Firebase Console → Authentication**
   - Is Email/Password enabled?
   - See green checkmark?

2. **Your firebase.ts file**
   - Does it have YOUR apiKey?
   - Not starting with "AIzaSyDemo_"?

3. **Browser Console (F12)**
   - Any other errors?
   - Network tab shows requests?

4. **Internet Connection**
   - Firebase needs internet
   - Try different network?

---

## 🎉 After It Works

Once you can sign up:

1. ✅ Login with your account
2. ✅ Add some books
3. ✅ Register members
4. ✅ Test borrowing
5. 🎊 Enjoy your app!

---

## 📞 Resources

- [Firebase Console](https://console.firebase.google.com/)
- [Firebase Docs](https://firebase.google.com/docs/auth)
- [Detailed Setup Guide](./FIREBASE_SETUP_GUIDE.md)

---

**You got this! 🚀**

*Time needed: 5-10 minutes*  
*Difficulty: Easy*  
*Cost: FREE*
