import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Chrome } from 'lucide-react';
import { useGoogleLogin } from '@react-oauth/google';
import { useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';
import { authAPI } from '@/lib/api';
import { getUserFriendlyError } from '@/lib/errorHandler';

type AuthModalProps = {
  isOpen: boolean;
  onClose: () => void;
  initialMode: 'login' | 'signup';
  onSuccess?: () => void;
};

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode, onSuccess }) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirm: '',
    phoneNumber: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const queryClient = useQueryClient();
  
  const { login, register, isLoggingIn, isRegistering, loginError, registerError } = useAuth();

  // Google OAuth login
  const googleLogin = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      setIsGoogleLoading(true);
      setError(null);
      try {
        // Send the authorization code to backend
        const response = await authAPI.googleAuth(codeResponse.code);
        if (response.status === 'success') {
          // The backend sets the JWT cookie
          // Invalidate auth query to refresh user state
          queryClient.invalidateQueries({ queryKey: ['auth'] });
          onSuccess?.();
          onClose();
        }
      } catch (err: any) {
        const errorMessage = getUserFriendlyError(err);
        setError(errorMessage || 'Google authentication failed. Please try again.');
      } finally {
        setIsGoogleLoading(false);
      }
    },
    onError: () => {
      setError('Google authentication failed. Please try again.');
      setIsGoogleLoading(false);
    },
    flow: 'auth-code', // Use authorization code flow
  });
  
  useEffect(() => {
    setMode(initialMode);
    setError(null);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirm: '',
      phoneNumber: '',
    });
  }, [initialMode, isOpen]);

  useEffect(() => {
    if (loginError) {
      const errorMessage = getUserFriendlyError(loginError);
      setError(errorMessage);
    } else if (registerError) {
      const errorMessage = getUserFriendlyError(registerError);
      setError(errorMessage);
    }
  }, [loginError, registerError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      if (mode === 'login') {
        await login({
          email: formData.email,
          password: formData.password,
        });
        onSuccess?.();
        onClose();
      } else {
        await register({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          passwordConfirm: formData.passwordConfirm,
          phoneNumber: formData.phoneNumber || undefined,
        });
        // Show success message for registration
        setError(null);
        // Switch to login mode after successful registration
        setMode('login');
        setFormData({
          firstName: '',
          lastName: '',
          email: formData.email, // Keep email for convenience
          password: '',
          passwordConfirm: '',
          phoneNumber: '',
        });
      }
    } catch (err: any) {
      const errorMessage = getUserFriendlyError(err);
      setError(errorMessage);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] p-8 shadow-2xl overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-indigo-500 to-rose-500" />
          
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5 text-white/40" />
          </button>

          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">
              {mode === 'login' ? 'Welcome Back' : 'Join PromptPal'}
            </h2>
            <p className="text-white/40 text-sm">
              {mode === 'login' 
                ? 'Access your saved prompts and community' 
                : 'Start engineering and monetizing your prompts today'}
            </p>
          </div>

          <div className="space-y-4 mb-8">
            <button 
              onClick={() => googleLogin()}
              disabled={isGoogleLoading || isLoggingIn || isRegistering}
              className="w-full flex items-center justify-center gap-3 bg-white text-black font-bold py-3 px-4 rounded-2xl hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <Chrome className="w-5 h-5" />
              {isGoogleLoading ? 'Connecting...' : 'Continue with Google'}
            </button>
          </div>

          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/5"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#0a0a0a] px-4 text-white/20 tracking-widest font-bold">Or continue with</span>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-400 text-sm">
              {error}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            {mode === 'signup' && (
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                  <input 
                    type="text" 
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    autoComplete="given-name"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-indigo-500 transition-all"
                  />
                </div>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                  <input 
                    type="text" 
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    autoComplete="family-name"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-indigo-500 transition-all"
                  />
                </div>
              </div>
            )}
            
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
              <input 
                type="email" 
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-indigo-500 transition-all"
              />
            </div>

            {mode === 'signup' && (
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                  <input 
                    type="password" 
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    autoComplete="new-password"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-indigo-500 transition-all"
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                  <input 
                    type="password" 
                    name="passwordConfirm"
                    placeholder="Confirm Password"
                    value={formData.passwordConfirm}
                    onChange={handleChange}
                    required
                    autoComplete="new-password"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-indigo-500 transition-all"
                  />
                </div>
              </div>
            )}

            {mode === 'login' && (
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                <input 
                  type="password" 
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-indigo-500 transition-all"
                />
              </div>
            )}

            <button 
              type="submit"
              disabled={isLoggingIn || isRegistering}
              className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-indigo-500/20 mt-4"
            >
              {isLoggingIn || isRegistering 
                ? 'Processing...' 
                : mode === 'login' 
                  ? 'Sign In' 
                  : 'Create Account'}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-white/40">
            {mode === 'login' ? (
              <>
                Don't have an account?{' '}
                <button 
                  onClick={() => setMode('signup')}
                  className="text-indigo-400 font-bold hover:underline"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button 
                  onClick={() => setMode('login')}
                  className="text-indigo-400 font-bold hover:underline"
                >
                  Log In
                </button>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

