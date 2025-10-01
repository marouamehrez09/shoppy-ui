import { cookies } from "next/headers";
import API_URL from "../constants/api";

export const getHeaders = async () => {
  const cookieStore = await cookies();
  console.log("Cookies:", cookieStore.toString());
  return {
    Cookie: cookieStore.toString(), // <-- singular 'Cookie'
  };
};

// post.ts
export const post = async (path: string, data: FormData | object) => {
  const body = data instanceof FormData ? Object.fromEntries(data) : data;
  const res = await fetch(`${API_URL}/${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(await getHeaders()),
    },
    body: JSON.stringify(body),
  });

  const parsedRes = await res.json();
  if (!res.ok) {
    return { error: parsedRes.message || "Something went wrong" };
  }
  return { error: "", data: parsedRes };
};

export const get = async <T>(
  path: string,
  tags: string[],
  params?: URLSearchParams
) => {
  const url = params ? `${API_URL}/${path}?` + params : `${API_URL}/${path}`;
  console.log("fetching", url);
  const res = await fetch(url, {
    headers: { ...(await getHeaders()) },
    next: { tags },
  });
  return res.json() as T;
};

export const put = async (path: string, data: object) => {
  const body = JSON.stringify(data);
  const res = await fetch(`${API_URL}/${path}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...(await getHeaders()) },
    body,
  });
  const parsed = await res.json();
  if (!res.ok) return { error: parsed.message || 'Something went wrong' };
  return { error: '', data: parsed };
};

export const del = async (path: string) => {
  const res = await fetch(`${API_URL}/${path}`, {
    method: 'DELETE',
    headers: { ...(await getHeaders()) },
  });
  const parsed = await res.json();
  if (!res.ok) return { error: parsed.message || 'Something went wrong' };
  return { error: '', data: parsed };
};