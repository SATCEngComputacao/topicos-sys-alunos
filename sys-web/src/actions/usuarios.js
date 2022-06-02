import { API_URL, defaults } from "~/env";

export async function fetchLogin(formData) {
  // { email: xxxx, password: xxxx }
  const response = await fetch(`${API_URL}/usuarios/login`, {
    method: "POST",
    headers: defaults.headers,
    body: JSON.stringify(formData),
  });

  const data = await response.json();

  return data;
}
