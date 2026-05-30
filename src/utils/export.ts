import { Book, Member, BorrowRecord } from '../types';

export const exportToCSV = (data: any[], filename: string) => {
  if (data.length === 0) {
    alert('No data to export');
    return;
  }

  // Get headers from first object
  const headers = Object.keys(data[0]);
  
  // Create CSV content
  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        const value = row[header];
        // Handle arrays and objects
        if (Array.isArray(value)) {
          return `"${value.join('; ')}"`;
        }
        if (typeof value === 'string' && value.includes(',')) {
          return `"${value}"`;
        }
        return value ?? '';
      }).join(',')
    )
  ].join('\n');

  // Create download link
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportBooks = (books: Book[]) => {
  const exportData = books.map(book => ({
    ISBN: book.isbn,
    Title: book.title,
    Author: book.author,
    Year: book.year,
    Status: book.available ? 'Available' : 'Borrowed',
    'Borrowed By': book.borrowedBy || 'N/A',
    'Due Date': book.dueDate ? new Date(book.dueDate).toLocaleDateString() : 'N/A',
  }));

  exportToCSV(exportData, `library-books-${new Date().toISOString().split('T')[0]}.csv`);
};

export const exportMembers = (members: Member[]) => {
  const exportData = members.map(member => ({
    'Member ID': member.id,
    Name: member.name,
    Email: member.email,
    Phone: member.phone,
    'Borrowed Books': member.borrowedBooks.length,
    'Registered Date': new Date(member.registeredDate).toLocaleDateString(),
  }));

  exportToCSV(exportData, `library-members-${new Date().toISOString().split('T')[0]}.csv`);
};

export const exportRecords = (records: BorrowRecord[]) => {
  const exportData = records.map(record => ({
    ISBN: record.isbn,
    'Member ID': record.memberId,
    'Borrow Date': new Date(record.borrowDate).toLocaleDateString(),
    'Due Date': new Date(record.dueDate).toLocaleDateString(),
    'Return Date': record.returnDate ? new Date(record.returnDate).toLocaleDateString() : 'Not Returned',
    Fine: record.fine > 0 ? `$${record.fine.toFixed(2)}` : '$0.00',
  }));

  exportToCSV(exportData, `library-records-${new Date().toISOString().split('T')[0]}.csv`);
};
