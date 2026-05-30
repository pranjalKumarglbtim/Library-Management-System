# 📖 Library Management System - User Guide

Welcome to the Library Management System! This guide will walk you through all the features and how to use them effectively.

## 🚀 Getting Started

When you first open the application, you'll see the **Dashboard** with sample data already loaded. The system comes pre-populated with 5 books and 2 members to help you get started quickly.

## 📑 Navigation

The application has **5 main tabs** at the top:

1. **📊 Dashboard** - Overview and statistics
2. **📚 Books** - Manage book inventory
3. **👥 Members** - Manage library members
4. **🔄 Borrow/Return** - Handle book transactions
5. **📜 History** - View all transaction records

---

## 📊 Dashboard Tab

The Dashboard provides a complete overview of your library:

### Statistics Cards
- **Total Books**: All books in your library
- **Available Books**: Books ready to be borrowed
- **Borrowed Books**: Currently checked out books
- **Registered Members**: Total library members
- **Overdue Books**: Books past their due date (highlighted in red)
- **Total Fines**: Sum of all overdue fines collected

### Quick Views
- **Recent Books**: Shows the 5 most recently added books
- **Recent Members**: Shows the 5 most recently registered members

---

## 📚 Books Tab

Manage your entire book collection here.

### Adding a New Book

1. Click the **"Add New Book"** button (top right)
2. Fill in the form:
   - **ISBN**: Unique identifier (e.g., 9780134685991)
     - Must be unique - system will validate
   - **Title**: Book title
   - **Author**: Author name
   - **Year**: Publication year (validated range)
3. Click **"Add Book"** to save
4. Click **"Cancel"** to discard

**Validation Rules:**
- All fields are required
- ISBN must be unique in the system
- Year must be between 1000 and current year + 1

### Searching Books

Use the search box at the top of the book list to search by:
- Book title
- Author name
- ISBN number

The search is **case-insensitive** and updates in real-time as you type.

### Viewing Book Status

Books are color-coded for quick identification:
- 🟢 **Green "Available"**: Book can be borrowed
- 🟡 **Yellow "Borrowed"**: Book is checked out
- 🔴 **Red "Overdue"**: Book is past its due date

For borrowed books, you'll see:
- Member ID who borrowed it
- Due date

### Deleting a Book

1. Locate the book in the list
2. Click the **"Delete"** button
3. Confirm the deletion

**Note**: You can only delete books that are currently available (not borrowed).

### Exporting Book Data

Click the **"Export CSV"** button to download a CSV file containing:
- ISBN
- Title
- Author
- Year
- Status
- Borrowed By (if applicable)
- Due Date (if applicable)

File format: `library-books-YYYY-MM-DD.csv`

---

## 👥 Members Tab

Manage library members and their information.

### Registering a New Member

1. Click **"Register New Member"** button
2. Fill in the form:
   - **Member ID**: Auto-generated (MEM001, MEM002, etc.)
     - You can customize this if needed
   - **Full Name**: Member's complete name
   - **Email**: Valid email address (validated)
   - **Phone**: Contact phone number
3. Click **"Register Member"** to save
4. Click **"Cancel"** to discard

**Validation Rules:**
- All fields are required
- Member ID must be unique
- Email must be in valid format (name@domain.com)

### Viewing Member Information

The member list shows:
- Member ID
- Name
- Email address
- Phone number
- **Number of borrowed books** (displayed as a badge)
- Registration date

### Deleting a Member

1. Find the member in the list
2. Click the **"Delete"** button
3. Confirm the deletion

**Important**: You can only delete members who have **no active book loans**. Members with borrowed books will show "Has active loans" instead of a delete button.

### Exporting Member Data

Click the **"Export CSV"** button to download member information:
- Member ID
- Name
- Email
- Phone
- Number of borrowed books
- Registration date

File format: `library-members-YYYY-MM-DD.csv`

---

## 🔄 Borrow/Return Tab

Handle all book borrowing and returning operations.

### Borrowing a Book

1. Use the search box to find the book you want to borrow
2. Find an **available** book (green status)
3. Click the **"Borrow"** button next to the book
4. A modal will appear - select a member from the dropdown
5. Click **"Borrow"** to confirm

**What happens:**
- Book status changes to "Borrowed"
- Due date is automatically set to **14 days** from today
- Book is added to the member's borrowed books list
- A transaction record is created

**Validation:**
- Book must be available
- A member must be selected

### Returning a Book

1. Find the **borrowed** book in the list
2. Click the **"Return"** button
3. The system will automatically:
   - Calculate if the book is overdue
   - Calculate fine if applicable (**$0.50 per day**)
   - Mark the book as available
   - Remove from member's borrowed list
   - Update the transaction record

**Fine Calculation:**
- On-time returns: $0.00
- Overdue returns: $0.50 per day late

A notification will show the return status and any fines owed.

---

## 📜 History Tab

View complete transaction history of all library operations.

### Transaction Records

Each record shows:
- **ISBN**: Book identifier
- **Member ID**: Who borrowed the book
- **Borrow Date**: When the book was checked out
- **Due Date**: When the book should be returned
- **Return Date**: When it was actually returned (or "-" if still out)
- **Fine**: Any late fees charged
- **Status**: Current transaction status

### Status Indicators

