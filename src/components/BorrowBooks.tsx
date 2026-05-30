import React, { useState } from 'react';
import { Book, Member } from '../types';
import { isBookOverdue } from '../utils/library';

interface BorrowBooksProps {
  books: Book[];
  members: Member[];
  onBorrow: (isbn: string, memberId: string) => void;
  onReturn: (isbn: string) => void;
}

export const BorrowBooks: React.FC<BorrowBooksProps> = ({
  books,
  members,
  onBorrow,
  onReturn,
}) => {
  const [selectedMemberId, setSelectedMemberId] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBooks = searchQuery.trim() === '' 
    ? books 
    : books.filter(
        (book) =>
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.isbn.includes(searchQuery)
      );

  const selectedMember = members.find((m) => m.id === selectedMemberId);
  const borrowedBookIsbns = selectedMember?.borrowedBooks || [];

  return (
    <div className="space-y-6 animate-fade-in-up">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
        Student Portal
      </h2>

      <div className="glass-morphism shadow-2xl rounded-2xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Select Your Student ID</h3>
        <select
          value={selectedMemberId}
          onChange={(e) => setSelectedMemberId(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        >
          <option value="">-- Select your Student ID --</option>
          {members.map((member) => (
            <option key={member.id} value={member.id}>
              {member.id} - {member.name}
            </option>
          ))}
        </select>
      </div>

      {selectedMember && (
        <div className="glass-morphism shadow-2xl rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">
              Welcome, {selectedMember.name}
            </h3>
            <span className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full font-bold">
              {borrowedBookIsbns.length} Books Borrowed
            </span>
          </div>

          {borrowedBookIsbns.length > 0 && (
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-700 mb-3">Your Borrowed Books:</h4>
              <div className="space-y-2">
                {books
                  .filter((book) => borrowedBookIsbns.includes(book.isbn))
                  .map((book) => (
                    <div
                      key={book.isbn}
                      className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg"
                    >
                      <div>
                        <p className="font-semibold text-gray-900">{book.title}</p>
                        <p className="text-sm text-gray-600">
                          Due: {book.dueDate ? new Date(book.dueDate).toLocaleDateString() : 'N/A'}
                        </p>
                      </div>
                      <button
                        onClick={() => onReturn(book.isbn)}
                        className="px-4 py-2 bg-gradient-to-r from-green-500 to-cyan-600 text-white rounded-lg font-semibold hover:from-green-600 hover:to-cyan-700"
                      >
                        Return Book
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="glass-morphism shadow-2xl rounded-2xl p-6">
        <div className="mb-6">
          <input
            type="text"
            placeholder="🔍 Search books by title, author, or ISBN..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBooks.map((book) => {
            const overdue = isBookOverdue(book);
            const isBorrowed = !book.available;
            const canBorrow = selectedMember && book.available;

            return (
              <div
                key={book.isbn}
                className={`border rounded-lg p-4 transition-all duration-300 ${
                  overdue
                    ? 'border-red-200 bg-red-50'
                    : isBorrowed
                    ? 'border-yellow-200 bg-yellow-50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <h4 className="font-bold text-gray-900 mb-1">{book.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{book.author}</p>
                <p className="text-xs text-gray-500 mb-3">{book.isbn}</p>
                
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                    book.available
                      ? 'bg-green-100 text-green-800'
                      : overdue
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {book.available ? 'Available' : overdue ? 'Overdue' : 'Borrowed'}
                  </span>
                  
                  {canBorrow && (
                    <button
                      onClick={() => onBorrow(book.isbn, selectedMemberId)}
                      className="px-3 py-1 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700"
                    >
                      Borrow
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {filteredBooks.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No books found. Try adjusting your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};