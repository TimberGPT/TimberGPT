import { jwtDecode } from "jwt-decode";

export const setToLocalStorage = (key, token) => {
  if (!key || typeof window === "undefined") {
    return "";
  }

  return localStorage.setItem(key, token);
};

export const getFromLocalStorage = (key) => {
  if (!key || typeof window === "undefined") {
    return "";
  }

  return localStorage.getItem(key);
};

export const removeFromLocalStorage = (key) => {
  if (!key || typeof window === "undefined") {
    return "";
  }

  return localStorage.removeItem(key);
};

export const getDecodedToken = () => {
  try {
    const token = getFromLocalStorage(process.env.NEXT_PUBLIC_AUTH_KEY);

    if (!token) {
      return null;
    }

    const decoded = jwtDecode(token);
    
    if (decoded.exp && Date.now() >= decoded.exp * 1000) {
      removeFromLocalStorage(process.env.NEXT_PUBLIC_AUTH_KEY);
      return null;
    }

    return decoded;
  } catch (error) {
    console.error("Token decode error:", error);
    return null;
  }
};
