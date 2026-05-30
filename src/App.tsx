import { useState, useEffect } from 'react';
import { Book, Member, LibraryStats } from './types';
import {
  getBooks,
  getMembers,
  addBook,
  addMember,
  deleteBook,
  deleteMember,
} from './utils/storage';
import {
  borrowBook,
  returnBook,
  searchBooks,
  calculateStatistics,
} from './utils/library';
import { exportBooks, exportMembers, exportRecords } from './utils/export';
import { getRecords } from './utils/storage';
import { BookList } from './components/BookList';
import { BookCard } from './components/BookCard';
import { MemberList } from './components/MemberList';
import { Statistics } from './components/Statistics';
import { AddBookForm } from './components/AddBookForm';
import { AddMemberForm } from './components/AddMemberForm';
import { BorrowBookModal } from './components/BorrowBookModal';
import { Modal } from './components/Modal';
import { TransactionHistory } from './components/TransactionHistory';
import { AnimatedHeader } from './components/AnimatedHeader';
import { LoadingScreen } from './components/LoadingScreen';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { BorrowBooks } from './components/BorrowBooks';
import { useAuth } from './context/AuthContext';

type Tab = 'dashboard' | 'books' | 'members' | 'borrow' | 'history' | 'student';
type ViewMode = 'grid' | 'table';
type AuthView = 'login' | 'signup';

