export const setLocalStorageItem = <T>(key: string, data: T): void => {
    localStorage.setItem(key, JSON.stringify(data));
    
  };
  
  export const getLocalStorageItem = <T>(key: string): T | null => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) as T : null;
  };
  
  
  // Helper functions for sessionStorage
  export const setSessionStorageItem = <T>(key: string, data: T): void => {
    sessionStorage.setItem(key, JSON.stringify(data));
  };
  
  export const getSessionStorageItem = <T>(key: string): T | null => {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) as T : null;  
  };