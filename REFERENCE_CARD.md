# 📋 Library Management System - Quick Reference Card

## 🎯 Essential Information

### Loan Rules
| Item | Value |
|------|-------|
| Loan Period | 14 days |
| Fine Rate | $0.50 per day |
| Calculation | Automatic on return |
| Due Date | Auto-set on borrow |

### Validation Rules
| Field | Validation |
|-------|-----------|
| ISBN | Unique, required |
| Member ID | Unique, required |
| Email | Valid format (xxx@xxx.xxx) |
| Year | 1000 to current + 1 |
| Name | Required |
| Phone | Required |

### Status Colors
| Color | Meaning |
|-------|---------|
| 🟢 Green | Available / Success |
| 🟡 Yellow | Borrowed / Active |
| 🔴 Red | Overdue / Error |
| 🔵 Blue | Information |
| 🟣 Purple | Member-related |

## 📱 Tab Functions

### 📊 Dashboard
```
View:
• Library statistics (6 cards)
• Recent books (5 items)
• Recent members (5 items)

Actions:
• None (read-only view)
```

### 📚 Books
```
View:
• All books in table format
• Search results

Actions:
• Add New Book
• Delete Book (if available)
• Export CSV
• Search books
```

### 👥 Members
```
View:
• All members in table format
• Borrowed books count

Actions:
• Register New Member
• Delete Member (if no loans)
• Export CSV
```

### 🔄 Borrow/Return
```
View:
• All books with status
• Search results

Actions:
• Borrow (available books)
• Return (borrowed books)
• Search books
```

### 📜 History
```
View:
• All transactions
• Borrow/return dates
• Fines

Actions:
• Export CSV
```

## ⌨️ Keyboard Shortcuts

| Action | Key |
|--------|-----|
| Search | Click search box |
| Submit Form | Enter |
| Close Modal | Click outside / X |

## 🔍 Search Tips

```
Search works on:
✅ Book titles
✅ Author names
✅ ISBN numbers

Features:
✅ Case-insensitive
✅ Real-time results
✅ Partial matching
```

## 📥 Export Formats

### Books CSV
```
ISBN, Title, Author, Year, Status, Borrowed By, Due Date
```

### Members CSV
```
Member ID, Name, Email, Phone, Borrowed Books, Registered Date
```

### History CSV
```
ISBN, Member ID, Borrow Date, Due Date, Return Date, Fine
```

## ⚠️ Cannot Do

❌ Delete borrowed books  
❌ Delete members with loans  
❌ Borrow unavailable books  
❌ Use duplicate ISBN  
❌ Use duplicate Member ID  
❌ Submit invalid email  

## ✅ Can Always Do

✅ Search for books  
✅ View statistics  
✅ Export data  
✅ Add new books  
✅ Register members  
✅ View history  

## 🔢 Auto-Generated IDs

```
Member IDs:
MEM001, MEM002, MEM003, ...

Format:
MEM + 3-digit number

Auto-increments when registering
Can be customized before saving
```

## 💰 Fine Examples

| Days Late | Fine |
|-----------|------|
| 0 days | $0.00 |
| 1 day | $0.50 |
| 7 days | $3.50 |
| 14 days | $7.00 |
| 30 days | $15.00 |

## 📊 Statistics Explained

| Statistic | What It Shows |
|-----------|---------------|
| Total Books | All books in system |
| Available Books | Books ready to borrow |
| Borrowed Books | Currently checked out |
| Registered Members | All members |
| Overdue Books | Books past due date |
| Total Fines | Sum of all fines collected |

## 🎨 Form Fields

### Add Book Form
```
ISBN:     [Text field - unique]
Title:    [Text field - required]
Author:   [Text field - required]
Year:     [Number field - validated]
```

### Register Member Form
```
Member ID: [Text field - auto-generated]
Name:      [Text field - required]
Email:     [Email field - validated]
Phone:     [Tel field - required]
```

