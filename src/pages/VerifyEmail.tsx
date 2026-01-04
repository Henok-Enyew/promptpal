import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Loader2 } from 'lucide-react';
import { authAPI } from '@/lib/api';
import { Navigation } from '@/components/layout/Navigation';
import { getUserFriendlyError } from '@/lib/errorHandler';

export function VerifyEmailPage() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    // Get token from URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    
    if (!token) {
      setStatus('error');
      setMessage('Verification token is missing.');
      return;
    }

    const verifyEmail = async () => {
      try {
        const response = await authAPI.verifyEmail(token);
        if (response.status === 'success') {
          setStatus('success');
          setMessage(response.message || 'Email verified successfully! You can now log in.');
          // Redirect to home after 3 seconds
          setTimeout(() => {
            window.location.href = '/#/';
          }, 3000);
        }
      } catch (error: any) {
        setStatus('error');
        const errorMessage = getUserFriendlyError(error);
        setMessage(errorMessage || 'Email verification failed. The link may be invalid or expired.');
      }
    };

    verifyEmail();
  }, []);

  return (
    <div className="min-h-screen bg-[#030303] text-white">
      <Navigation alwaysOpaque />
      <div className="flex items-center justify-center min-h-screen pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full mx-auto px-6"
        >
          <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 text-center">
            {status === 'loading' && (
              <>
                <Loader2 className="w-16 h-16 mx-auto mb-6 text-indigo-500 animate-spin" />
                <h1 className="text-2xl font-bold mb-4">Verifying your email...</h1>
                <p className="text-white/60">Please wait while we verify your email address.</p>
              </>
            )}

            {status === 'success' && (
              <>
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-emerald-500/10 flex items-center justify-center">
                  <Check className="w-8 h-8 text-emerald-500" />
                </div>
                <h1 className="text-2xl font-bold mb-4 text-emerald-400">Email Verified!</h1>
                <p className="text-white/60 mb-6">{message}</p>
                <p className="text-sm text-white/40">Redirecting to login...</p>
              </>
            )}

            {status === 'error' && (
              <>
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-rose-500/10 flex items-center justify-center">
                  <X className="w-8 h-8 text-rose-500" />
                </div>
                <h1 className="text-2xl font-bold mb-4 text-rose-400">Verification Failed</h1>
                <p className="text-white/60 mb-6">{message}</p>
                <button
                  onClick={() => window.location.href = '/#/'}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all"
                >
                  Go to Home
                </button>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

