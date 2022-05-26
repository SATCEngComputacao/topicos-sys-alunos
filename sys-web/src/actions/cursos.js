import { API_URL, defaults } from "~/env";

export async function listCursos() {
  const response = await fetch(`${API_URL}/cursos`, {
    headers: defaults.headers,
  });

  const data = await response.json();

  return data;
}

export async function findCurso(id) {
  const response = await fetch(`${API_URL}/cursos/${id}`, {
    headers: defaults.headers,
  });

  const data = await response.json();

  return data;
}

export async function createCurso(formData) {
  const response = await fetch(`${API_URL}/cursos`, {
    method: "POST",
    headers: defaults.headers,
    body: JSON.stringify(formData),
  });

  const data = await response.json();

  return data;
}

export async function updateCurso(id, formData) {
  const response = await fetch(`${API_URL}/cursos/${id}`, {
    method: "PUT",
    headers: defaults.headers,
    body: JSON.stringify(formData),
  });

  const data = await response.json();

  return data;
}

export async function destroyCurso(id) {
  const response = await fetch(`${API_URL}/cursos/${id}`, {
    method: "DELETE",
    headers: defaults.headers,
  });

  const data = await response.json();

  return data;
}
