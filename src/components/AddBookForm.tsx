import React, { useState } from 'react';
import { Book } from '../types';
import { isIsbnUnique } from '../utils/library';

interface AddBookFormProps {
  onAdd: (book: Book) => void;
  onCancel: () => void;
}

export const AddBookForm: React.FC<AddBookFormProps> = ({ onAdd, onCancel }) => {
  const [formData, setFormData] = useState({
    isbn: '',
    title: '',
    author: '',
    year: new Date().getFullYear(),
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.isbn.trim()) {
      newErrors.isbn = 'ISBN is required';
    } else if (!isIsbnUnique(formData.isbn)) {
      newErrors.isbn = 'ISBN already exists';
    }

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.author.trim()) {
      newErrors.author = 'Author is required';
    }

    if (formData.year < 1000 || formData.year > new Date().getFullYear() + 1) {
      newErrors.year = 'Invalid year';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const newBook: Book = {
      ...formData,
      available: true,
      borrowedBy: null,
      dueDate: null,
    };

    onAdd(newBook);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="animate-fade-in-up">
        <label htmlFor="isbn" className="block text-sm font-bold text-gray-700 mb-2">
          📖 ISBN
        </label>
        <input
          type="text"
          id="isbn"
          value={formData.isbn}
          onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
          className={`block w-full px-4 py-3 rounded-xl shadow-lg text-base transition-all duration-200 ${
            errors.isbn
              ? 'border-2 border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-200'
              : 'border-2 border-indigo-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-200'
          }`}
          placeholder="9780134685991"
        />
        {errors.isbn && (
          <p className="mt-2 text-sm text-red-600 font-semibold animate-shake">⚠️ {errors.isbn}</p>
        )}
      </div>

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
            errors.title
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
          }`}
          placeholder="Effective Java"
        />
        {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
      </div>

      <div>
        <label htmlFor="author" className="block text-sm font-medium text-gray-700">
          Author
        </label>
        <input
          type="text"
          id="author"
          value={formData.author}
          onChange={(e) => setFormData({ ...formData, author: e.target.value })}
          className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
            errors.author
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
          }`}
          placeholder="Joshua Bloch"
        />
        {errors.author && <p className="mt-1 text-sm text-red-600">{errors.author}</p>}
      </div>

      <div>
        <label htmlFor="year" className="block text-sm font-medium text-gray-700">
          Year
        </label>
        <input
          type="number"
          id="year"
          value={formData.year}
          onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
          className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
            errors.year
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
          }`}
        />
        {errors.year && <p className="mt-1 text-sm text-red-600">{errors.year}</p>}
      </div>

      <div className="flex justify-end space-x-4 pt-6">
        <button
          type="button"
          onClick={onCancel}
          className="btn-ripple px-6 py-3 border-2 border-gray-300 rounded-xl shadow-lg text-sm font-bold text-gray-700 bg-white hover:bg-gray-50 transform hover:scale-105 transition-all duration-200"
        >
          ✕ Cancel
        </button>
        <button
          type="submit"
          className="btn-ripple px-6 py-3 border border-transparent rounded-xl shadow-xl text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 animate-pulse-glow"
        >
          ✓ Add Book
        </button>
      </div>
    </form>
  );
};
