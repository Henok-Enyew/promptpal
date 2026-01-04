/**
 * Parse backend error response and extract user-friendly error messages
 */

type BackendErrorResponse = {
  status?: 'fail' | 'error' | 'success';
  message?: string;
  error?: any;
};

/**
 * Extract error message from backend response
 */
export const parseBackendError = (error: any): string => {
  // If it's already a string, return it
  if (typeof error === 'string') {
    return error;
  }

  // Check if it's an Error object
  if (error instanceof Error) {
    return error.message;
  }

  // Check for axios error response
  const response = error?.response;
  if (response?.data) {
    const data: BackendErrorResponse = response.data;
    
    // Backend returns { status: "fail", message: "..." }
    if (data.message) {
      return data.message;
    }
    
    // Fallback to error object if message doesn't exist
    if (data.error?.message) {
      return data.error.message;
    }
  }

  // Default error message
  return 'An unexpected error occurred. Please try again.';
};

/**
 * Extract field-specific errors from validation error message
 * Backend format: "Invalid input data. fieldName: error message. anotherField: another error"
 */
export const parseValidationErrors = (errorMessage: string): Record<string, string> => {
  const errors: Record<string, string> = {};
  
  // Check if it's a validation error
  if (!errorMessage.includes('Invalid input data.')) {
    return errors;
  }

  // Extract the part after "Invalid input data."
  const errorPart = errorMessage.replace('Invalid input data.', '').trim();
  
  // Split by ". " to get individual field errors
  const fieldErrors = errorPart.split('. ').filter(Boolean);
  
  fieldErrors.forEach((fieldError) => {
    // Format: "fieldName: error message"
    const colonIndex = fieldError.indexOf(':');
    if (colonIndex > 0) {
      const fieldName = fieldError.substring(0, colonIndex).trim();
      const message = fieldError.substring(colonIndex + 1).trim();
      errors[fieldName] = message;
    }
  });

  return errors;
};

/**
 * Get user-friendly error message
 */
export const getUserFriendlyError = (error: any): string => {
  const errorMessage = parseBackendError(error);
  
  // Map common backend error messages to user-friendly ones
  const errorMappings: Record<string, string> = {
    'Incorrect email or password': 'Invalid email or password. Please check your credentials.',
    'Email not verified': 'Please verify your email address before logging in.',
    'User not found': 'No account found with this email address.',
    'Passwords don\'t match': 'Passwords do not match. Please try again.',
    'Password must be at least 8 characters': 'Password must be at least 8 characters long.',
    'Password must contain 1 uppercase, 1 lowercase, 1 number, and 1 special character': 
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
    'Duplicate field value': 'An account with this email already exists.',
    'Invalid email address': 'Please enter a valid email address.',
  };

  // Check for exact matches
  if (errorMappings[errorMessage]) {
    return errorMappings[errorMessage];
  }

  // Check for partial matches
  for (const [key, value] of Object.entries(errorMappings)) {
    if (errorMessage.includes(key)) {
      return value;
    }
  }

  // Return the original message if no mapping found
  return errorMessage;
};

