import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { userAPI } from '@/lib/api';

export const useUserProfile = () => {
  const queryClient = useQueryClient();

  // Get user profile
  const { data, isLoading, error } = useQuery({
    queryKey: ['user', 'profile'],
    queryFn: () => userAPI.getUserProfile(),
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const user = data?.data?.user || null;

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: (data: {
      firstName?: string;
      lastName?: string;
      phoneNumber?: string;
    }) => userAPI.updateProfile(data),
    onSuccess: () => {
      // Invalidate both user profile and auth queries
      queryClient.invalidateQueries({ queryKey: ['user', 'profile'] });
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    },
  });

  return {
    user,
    isLoading,
    error,
    updateProfile: updateProfileMutation.mutateAsync,
    isUpdating: updateProfileMutation.isPending,
    updateError: updateProfileMutation.error,
  };
};