function App() {
  const { user, loading: authLoading } = useAuth();
  const [authView, setAuthView] = useState<AuthView>('login');
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [books, setBooks] = useState<Book[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddBookModal, setShowAddBookModal] = useState(false);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [borrowModalData, setBorrowModalData] = useState<{
    isbn: string;
    title: string;
  } | null>(null);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const [stats, setStats] = useState<LibraryStats>({
    totalBooks: 0,
    availableBooks: 0,
    borrowedBooks: 0,
    totalMembers: 0,
    overdueBooks: 0,
    totalFines: 0,
  });

  const loadData = () => {
    const booksData = getBooks();
    const membersData = getMembers();
    setBooks(booksData);
    setMembers(membersData);
  };

  useEffect(() => {
    loadData();
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setStats(calculateStatistics(books, members));
  }, [books, members]);

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleAddBook = (book: Book) => {
    addBook(book);
    loadData();
    setShowAddBookModal(false);
    showNotification('Book added successfully!');
  };

  const handleDeleteBook = (isbn: string) => {
    const book = books.find((b) => b.isbn === isbn);
    if (book && !book.available) {
      showNotification('Cannot delete a borrowed book!', 'error');
      return;
    }

    if (confirm('Are you sure you want to delete this book?')) {
      deleteBook(isbn);
      loadData();
      showNotification('Book deleted successfully!');
    }
  };

  const handleAddMember = (member: Member) => {
    addMember(member);
    loadData();
    setShowAddMemberModal(false);
    showNotification('Member registered successfully!');
  };

  const handleDeleteMember = (id: string) => {
    if (confirm('Are you sure you want to delete this member?')) {
      deleteMember(id);
      loadData();
      showNotification('Member deleted successfully!');
    }
  };

  const handleBorrowClick = (isbn: string) => {
    const book = books.find((b) => b.isbn === isbn);
    if (book) {
      setBorrowModalData({ isbn, title: book.title });
    }
  };

  const handleBorrow = (isbn: string, memberId: string) => {
    const result = borrowBook(isbn, memberId);
    if (result.success) {
      loadData();
      showNotification(result.message);
    } else {
      showNotification(result.message, 'error');
    }
  };

  const handleReturn = (isbn: string) => {
    const result = returnBook(isbn);
    if (result.success) {
      loadData();
      showNotification(result.message);
    } else {
      showNotification(result.message, 'error');
    }
  };

  const filteredBooks =
    searchQuery.trim() === '' ? books : searchBooks(searchQuery);

  const tabs = [
    { id: 'dashboard' as Tab, name: 'Dashboard', icon: '📊' },
    { id: 'books' as Tab, name: 'Books', icon: '📚' },
    { id: 'members' as Tab, name: 'Student Registration', icon: '🎓' },
    { id: 'borrow' as Tab, name: 'Borrow/Return', icon: '🔄' },
    { id: 'history' as Tab, name: 'History', icon: '📜' },
    { id: 'student' as Tab, name: 'Borrow Books', icon: '📖' },
  ];

  // Show auth loading
  if (authLoading) {
    return <LoadingScreen />;
  }

  // Show login/signup if not authenticated
  if (!user) {
    return authView === 'login' ? (
      <Login onSwitchToSignup={() => setAuthView('signup')} />
    ) : (
      <Signup onSwitchToLogin={() => setAuthView('login')} />
    );
  }

  // Show app loading
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Animated Header */}
      <AnimatedHeader />

      {/* Notification */}
      {notification && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div
            className={`rounded-xl p-4 shadow-2xl animate-bounce-in ${
              notification.type === 'success'
                ? 'bg-gradient-to-r from-emerald-600 to-cyan-600 border-2 border-emerald-500/50'
                : 'bg-gradient-to-r from-red-600 to-pink-600 border-2 border-red-500/50'
            }`}
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                {notification.type === 'success' ? (
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center animate-scale-in">
                    <svg
                      className="h-6 w-6 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                ) : (
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center animate-scale-in">
                    <svg
                      className="h-6 w-6 text-red-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                )}
              </div>
              <div className="ml-4 flex-1">
                <p className="text-lg font-bold text-white drop-shadow-lg">
                  {notification.message}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="glass-morphism rounded-2xl p-2 shadow-xl bg-gray-800/30 border border-gray-700/50">
          <nav className="flex space-x-2">
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex-1 group transition-all duration-300 animate-fade-in-up ${
                  activeTab === tab.id
                    ? 'transform scale-105'
                    : ''
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`relative px-6 py-4 rounded-xl font-semibold text-sm flex flex-col items-center justify-center space-y-1 transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-2xl transform'
                    : 'text-gray-400 hover:bg-gray-700/50 hover:text-gray-200'
                }`}>
                  <span className={`text-2xl transform transition-transform group-hover:scale-125 ${
                    activeTab === tab.id ? 'animate-bounce' : ''
                  }`}>{tab.icon}</span>
                  <span className="text-xs">{tab.name}</span>
                  
                  {activeTab === tab.id && (
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 opacity-50 blur-xl"></div>
                  )}
                </div>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-fade-in-up">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  Library Statistics
                </h2>
                <div className="glass-morphism px-6 py-3 rounded-full animate-pulse-glow bg-gray-800/30 border border-gray-700/50">
                  <span className="text-sm font-semibold text-indigo-300">
                    📊 Real-time Analytics
                  </span>
                </div>
              </div>
              <Statistics stats={stats} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
              <div className="glass-morphism shadow-2xl rounded-2xl p-6 card-hover animate-slide-in-left">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    Recent Books
                  </h3>
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    {books.length} Total
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {books.slice(0, 3).map((book, index) => (
                    <div
                      key={book.isbn}
                      className="bg-white/50 backdrop-blur-sm rounded-xl p-4 shadow-lg transform hover:scale-105 transition-all duration-200 animate-fade-in-up"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 mb-1">{book.title}</h4>
                          <p className="text-sm text-gray-600">{book.author}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          book.available
                            ? 'bg-gradient-to-r from-green-400 to-cyan-500 text-white'
                            : 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white'
                        }`}>
                          {book.available ? '✓ Available' : '⏰ Borrowed'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-morphism shadow-2xl rounded-2xl p-6 card-hover animate-slide-in-right">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Recent Members
                  </h3>
                  <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    {members.length} Total
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {members.slice(0, 3).map((member, index) => (
                    <div
                      key={member.id}
                      className="bg-white/50 backdrop-blur-sm rounded-xl p-4 shadow-lg transform hover:scale-105 transition-all duration-200 animate-fade-in-up"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 mb-1">{member.name}</h4>
                          <p className="text-sm text-gray-600">{member.id}</p>
                        </div>
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-indigo-400 to-purple-500 text-white">
                          📚 {member.borrowedBooks.length} Books
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Books Tab */}
        {activeTab === 'books' && (
          <div className="space-y-6 animate-fade-in-up">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                All Books
              </h2>
              <div className="flex space-x-3">
                {/* View Mode Toggle */}
                <div className="glass-morphism rounded-lg p-1 flex space-x-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`px-3 py-2 rounded-md transition-all duration-200 ${
                      viewMode === 'grid'
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                        : 'text-gray-600 hover:bg-white/50'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setViewMode('table')}
                    className={`px-3 py-2 rounded-md transition-all duration-200 ${
                      viewMode === 'table'
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                        : 'text-gray-600 hover:bg-white/50'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
                
                <button
                  onClick={() => exportBooks(books)}
                  className="btn-ripple inline-flex items-center px-6 py-3 border-2 border-indigo-300 rounded-xl shadow-lg text-sm font-bold text-indigo-700 bg-white hover:bg-indigo-50 transform hover:scale-105 transition-all duration-200"
                >
                  <svg className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Export CSV
                </button>
                
                <button
                  onClick={() => setShowAddBookModal(true)}
                  className="btn-ripple inline-flex items-center px-6 py-3 border border-transparent rounded-xl shadow-xl text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 animate-pulse-glow"
                >
                  <svg className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add New Book
                </button>
              </div>
            </div>

            <div className="glass-morphism shadow-2xl rounded-2xl p-6">
              <div className="mb-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="🔍 Search books by title, author, or ISBN..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full pl-12 pr-4 py-4 text-lg rounded-xl border-2 border-indigo-200 shadow-lg focus:border-indigo-500 focus:ring-4 focus:ring-indigo-200 transition-all duration-200"
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <svg className="w-6 h-6 text-indigo-400 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredBooks.map((book, index) => (
                    <BookCard
                      key={book.isbn}
                      book={book}
                      onDelete={handleDeleteBook}
                      index={index}
                    />
                  ))}
                  {filteredBooks.length === 0 && (
                    <div className="col-span-full text-center py-12">
                      <div className="inline-block p-8 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full mb-4 animate-bounce">
                        <span className="text-6xl">📚</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-700 mb-2">No books found</h3>
                      <p className="text-gray-500">Try adjusting your search or add a new book</p>
                    </div>
                  )}
                </div>
              ) : (
                <BookList books={filteredBooks} onDelete={handleDeleteBook} />
              )}
            </div>
          </div>
        )}

        {/* Members Tab */}
        {activeTab === 'members' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">All Members</h2>
              <div className="flex space-x-3">
                <button
                  onClick={() => exportMembers(members)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <svg
                    className="-ml-1 mr-2 h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Export CSV
                </button>
                <button
                  onClick={() => setShowAddMemberModal(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <svg
                    className="-ml-1 mr-2 h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Register New Member
                </button>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <MemberList members={members} onDelete={handleDeleteMember} />
            </div>
          </div>
        )}

        {/* Borrow/Return Tab */}
        {activeTab === 'borrow' && (
          <div className="space-y-6 animate-fade-in-up">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Borrow & Return Books
            </h2>

            <div className="glass-morphism shadow-2xl rounded-2xl p-6">
              <div className="mb-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="🔍 Search books..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full pl-12 pr-4 py-4 text-lg rounded-xl border-2 border-indigo-200 shadow-lg focus:border-indigo-500 focus:ring-4 focus:ring-indigo-200 transition-all duration-200"
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <svg className="w-6 h-6 text-indigo-400 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBooks.map((book, index) => (
                  <BookCard
                    key={book.isbn}
                    book={book}
                    onBorrow={handleBorrowClick}
                    onReturn={handleReturn}
                    index={index}
                  />
                ))}
                {filteredBooks.length === 0 && (
                  <div className="col-span-full text-center py-12">
                    <div className="inline-block p-8 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full mb-4 animate-bounce">
                      <span className="text-6xl">📚</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-700 mb-2">No books found</h3>
                    <p className="text-gray-500">Try adjusting your search</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Transaction History</h2>
              <button
                onClick={() => exportRecords(getRecords())}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <svg
                  className="-ml-1 mr-2 h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Export CSV
              </button>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <TransactionHistory />
            </div>
          </div>
        )}

        {/* Student Portal Tab */}
        {activeTab === 'student' && (
          <BorrowBooks
            books={books}
            members={members}
            onBorrow={handleBorrow}
            onReturn={handleReturn}
          />
        )}
      </main>

      {/* Modals */}
      <Modal
        isOpen={showAddBookModal}
        onClose={() => setShowAddBookModal(false)}
        title="Add New Book"
      >
        <AddBookForm
          onAdd={handleAddBook}
          onCancel={() => setShowAddBookModal(false)}
        />
      </Modal>

      <Modal
        isOpen={showAddMemberModal}
        onClose={() => setShowAddMemberModal(false)}
        title="Register New Member"
      >
        <AddMemberForm
          onAdd={handleAddMember}
          onCancel={() => setShowAddMemberModal(false)}
        />
      </Modal>

      {borrowModalData && (
        <BorrowBookModal
          bookIsbn={borrowModalData.isbn}
          bookTitle={borrowModalData.title}
          members={members}
          onBorrow={handleBorrow}
          onClose={() => setBorrowModalData(null)}
        />
      )}

      {/* Footer */}
      <footer className="relative mt-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <span className="text-5xl animate-float">📖</span>
              <h3 className="text-3xl font-bold text-white drop-shadow-lg">
                Library Management System
              </h3>
            </div>
            
            <p className="text-indigo-100 text-lg mb-8 animate-shimmer">
              Built with modern web technologies for efficient library operations
            </p>
            
            <div className="flex items-center justify-center space-x-6 mb-8">
              <div className="glass-morphism px-6 py-3 rounded-full">
                <span className="text-white font-semibold">⚛️ React 18</span>
              </div>
              <div className="glass-morphism px-6 py-3 rounded-full">
                <span className="text-white font-semibold">🔷 TypeScript</span>
              </div>
              <div className="glass-morphism px-6 py-3 rounded-full">
                <span className="text-white font-semibold">🎨 Tailwind CSS</span>
              </div>
            </div>
            
            <p className="text-white text-sm opacity-75">
              © 2026 Library Management System. All rights reserved.
            </p>
          </div>
        </div>

        {/* Decorative top wave */}
        <div className="absolute top-0 left-0 right-0">
          <svg className="w-full h-16 transform rotate-180" viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path
              fill="rgb(243, 244, 246)"
              fillOpacity="1"
              d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            ></path>
          </svg>
        </div>
      </footer>
    </div>
  );
}

export default App;
