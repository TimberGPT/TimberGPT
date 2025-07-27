import {
  removeFromLocalStorage,
  setToLocalStorage,
} from "@/utils/local-storage";

export const storeToken = (token) => {
  return setToLocalStorage(process.env.NEXT_PUBLIC_AUTH_KEY, token);
};

export const removeToken = () => {
  return removeFromLocalStorage(process.env.NEXT_PUBLIC_AUTH_KEY);
};
