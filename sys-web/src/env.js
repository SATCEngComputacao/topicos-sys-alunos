export const API_URL = import.meta.env.VITE_APP_API_URL || "http://localhost:5000";

export const defaults = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};
