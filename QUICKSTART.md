# ⚡ Quick Start Guide - Library Management System

Get up and running in **5 minutes**!

## 🚀 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open in browser
# Navigate to: http://localhost:5173
```

## 📱 First Steps

### 1️⃣ Explore the Dashboard (30 seconds)
- Open the app - you'll land on the Dashboard
- See pre-loaded statistics
- Notice 5 sample books and 2 sample members already added

### 2️⃣ Add Your First Book (1 minute)
1. Click **"Books"** tab
2. Click **"Add New Book"** button (top right)
3. Fill in:
   - ISBN: `9781234567890`
   - Title: `My First Book`
   - Author: `John Smith`
   - Year: `2024`
4. Click **"Add Book"**
5. ✅ See your book in the list!

### 3️⃣ Register a Member (1 minute)
1. Click **"Members"** tab
2. Click **"Register New Member"** button
3. Fill in:
   - Member ID: `MEM003` (auto-generated)
   - Name: `Sarah Johnson`
   - Email: `sarah@email.com`
   - Phone: `555-0123`
4. Click **"Register Member"**
5. ✅ Member added!

### 4️⃣ Borrow a Book (1 minute)
1. Click **"Borrow/Return"** tab
2. Find an available book (green status)
3. Click **"Borrow"**
4. Select a member from dropdown
5. Click **"Borrow"** to confirm
6. ✅ Book is now borrowed! Due in 14 days.

### 5️⃣ Return a Book (30 seconds)
1. Stay on **"Borrow/Return"** tab
2. Find the book you just borrowed (yellow status)
3. Click **"Return"**
4. ✅ Book returned! (No fine since it's on time)

### 6️⃣ View History (30 seconds)
1. Click **"History"** tab
2. See all your transactions
3. Check borrow/return dates
4. View any fines

## 🎯 Common Tasks

### Search for a Book
```
Books tab → Type in search box → See filtered results
```

### Export Data
```
Books/Members/History tab → Click "Export CSV" → File downloads
```

### Check Overdue Books
```
Dashboard → Look at "Overdue Books" card (red badge)
```

### Delete a Book
```
Books tab → Find book → Click "Delete" → Confirm
(Only works if book is available)
```

## 🎨 Color Guide

- 🟢 **Green** = Available/Good
- 🟡 **Yellow** = Borrowed/In Progress
- 🔴 **Red** = Overdue/Error
- 🔵 **Blue** = Info

## 💡 Pro Tips

1. **Use Search**: Don't scroll - search for books/members
2. **Export Often**: Download CSV backups weekly
3. **Check Dashboard Daily**: Monitor overdue books
4. **Member IDs Auto-increment**: MEM001, MEM002, MEM003...
5. **14-Day Loan Period**: Books due 2 weeks after borrowing
6. **$0.50 Per Day**: Late fine calculation

## ⚠️ Important Rules

- ✅ Can't delete borrowed books
- ✅ Can't delete members with active loans
- ✅ Can't borrow unavailable books
- ✅ ISBN must be unique
- ✅ Member ID must be unique
- ✅ Email must be valid format

## 🔧 Troubleshooting

**Problem**: Data disappeared  
**Solution**: Browser data was cleared. Restore from CSV backup.

**Problem**: Can't delete book  
**Solution**: Book is borrowed. Return it first.

**Problem**: Can't delete member  
**Solution**: Member has active loans. Return all books first.

**Problem**: Search not working  
**Solution**: Clear search box and try again.

## 📊 Sample Workflow

**Daily Library Operations:**

```
Morning:
1. Check Dashboard for overdue books
2. Review overnight returns
3. Process new borrowing requests

Afternoon:
4. Register new members
5. Add new book arrivals
6. Handle returns

Evening:
7. Review day's statistics
8. Export transaction history
9. Plan for tomorrow
```

## 🎓 Learning Path

**Beginner (Day 1):**
- Add books
- Register members
- Borrow/return books

**Intermediate (Day 2-3):**
- Use search effectively
- Export data
- Understand statistics

**Advanced (Day 4+):**
- Manage overdue books
- Track fines
- Generate reports
- Optimize workflows

## 📞 Need Help?

Check these resources:
- 📖 **README.md** - Complete documentation
- 📚 **USER_GUIDE.md** - Detailed feature guide
- ⭐ **FEATURES.md** - All features explained

## 🎉 You're Ready!

You now know enough to run your library! Start adding your real books and members.

**Happy Managing! 📚✨**

---

## ⏱️ Quick Reference Card

| Action | Location | Button |
|--------|----------|--------|
| Add Book | Books Tab | Add New Book |
| Add Member | Members Tab | Register New Member |
| Borrow Book | Borrow/Return Tab | Borrow |
| Return Book | Borrow/Return Tab | Return |
| Search | Any Tab | Search box |
| Export | Books/Members/History | Export CSV |
| View Stats | Dashboard | Automatic |

**Loan Period**: 14 days  
**Fine Rate**: $0.50/day  
**Storage**: Browser LocalStorage  
**Backup**: Export CSV regularly  

---

**Start exploring! The interface is intuitive and self-explanatory. 🚀**
