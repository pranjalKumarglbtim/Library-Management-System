export interface Book {
  isbn: string;
  title: string;
  author: string;
  year: number;
  available: boolean;
  borrowedBy: string | null;
  dueDate: string | null;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  borrowedBooks: string[]; // Array of ISBNs
  registeredDate: string;
}

export interface BorrowRecord {
  isbn: string;
  memberId: string;
  borrowDate: string;
  dueDate: string;
  returnDate: string | null;
  fine: number;
}

export interface LibraryStats {
  totalBooks: number;
  availableBooks: number;
  borrowedBooks: number;
  totalMembers: number;
  overdueBooks: number;
  totalFines: number;
}