- 🟢 **Green "Returned"**: Book has been returned
- 🟡 **Yellow "Active"**: Book is still checked out, not yet due
- 🔴 **Red "Overdue"**: Book is checked out and past due date

### Sorting

Transactions are automatically sorted by **borrow date** (newest first).

### Exporting Transaction History

Click **"Export CSV"** to download complete transaction history:
- All borrowing and return records
- Fine information
- Dates in readable format

File format: `library-records-YYYY-MM-DD.csv`

---

## 🔔 Notifications

The system provides real-time feedback through notifications:

### Success Notifications (Green)
- Book added successfully
- Member registered successfully
- Book borrowed successfully (with due date)
- Book returned successfully (with fine if applicable)
- Item deleted successfully

### Error Notifications (Red)
- Cannot delete a borrowed book
- Book not found
- Member not found
- Validation errors
- Other error conditions

Notifications automatically disappear after **5 seconds**.

---

## 💡 Tips & Best Practices

### Book Management
- ✅ Use standardized ISBN format for consistency
- ✅ Keep author names consistent (e.g., always "First Last")
- ✅ Regularly review and remove books that are no longer in inventory
- ✅ Use the search function to check if a book already exists before adding

### Member Management
- ✅ Verify email addresses during registration
- ✅ Keep member information up to date
- ✅ Use consistent naming conventions
- ✅ Don't delete members - they can always borrow again later

### Borrowing & Returning
- ✅ Always verify the member ID before borrowing
- ✅ Remind members of the 14-day loan period
- ✅ Check for overdue books regularly in the Dashboard
- ✅ Process returns promptly to collect fines

### Data Management
- ✅ Export data regularly as backup
- ✅ Review transaction history monthly
- ✅ Monitor overdue statistics
- ✅ Use the Dashboard for quick daily overview

---

## 🔍 Common Tasks

### Daily Operations

**Morning Check:**
1. Go to Dashboard
2. Check "Overdue Books" count
3. Review recent transactions in History tab

**Processing Returns:**
1. Go to Borrow/Return tab
2. Click "Return" for each book being returned
3. Note any fines in the notification
4. Record payment (manual process)

**Adding New Books:**
1. Go to Books tab
2. Click "Add New Book"
3. Enter all details carefully
4. Verify ISBN is correct

### Weekly Tasks

**Inventory Review:**
1. Go to Books tab
2. Review all books
3. Check for any issues
4. Export data for backup

**Member Review:**
1. Go to Members tab
2. Check for inactive members
3. Update contact information if needed
4. Export data for backup

### Monthly Reports

**Statistics Report:**
1. Go to Dashboard
2. Screenshot statistics
3. Note trends (more/fewer borrowings, etc.)

**Transaction Report:**
1. Go to History tab
2. Export CSV
3. Review in Excel/Google Sheets
4. Calculate monthly totals

**Financial Report:**
1. Review fines collected
2. Calculate from History export
3. Document for accounting

---

## 📱 Responsive Design

The system works on all devices:
- **Desktop**: Full table views with all features
- **Tablet**: Optimized layout with horizontal scrolling
- **Mobile**: Compact view with touch-friendly buttons

---

## 💾 Data Storage

All data is stored in your browser's **LocalStorage**:

**Advantages:**
- ✅ No server required
- ✅ Instant performance
- ✅ Works offline
- ✅ Free to use

**Important Notes:**
- ⚠️ Data is stored locally in your browser
- ⚠️ Clearing browser data will delete all library records
- ⚠️ Regular CSV exports are recommended for backup
- ⚠️ Data is not synced between devices

**Backup Strategy:**
1. Export all data weekly
2. Save CSV files to cloud storage (Google Drive, Dropbox)
3. Keep multiple backups

---

## ❓ Troubleshooting

### Book won't delete
- **Cause**: Book is currently borrowed
- **Solution**: Return the book first, then delete

### Member won't delete
- **Cause**: Member has active book loans
- **Solution**: Return all books first, then delete

### Can't borrow a book
- **Check**: Is the book available?
- **Check**: Is a member selected?
- **Check**: Does the member ID exist?

### Data disappeared
- **Cause**: Browser data was cleared
- **Solution**: Restore from CSV backup (manual re-entry)
- **Prevention**: Export data regularly

### Search not working
- **Solution**: Clear the search box and try again
- **Note**: Search is case-insensitive

---

## 🎓 Training New Staff

### Quick Start (15 minutes)
1. Show Dashboard - explain each statistic
2. Demonstrate adding a book
3. Show borrowing process
4. Demonstrate return with fine calculation

### Full Training (1 hour)
1. Overview of all tabs
2. Add multiple books
3. Register members
4. Practice borrow/return cycles
5. Export all data types
6. Review transaction history
7. Practice error scenarios

---

## 📞 Support

This is a self-contained application. For technical issues:
- Check this user guide
- Review the README.md file
- Check browser console for errors
- Ensure JavaScript is enabled

---

## 🔐 Security Notes

- No password protection (add if needed for production)
- All data visible to anyone with browser access
- Consider adding authentication for multi-user environments
- LocalStorage is not encrypted

---

**Remember**: Regular backups are essential! Export your data frequently to prevent data loss.

**Happy Library Managing! 📚✨**
