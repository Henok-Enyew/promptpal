import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { commentsAPI } from '@/lib/api';
import { wsClient } from '@/lib/websocket';

export const useComments = (promptId: string | null) => {
  const queryClient = useQueryClient();

  // Get comments
  const { data, isLoading, error } = useQuery({
    queryKey: ['comments', promptId],
    queryFn: () => commentsAPI.getComments(promptId!),
    enabled: !!promptId,
    staleTime: 30 * 1000, // 30 seconds
  });

  const comments = data?.data?.comments || [];

  // WebSocket integration for real-time updates
  useEffect(() => {
    if (!promptId) return;

    // Connect to WebSocket when component mounts (if WebSocket URL is available)
    const wsUrl = import.meta.env.VITE_WS_URL;
    if (wsUrl) {
      wsClient.connect(wsUrl);

      // Listen for new comments
      const handleCommentAdded = (newComment: any) => {
        if (newComment.promptId === promptId) {
          queryClient.setQueryData(['comments', promptId], (old: any) => {
            if (!old) return old;
            return {
              ...old,
              data: {
                ...old.data,
                comments: [...old.data.comments, newComment],
              },
            };
          });
        }
      };

      // Listen for deleted comments
      const handleCommentDeleted = (deletedComment: any) => {
        if (deletedComment.promptId === promptId) {
          queryClient.setQueryData(['comments', promptId], (old: any) => {
            if (!old) return old;
            return {
              ...old,
              data: {
                ...old.data,
                comments: old.data.comments.filter(
                  (c: any) => c.id !== deletedComment.id
                ),
              },
            };
          });
        }
      };

      wsClient.on('comment_added', handleCommentAdded);
      wsClient.on('comment_deleted', handleCommentDeleted);

      return () => {
        wsClient.off('comment_added', handleCommentAdded);
        wsClient.off('comment_deleted', handleCommentDeleted);
      };
    }
  }, [promptId, queryClient]);

  // Add comment mutation
  const addCommentMutation = useMutation({
    mutationFn: (text: string) => commentsAPI.addComment(promptId!, text),
    onSuccess: () => {
      // Invalidate and refetch comments
      queryClient.invalidateQueries({ queryKey: ['comments', promptId] });
      
      // If WebSocket is connected, the real-time update will handle it
      // Otherwise, the invalidation will trigger a refetch
    },
  });

  // Delete comment mutation
  const deleteCommentMutation = useMutation({
    mutationFn: (commentId: string) => commentsAPI.deleteComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', promptId] });
    },
  });

  return {
    comments,
    isLoading,
    error,
    addComment: addCommentMutation.mutateAsync,
    deleteComment: deleteCommentMutation.mutateAsync,
    isAddingComment: addCommentMutation.isPending,
    isDeletingComment: deleteCommentMutation.isPending,
  };
};

