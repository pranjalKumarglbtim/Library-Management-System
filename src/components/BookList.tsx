import React from 'react';
import { Book } from '../types';
import { isBookOverdue } from '../utils/library';

interface BookListProps {
  books: Book[];
  onBorrow?: (isbn: string) => void;
  onReturn?: (isbn: string) => void;
  onDelete?: (isbn: string) => void;
  showActions?: boolean;
}

export const BookList: React.FC<BookListProps> = ({
  books,
  onBorrow,
  onReturn,
  onDelete,
  showActions = true,
}) => {
  if (books.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">No books found</h3>
        <p className="mt-1 text-sm text-gray-500">Get started by adding a new book.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ISBN
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Author
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Year
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            {showActions && (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {books.map((book) => {
            const overdue = isBookOverdue(book);
            return (
              <tr key={book.isbn} className={overdue ? 'bg-red-50' : ''}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {book.isbn}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {book.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {book.author}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {book.year}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {book.available ? (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Available
                    </span>
                  ) : (
                    <div className="space-y-1">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          overdue
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {overdue ? 'Overdue' : 'Borrowed'}
                      </span>
                      <p className="text-xs text-gray-500">
                        By: {book.borrowedBy}
                      </p>
                      {book.dueDate && (
                        <p className="text-xs text-gray-500">
                          Due: {new Date(book.dueDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  )}
                </td>
                {showActions && (
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    {book.available ? (
                      <>
                        {onBorrow && (
                          <button
                            onClick={() => onBorrow(book.isbn)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Borrow
                          </button>
                        )}
                        {onDelete && (
                          <button
                            onClick={() => onDelete(book.isbn)}
                            className="text-red-600 hover:text-red-900 ml-3"
                          >
                            Delete
                          </button>
                        )}
                      </>
                    ) : (
                      onReturn && (
                        <button
                          onClick={() => onReturn(book.isbn)}
                          className="text-green-600 hover:text-green-900"
                        >
                          Return
                        </button>
                      )
                    )}
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
