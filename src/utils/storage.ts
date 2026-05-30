import { Book, Member, BorrowRecord } from '../types';

const BOOKS_KEY = 'library_books';
const MEMBERS_KEY = 'library_members';
const RECORDS_KEY = 'library_records';

// Initialize with sample data if empty
const initializeSampleData = () => {
  const books = getBooks();
  const members = getMembers();
  
  if (books.length === 0) {
    const sampleBooks: Book[] = [
      {
        isbn: '9780134685991',
        title: 'Effective Java',
        author: 'Joshua Bloch',
        year: 2018,
        available: true,
        borrowedBy: null,
        dueDate: null,
      },
      {
        isbn: '9781617294945',
        title: 'Spring in Action',
        author: 'Craig Walls',
        year: 2020,
        available: true,
        borrowedBy: null,
        dueDate: null,
      },
      {
        isbn: '9781492052205',
        title: 'Fluent Python',
        author: 'Luciano Ramalho',
        year: 2021,
        available: true,
        borrowedBy: null,
        dueDate: null,
      },
      {
        isbn: '9780596007126',
        title: 'Head First Design Patterns',
        author: 'Eric Freeman',
        year: 2004,
        available: true,
        borrowedBy: null,
        dueDate: null,
      },
      {
        isbn: '9780132350884',
        title: 'Clean Code',
        author: 'Robert C. Martin',
        year: 2008,
        available: true,
        borrowedBy: null,
        dueDate: null,
      },
    ];
    saveBooks(sampleBooks);
  }
  
  if (members.length === 0) {
    const sampleMembers: Member[] = [
      {
        id: 'MEM001',
        name: 'John Doe',
        email: 'john.doe@email.com',
        phone: '555-0101',
        borrowedBooks: [],
        registeredDate: new Date().toISOString(),
      },
      {
        id: 'MEM002',
        name: 'Jane Smith',
        email: 'jane.smith@email.com',
        phone: '555-0102',
        borrowedBooks: [],
        registeredDate: new Date().toISOString(),
      },
    ];
    saveMembers(sampleMembers);
  }
};

// Books
export const getBooks = (): Book[] => {
  const data = localStorage.getItem(BOOKS_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveBooks = (books: Book[]): void => {
  localStorage.setItem(BOOKS_KEY, JSON.stringify(books));
};

export const addBook = (book: Book): void => {
  const books = getBooks();
  books.push(book);
  saveBooks(books);
};

export const updateBook = (isbn: string, updatedBook: Book): void => {
  const books = getBooks();
  const index = books.findIndex(b => b.isbn === isbn);
  if (index !== -1) {
    books[index] = updatedBook;
    saveBooks(books);
  }
};

export const deleteBook = (isbn: string): void => {
  const books = getBooks();
  const filtered = books.filter(b => b.isbn !== isbn);
  saveBooks(filtered);
};

export const findBookByIsbn = (isbn: string): Book | null => {
  const books = getBooks();
  return books.find(b => b.isbn === isbn) || null;
};

// Members
export const getMembers = (): Member[] => {
  const data = localStorage.getItem(MEMBERS_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveMembers = (members: Member[]): void => {
  localStorage.setItem(MEMBERS_KEY, JSON.stringify(members));
};

export const addMember = (member: Member): void => {
  const members = getMembers();
  members.push(member);
  saveMembers(members);
};

export const updateMember = (id: string, updatedMember: Member): void => {
  const members = getMembers();
  const index = members.findIndex(m => m.id === id);
  if (index !== -1) {
    members[index] = updatedMember;
    saveMembers(members);
  }
};

export const deleteMember = (id: string): void => {
  const members = getMembers();
  const filtered = members.filter(m => m.id !== id);
  saveMembers(filtered);
};

export const findMemberById = (id: string): Member | null => {
  const members = getMembers();
  return members.find(m => m.id === id) || null;
};

// Borrow Records
export const getRecords = (): BorrowRecord[] => {
  const data = localStorage.getItem(RECORDS_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveRecords = (records: BorrowRecord[]): void => {
  localStorage.setItem(RECORDS_KEY, JSON.stringify(records));
};

export const addRecord = (record: BorrowRecord): void => {
  const records = getRecords();
  records.push(record);
  saveRecords(records);
};

// Initialize data on module load
initializeSampleData();
