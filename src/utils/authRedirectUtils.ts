// src/utils/authRedirectUtils.ts
export const saveLastLocation = (path: string) => {
    if (path !== '/login' && path !== '/register') {
      localStorage.setItem('fretszy_last_location', path);
    }
  };
  
  export const getLastLocation = () => {
    return localStorage.getItem('fretszy_last_location') || '/';
  };
  
  export const clearLastLocation = () => {
    localStorage.removeItem('fretszy_last_location');
  };