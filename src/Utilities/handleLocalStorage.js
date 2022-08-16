// Set a key in localStorage
export const setLocalStorage = (key, value) => {
    localStorage.setItem(key, value);
}

// Get values from a key in localStorage
export const getLocalStorage = (key, value) => {
    return localStorage.getItem(key, value) || null;
}