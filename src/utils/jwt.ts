import {jwtDecode} from "jwt-decode"

type role= "BUYER" | "SUPERUSER" | "STAFF"

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
export function getRoleFromToken(): string | null {
  const token = localStorage.getItem("AUTH_TOKEN");
  if (!token) return null;

  try {
    const decoded: { role: role } = jwtDecode(token); 
    return decoded.role;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
}