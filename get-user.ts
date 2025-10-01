import API_URL from "./app/common/constants/api";


export default async function getUsers() {
  const res = await fetch(`${API_URL}/users`, {
    credentials: "include",
    cache: "no-store",
  });

  if (!res.ok) return [];

  const users = await res.json();
  return users; // tableau d'utilisateurs
}
