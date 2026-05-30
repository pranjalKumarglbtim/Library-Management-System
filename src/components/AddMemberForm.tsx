import React, { useState } from 'react';
import { Member } from '../types';
import { generateMemberId, isMemberIdUnique } from '../utils/library';

interface AddMemberFormProps {
  onAdd: (member: Member) => void;
  onCancel: () => void;
}

export const AddMemberForm: React.FC<AddMemberFormProps> = ({ onAdd, onCancel }) => {
  const [formData, setFormData] = useState({
    id: generateMemberId(),
    name: '',
    email: '',
    phone: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.id.trim()) {
      newErrors.id = 'Member ID is required';
    } else if (!isMemberIdUnique(formData.id)) {
      newErrors.id = 'Member ID already exists';
    }

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const newMember: Member = {
      ...formData,
      borrowedBooks: [],
      registeredDate: new Date().toISOString(),
    };

    onAdd(newMember);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="id" className="block text-sm font-medium text-gray-700">
          Member ID
        </label>
        <input
          type="text"
          id="id"
          value={formData.id}
          onChange={(e) => setFormData({ ...formData, id: e.target.value })}
          className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
            errors.id
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
          }`}
          placeholder="MEM001"
        />
        {errors.id && <p className="mt-1 text-sm text-red-600">{errors.id}</p>}
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
            errors.name
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
          }`}
          placeholder="John Doe"
        />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
            errors.email
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
          }`}
          placeholder="john.doe@email.com"
        />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Phone
        </label>
        <input
          type="tel"
          id="phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
            errors.phone
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
          }`}
          placeholder="555-0101"
        />
        {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
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
          className="btn-ripple px-6 py-3 border border-transparent rounded-xl shadow-xl text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 animate-pulse-glow"
        >
          ✓ Register Member
        </button>
      </div>
    </form>
  );
};
