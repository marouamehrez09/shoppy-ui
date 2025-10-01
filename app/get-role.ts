import API_URL from "./common/constants/api";

export default async function getRole() {
  const res = await fetch(`${API_URL}/users/me`, {
    credentials: "include",
    cache: "no-store",
  });

  if (!res.ok) return null;
  const user = await res.json();
  return user.role; // "USER" ou "ADMIN"
}
