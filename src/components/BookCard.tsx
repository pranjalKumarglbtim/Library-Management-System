import React from 'react';
import { Book } from '../types';
import { isBookOverdue } from '../utils/library';

interface BookCardProps {
  book: Book;
  onBorrow?: (isbn: string) => void;
  onReturn?: (isbn: string) => void;
  onDelete?: (isbn: string) => void;
  index: number;
}

export const BookCard: React.FC<BookCardProps> = ({
  book,
  onBorrow,
  onReturn,
  onDelete,
  index,
}) => {
  const overdue = isBookOverdue(book);

  return (
    <div
      className="relative group animate-scale-in card-hover"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
        overdue
          ? 'bg-gradient-to-r from-red-400 to-pink-600 opacity-75'
          : book.available
          ? 'bg-gradient-to-r from-green-400 to-cyan-600 opacity-0 group-hover:opacity-75'
          : 'bg-gradient-to-r from-yellow-400 to-orange-600 opacity-75'
      }`}></div>
      
      <div className="relative bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-700/50">
        {/* Book Spine Design */}
        <div className={`h-2 ${
          overdue
            ? 'bg-gradient-to-r from-red-500 to-pink-600'
            : book.available
            ? 'bg-gradient-to-r from-emerald-500 to-cyan-600'
            : 'bg-gradient-to-r from-yellow-500 to-orange-600'
        }`}></div>
        
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-100 mb-2 group-hover:text-indigo-400 transition-colors">
                {book.title}
              </h3>
              <p className="text-gray-300 text-sm mb-1">
                <span className="font-semibold">Author:</span> {book.author}
              </p>
              <p className="text-gray-400 text-xs">
                <span className="font-semibold">ISBN:</span> {book.isbn}
              </p>
            </div>
            
            <div className="ml-4">
              <span className="inline-block px-3 py-1 text-xs font-bold rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg">
                {book.year}
              </span>
            </div>
          </div>

          {/* Status Badge */}
          <div className="mb-4">
            {book.available ? (
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-green-400 to-cyan-600 text-white shadow-lg animate-pulse-glow">
                <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
                Available
              </span>
            ) : (
              <div className="space-y-2">
                <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold shadow-lg ${
                  overdue
                    ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white animate-pulse'
                    : 'bg-gradient-to-r from-yellow-400 to-orange-600 text-white'
                }`}>
                  <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
                  {overdue ? 'Overdue' : 'Borrowed'}
                </span>
                <div className="text-xs text-gray-300 ml-1">
                  <p><span className="font-semibold">By:</span> {book.borrowedBy}</p>
                  {book.dueDate && (
                    <p><span className="font-semibold">Due:</span> {new Date(book.dueDate).toLocaleDateString()}</p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 mt-4">
            {book.available ? (
              <>
                {onBorrow && (
                  <button
                    onClick={() => onBorrow(book.isbn)}
                    className="flex-1 btn-ripple bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-indigo-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
                  >
                    📖 Borrow
                  </button>
                )}
                {onDelete && (
                  <button
                    onClick={() => onDelete(book.isbn)}
                    className="btn-ripple bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-red-600 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
                  >
                    🗑️
                  </button>
                )}
              </>
            ) : (
              onReturn && (
                <button
                  onClick={() => onReturn(book.isbn)}
                  className="flex-1 btn-ripple bg-gradient-to-r from-green-500 to-cyan-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-green-600 hover:to-cyan-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  ✓ Return
                </button>
              )
            )}
          </div>
        </div>

        {/* Decorative Corner */}
        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-indigo-500/10 to-purple-600/10 rounded-bl-full"></div>
      </div>
    </div>
  );
};
