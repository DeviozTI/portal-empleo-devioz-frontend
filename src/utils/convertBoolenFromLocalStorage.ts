export const getBooleanFromLocalStorage = (key: string): boolean => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : false;
};
