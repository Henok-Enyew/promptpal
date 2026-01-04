import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authAPI } from '@/lib/api';

export const useAuth = () => {
  const queryClient = useQueryClient();

  // Check if user is authenticated
  const { data: authData, isLoading } = useQuery({
    queryKey: ['auth', 'check'],
    queryFn: () => authAPI.checkAuth(),
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const user = authData?.data?.user || null;
  const isAuthenticated = !!user;

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: (data: { email: string; password: string }) => authAPI.login(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    },
  });

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: (data: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      passwordConfirm: string;
      phoneNumber?: string;
    }) => authAPI.register(data),
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: () => authAPI.logout(),
    onSuccess: () => {
      queryClient.setQueryData(['auth', 'check'], null);
      queryClient.clear();
    },
  });

  return {
    user,
    isAuthenticated,
    isLoading,
    login: loginMutation.mutateAsync,
    register: registerMutation.mutateAsync,
    logout: logoutMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
    loginError: loginMutation.error,
    registerError: registerMutation.error,
  };
};

