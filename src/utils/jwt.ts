import {jwtDecode} from "jwt-decode"

export function getUsernameFromToken(): string | null {
  const token = localStorage.getItem("AUTH_TOKEN");
  if (!token) return null;

  try {
    const decoded: { username: string } = jwtDecode(token); 
    return decoded.username;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
}