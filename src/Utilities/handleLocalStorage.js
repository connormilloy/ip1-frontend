export const setLocalStorage = (key, value) => {
    localStorage.setItem(key, value);
}

export const getLocalStorage = (key, value) => {
    return localStorage.getItem(key, value) || null;
}