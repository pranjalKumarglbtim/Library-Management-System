import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface SignupProps {
  onSwitchToLogin: () => void;
}

export const Signup = ({ onSwitchToLogin }: SignupProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }

    if (formData.password.length < 6) {
      return setError('Password must be at least 6 characters');
    }

    setLoading(true);

    try {
      await signup(formData.email, formData.password, formData.name);
    } catch (err: any) {
      setError(err.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-pink-500/20 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 w-full max-w-md px-6">
        <div className="glass-morphism rounded-3xl shadow-2xl p-8 backdrop-blur-xl bg-gray-800/50 border border-gray-700/50 animate-scale-in">
          <div className="text-center mb-8 animate-fade-in-up">
            <div className="inline-block p-4 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full mb-4 animate-float">
              <span className="text-6xl">📚</span>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
              Create Account
            </h1>
            <p className="text-gray-400">Join our library system</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl animate-shake">
              <p className="text-red-400 text-sm font-semibold">⚠️ {error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <label htmlFor="name" className="block text-sm font-bold text-gray-300 mb-2">
                👤 Full Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="block w-full px-4 py-3 rounded-xl bg-gray-700/50 border-2 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/30 transition-all duration-200"
                placeholder="John Doe"
                required
              />
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <label htmlFor="email" className="block text-sm font-bold text-gray-300 mb-2">
                📧 Email Address
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="block w-full px-4 py-3 rounded-xl bg-gray-700/50 border-2 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/30 transition-all duration-200"
                placeholder="your@email.com"
                required
              />
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <label htmlFor="password" className="block text-sm font-bold text-gray-300 mb-2">
                🔒 Password
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="block w-full px-4 py-3 rounded-xl bg-gray-700/50 border-2 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/30 transition-all duration-200"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <label htmlFor="confirmPassword" className="block text-sm font-bold text-gray-300 mb-2">
                🔐 Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="block w-full px-4 py-3 rounded-xl bg-gray-700/50 border-2 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/30 transition-all duration-200"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-ripple px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed animate-pulse-glow"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Account...
                  </span>
                ) : (
                  '✨ Create Account'
                )}
              </button>
            </div>
          </form>

          <div className="text-center mt-4 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <p className="text-gray-400">
              Already have an account?{' '}
              <button
                onClick={onSwitchToLogin}
                className="text-purple-400 hover:text-purple-300 font-bold hover:underline transition-colors"
              >
                Sign In
              </button>
            </p>
          </div>

          <div className="text-center mt-8 animate-fade-in-up" style={{ animationDelay: '0.9s' }}>
            <p className="text-gray-500 text-sm">
              🔒 Secured by Firebase Authentication
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};