### Borrow Book Modal
```
Book:    [Display only]
Member:  [Dropdown - select]
```

## 🔄 Operation Flows

### Borrow Flow
```
1. Select book (must be available)
2. Click "Borrow"
3. Choose member
4. Confirm
→ Book marked borrowed
→ Due date set (+14 days)
→ Added to member's list
```

### Return Flow
```
1. Select borrowed book
2. Click "Return"
→ Fine calculated (if overdue)
→ Book marked available
→ Removed from member's list
→ Transaction updated
```

## 🚨 Common Errors

### "Book not found"
**Cause**: Invalid ISBN  
**Fix**: Check ISBN spelling

### "Member not found"
**Cause**: Invalid member ID  
**Fix**: Verify member exists

### "Book is already borrowed"
**Cause**: Book unavailable  
**Fix**: Wait for return

### "Cannot delete"
**Cause**: Active dependencies  
**Fix**: Return book / clear loans

### "Invalid email format"
**Cause**: Bad email syntax  
**Fix**: Use name@domain.com

## 💾 Data Storage

```
Storage Type: LocalStorage
Location: Browser
Capacity: ~5-10MB
Persistence: Local only
Sync: No network sync

Keys Used:
• library_books
• library_members
• library_records
```

## 🔧 Maintenance Tasks

### Daily
- [ ] Check overdue books
- [ ] Process returns
- [ ] Handle new borrows

### Weekly
- [ ] Export all data (backup)
- [ ] Review statistics
- [ ] Clean up completed records

### Monthly
- [ ] Generate reports
- [ ] Review member activity
- [ ] Update book inventory

## 📞 Quick Help

| Issue | Solution |
|-------|----------|
| Data lost | Restore from CSV backup |
| Can't delete | Check dependencies |
| Search broken | Clear search box |
| Book won't borrow | Check availability |
| Member can't be deleted | Return all books |

## 🎯 Best Practices

```
✅ Export data weekly
✅ Check dashboard daily
✅ Process returns promptly
✅ Keep contact info updated
✅ Use consistent naming
✅ Validate data entry
✅ Monitor overdue books
```

## 📈 Performance Tips

```
• Use search instead of scrolling
• Export regularly for backups
• Clear browser cache if slow
• Use modern browser
• Keep records reasonable (<10k)
```

## 🌐 Browser Support

```
✅ Chrome (recommended)
✅ Firefox
✅ Safari
✅ Edge
❌ IE11 (not supported)
```

## 📱 Device Support

```
✅ Desktop (optimal)
✅ Tablet (good)
✅ Mobile (supported)
```

## 🔐 Security Notes

```
⚠️ No encryption
⚠️ No authentication
⚠️ Local storage only
⚠️ Public access

For production:
→ Add user login
→ Use backend database
→ Implement encryption
→ Add access control
```

## 🎓 Learning Resources

```
README.md        → Overview & setup
USER_GUIDE.md    → Detailed guide
FEATURES.md      → Feature list
QUICKSTART.md    → 5-min startup
PROJECT_SUMMARY  → Complete summary
```

## ⚡ Speed Commands

| Task | Fastest Way |
|------|-------------|
| Add book | Books → Add New Book |
| Borrow | Borrow/Return → Borrow |
| Return | Borrow/Return → Return |
| Search | Type in search box |
| Stats | Dashboard tab |
| Export | Click Export CSV |
| History | History tab |

## 📋 Checklist: New Library Setup

```
Day 1:
□ Review sample data
□ Add your first book
□ Register your first member
□ Practice borrow/return

Week 1:
□ Add all books
□ Register all members
□ Export backup
□ Configure workflow

Month 1:
□ Review statistics
□ Generate reports
□ Optimize processes
□ Train additional staff
```

---

## 🎯 Remember

**Loan Period**: 14 days  
**Fine Rate**: $0.50/day  
**Export Often**: Weekly backups  
**Check Daily**: Overdue books  

---

**Keep this card handy for quick reference! 📌**
