import { Book, Member, BorrowRecord, LibraryStats } from '../types';
import {
  getBooks,
  getMembers,
  getRecords,
  findBookByIsbn,
  findMemberById,
  updateBook,
  updateMember,
  addRecord,
} from './storage';

const LOAN_PERIOD_DAYS = 14;
const FINE_PER_DAY = 0.50; // $0.50 per day

export const borrowBook = (isbn: string, memberId: string): { success: boolean; message: string } => {
  const book = findBookByIsbn(isbn);
  const member = findMemberById(memberId);

  if (!book) {
    return { success: false, message: 'Book not found!' };
  }

  if (!member) {
    return { success: false, message: 'Member not found!' };
  }

  if (!book.available) {
    return { success: false, message: 'Book is already borrowed!' };
  }

  // Calculate due date (2 weeks from now)
  const borrowDate = new Date();
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + LOAN_PERIOD_DAYS);

  // Update book
  book.available = false;
  book.borrowedBy = memberId;
  book.dueDate = dueDate.toISOString();
  updateBook(isbn, book);

  // Update member
  member.borrowedBooks.push(isbn);
  updateMember(memberId, member);

  // Add borrow record
  const record: BorrowRecord = {
    isbn,
    memberId,
    borrowDate: borrowDate.toISOString(),
    dueDate: dueDate.toISOString(),
    returnDate: null,
    fine: 0,
  };
  addRecord(record);

  return {
    success: true,
    message: `Book borrowed successfully! Due date: ${dueDate.toLocaleDateString()}`,
  };
};

export const returnBook = (isbn: string): { success: boolean; message: string; fine: number } => {
  const book = findBookByIsbn(isbn);

  if (!book) {
    return { success: false, message: 'Book not found!', fine: 0 };
  }

  if (book.available) {
    return { success: false, message: 'Book is not currently borrowed!', fine: 0 };
  }

  const memberId = book.borrowedBy!;
  const member = findMemberById(memberId);

  if (!member) {
    return { success: false, message: 'Member not found!', fine: 0 };
  }

  // Calculate fine if overdue
  let fine = 0;
  const returnDate = new Date();
  const dueDate = new Date(book.dueDate!);

  if (returnDate > dueDate) {
    const daysOverdue = Math.ceil((returnDate.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24));
    fine = daysOverdue * FINE_PER_DAY;
  }

  // Update book
  book.available = true;
  book.borrowedBy = null;
  book.dueDate = null;
  updateBook(isbn, book);

  // Update member
  member.borrowedBooks = member.borrowedBooks.filter(b => b !== isbn);
  updateMember(memberId, member);

  // Update record
  const records = getRecords();
  const recordIndex = records.findIndex(
    r => r.isbn === isbn && r.memberId === memberId && !r.returnDate
  );
  if (recordIndex !== -1) {
    records[recordIndex].returnDate = returnDate.toISOString();
    records[recordIndex].fine = fine;
    localStorage.setItem('library_records', JSON.stringify(records));
  }

  const message = fine > 0
    ? `Book returned successfully! Overdue fine: $${fine.toFixed(2)}`
    : 'Book returned successfully!';

  return { success: true, message, fine };
};

export const searchBooks = (keyword: string): Book[] => {
  const books = getBooks();
  const lowerKeyword = keyword.toLowerCase();

  return books.filter(
    book =>
      book.title.toLowerCase().includes(lowerKeyword) ||
      book.author.toLowerCase().includes(lowerKeyword) ||
      book.isbn.includes(lowerKeyword)
  );
};

export const isBookOverdue = (book: Book): boolean => {
  if (!book.dueDate) return false;
  return new Date() > new Date(book.dueDate);
};

export const calculateStatistics = (books?: Book[], members?: Member[]): LibraryStats => {
  const allBooks = books || getBooks();
  const allMembers = members || getMembers();
  const records = getRecords();

  const availableBooks = allBooks.filter(b => b.available).length;
  const borrowedBooks = allBooks.length - availableBooks;
  const overdueBooks = allBooks.filter(b => !b.available && isBookOverdue(b)).length;
  const totalFines = records.reduce((sum, r) => sum + r.fine, 0);

  return {
    totalBooks: allBooks.length,
    availableBooks,
    borrowedBooks,
    totalMembers: allMembers.length,
    overdueBooks,
    totalFines,
  };
};

export const generateMemberId = (): string => {
  const members = getMembers();
  const maxId = members.reduce((max, member) => {
    const num = parseInt(member.id.replace('MEM', ''));
    return num > max ? num : max;
  }, 0);

  return `MEM${String(maxId + 1).padStart(3, '0')}`;
};

export const isIsbnUnique = (isbn: string): boolean => {
  return !findBookByIsbn(isbn);
};

export const isMemberIdUnique = (id: string): boolean => {
  return !findMemberById(id);
};
