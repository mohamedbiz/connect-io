/**
 * Password strength utility for enhanced validation
 */

export type PasswordStrength = 'weak' | 'medium' | 'strong' | 'very-strong';

export interface PasswordValidation {
  isValid: boolean;
  strength: PasswordStrength;
  messages: string[];
  color: string;
}

/**
 * Validates password strength based on multiple criteria
 */
export function validatePassword(password: string): PasswordValidation {
  const messages: string[] = [];
  let strength: PasswordStrength = 'weak';
  let color = 'red';
  
  // Check length
  if (password.length < 8) {
    messages.push('Password must be at least 8 characters');
  }
  
  // Check for uppercase letters
  if (!/[A-Z]/.test(password)) {
    messages.push('Include at least one uppercase letter');
  }
  
  // Check for lowercase letters
  if (!/[a-z]/.test(password)) {
    messages.push('Include at least one lowercase letter');
  }
  
  // Check for numbers
  if (!/\d/.test(password)) {
    messages.push('Include at least one number');
  }
  
  // Check for special characters
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    messages.push('Include at least one special character');
  }
  
  // Determine password strength
  const hasLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  const criteriaCount = [hasLength, hasUppercase, hasLowercase, hasNumbers, hasSpecialChars].filter(Boolean).length;
  
  if (criteriaCount === 5) {
    strength = 'very-strong';
    color = 'green';
    messages.length = 0; // Clear error messages
    messages.push('Very strong password');
  } else if (criteriaCount >= 4) {
    strength = 'strong';
    color = 'teal';
    messages.length = 0; // Clear error messages
    messages.push('Strong password');
  } else if (criteriaCount >= 3) {
    strength = 'medium';
    color = 'amber';
    // Keep remaining messages for improvement
  }
  
  return {
    isValid: criteriaCount >= 3, // At least medium strength required
    strength,
    messages,
    color
  };
}
