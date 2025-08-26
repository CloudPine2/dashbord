/**
 * Utility functions for handling profile images and fallbacks
 */

/**
 * Fixes Google profile picture URLs to ensure they load properly
 * @param photoURL - The original photo URL from Google
 * @returns A fixed URL that should work better
 */
export const fixGoogleProfilePicture = (photoURL: string | null): string | null => {
  if (!photoURL) return null;
  
  // If it's a Google profile picture, try to fix common issues
  if (photoURL.includes('googleusercontent.com')) {
    // Remove the size parameter and use a larger size
    const baseUrl = photoURL.split('=')[0];
    return `${baseUrl}=s400-c`; // Use 400px size for better quality
  }
  
  return photoURL;
};

/**
 * Creates a fallback avatar with user initials
 * @param displayName - User's display name
 * @param email - User's email
 * @returns The first letter of the name or email
 */
export const getInitials = (displayName?: string | null, email?: string | null): string => {
  if (displayName && displayName.trim()) {
    return displayName.trim().charAt(0).toUpperCase();
  }
  
  if (email && email.trim()) {
    return email.trim().charAt(0).toUpperCase();
  }
  
  return 'U';
};

/**
 * Generates a consistent color for user avatars based on their name/email
 * @param text - The text to generate color from
 * @returns A CSS color string
 */
export const getAvatarColor = (text: string): string => {
  const colors = [
    'bg-forest-600',
    'bg-forest-700', 
    'bg-forest-800',
    'bg-cream-600',
    'bg-cream-700',
    'bg-blue-600',
    'bg-purple-600',
    'bg-pink-600',
    'bg-indigo-600',
    'bg-teal-600'
  ];
  
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const index = Math.abs(hash) % colors.length;
  return colors[index];
};
