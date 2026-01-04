# Backend Integration & React Query Setup Summary

## ✅ Completed Tasks

### 1. React Query Installation & Setup
- ✅ Installed `@tanstack/react-query` and `axios`
- ✅ Created React Query provider in `main.tsx`
- ✅ Configured default query options (5min staleTime, no refetch on window focus)

### 2. API Service Layer (`src/lib/api.ts`)
- ✅ Created centralized API client with axios
- ✅ Configured for cookie-based authentication (`withCredentials: true`)
- ✅ Added request/response interceptors for error handling
- ✅ Implemented auth API functions:
  - `register()` - User registration
  - `login()` - User login
  - `logout()` - User logout
  - `checkAuth()` - Check authentication status
  - `verifyEmail()` - Email verification
  - `forgotPassword()` - Password reset request
- ✅ Implemented comments API (mock for now, ready for backend):
  - `getComments()` - Fetch comments for a prompt
  - `addComment()` - Add a new comment
  - `deleteComment()` - Delete a comment
- ✅ Implemented prompts API:
  - `getFeed()` - Get prompts feed with filters
  - `getPrompt()` - Get single prompt by ID

### 3. Custom Hooks

#### `useAuth` Hook (`src/hooks/useAuth.ts`)
- ✅ Manages authentication state using React Query
- ✅ Provides:
  - `user` - Current user object
  - `isAuthenticated` - Boolean auth status
  - `isLoading` - Loading state
  - `login()` - Login mutation
  - `register()` - Registration mutation
  - `logout()` - Logout mutation
  - Error states for login/register

#### `useComments` Hook (`src/hooks/useComments.ts`)
- ✅ Fetches comments for a prompt
- ✅ Provides add/delete comment mutations
- ✅ **WebSocket-ready**: Automatically listens for real-time comment updates when WebSocket URL is configured
- ✅ Updates React Query cache in real-time when WebSocket events occur

### 4. AuthModal Integration
- ✅ Updated `AuthModal` to use `useAuth` hook
- ✅ Integrated with backend API for login/signup
- ✅ Added form validation and error handling
- ✅ Shows loading states during API calls
- ✅ Handles registration success (switches to login mode)

### 5. Comments Section in PromptDetail
- ✅ Added comments list display
- ✅ Added comment input form (only for authenticated users)
- ✅ Shows login prompt for unauthenticated users
- ✅ Real-time updates via WebSocket (when configured)
- ✅ Comment formatting (relative time display)
- ✅ Delete functionality for own comments

### 6. WebSocket Integration (Ready for Future)
- ✅ Created `WebSocketClient` class (`src/lib/websocket.ts`)
- ✅ Automatic reconnection logic
- ✅ Event-based message handling
- ✅ Integrated into `useComments` hook for real-time updates
- ✅ Ready to connect when backend WebSocket endpoint is available

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the project root (optional - defaults to production API):
```env
# Defaults to production API: https://prompt-pal.onrender.com/api/v1
VITE_API_URL=https://prompt-pal.onrender.com/api/v1

# WebSocket URL (when WebSocket server is implemented)
VITE_WS_URL=wss://prompt-pal.onrender.com  # Optional, for WebSocket
```

**Note**: The API is configured to use the production endpoint at `https://prompt-pal.onrender.com/api/v1` by default. You can override this with environment variables if needed.

### Backend Endpoints Expected

#### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `POST /api/v1/auth/logout` - Logout user
- `GET /api/v1/auth/check-auth` - Check auth status

#### Comments (To be implemented in backend)
- `GET /api/v1/prompts/:id/comments` - Get comments for prompt
- `POST /api/v1/prompts/:id/comments` - Add comment
- `DELETE /api/v1/comments/:id` - Delete comment

#### WebSocket Events (To be implemented)
- `comment_added` - New comment added
- `comment_deleted` - Comment deleted
- `comment_updated` - Comment updated

## 📝 Usage Examples

### Using Auth Hook
```tsx
import { useAuth } from '@/hooks/useAuth';

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();
  
  if (!isAuthenticated) {
    return <button onClick={() => login({ email, password })}>Login</button>;
  }
  
  return <div>Welcome, {user.firstName}!</div>;
}
```

### Using Comments Hook
```tsx
import { useComments } from '@/hooks/useComments';

function PromptDetail({ promptId }) {
  const { comments, addComment, isLoading } = useComments(promptId);
  
  // Comments automatically update via WebSocket when configured
  return (
    <div>
      {comments.map(comment => (
        <div key={comment.id}>{comment.text}</div>
      ))}
    </div>
  );
}
```

## 🚀 Next Steps

1. **Backend Integration**:
   - Update `commentsAPI` functions in `src/lib/api.ts` to use actual endpoints
   - Ensure backend returns data in expected format

2. **WebSocket Setup**:
   - Implement WebSocket server in backend
   - Set `VITE_WS_URL` environment variable
   - Comments will automatically update in real-time

3. **Error Handling**:
   - Add toast notifications for better UX
   - Handle network errors gracefully

4. **Testing**:
   - Test authentication flow
   - Test comments CRUD operations
   - Test WebSocket real-time updates

## 📦 Dependencies Added
- `@tanstack/react-query` - State management
- `axios` - HTTP client

## 🎯 Benefits

1. **Centralized State Management**: React Query handles caching, refetching, and state synchronization
2. **Real-time Ready**: WebSocket integration is already set up and will work automatically when backend is ready
3. **Type-safe**: All API calls are typed
4. **Error Handling**: Centralized error handling in interceptors
5. **Easy to Extend**: Simple to add new API endpoints and hooks

