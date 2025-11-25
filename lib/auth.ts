// lib/auth.ts

export const checkAdminAuth = (): boolean => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('admin_authenticated') === 'true';
  };
  
  export const setAdminAuth = (authenticated: boolean): void => {
    if (typeof window === 'undefined') return;
    if (authenticated) {
      localStorage.setItem('admin_authenticated', 'true');
    } else {
      localStorage.removeItem('admin_authenticated');
    }
  };
  
  export const verifyPassword = (password: string): boolean => {
    return password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD;
  };