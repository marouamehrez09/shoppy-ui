import { User } from "../interfaces/user-interface";

async function getMe(): Promise<User | null> {
  try {
    const res = await fetch("/api/me");
    if (!res.ok) return null;
    const data: User = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default getMe;
