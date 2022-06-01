import { API_URL, defaults } from "~/env";

export async function listAlunos() {
  const response = await fetch(`${API_URL}/alunos`, {
    headers: defaults.headers,
  });

  const data = await response.json();

  return data;
}

export async function findAluno(id) {
  const response = await fetch(`${API_URL}/alunos/${id}`, {
    headers: defaults.headers,
  });

  const data = await response.json();

  return data;
}

export async function createAluno(formData) {
  const response = await fetch(`${API_URL}/alunos`, {
    method: "POST",
    headers: defaults.headers,
    body: JSON.stringify(formData),
  });

  const data = await response.json();

  return data;
}

export async function updateAluno(id, formData) {
  const response = await fetch(`${API_URL}/alunos/${id}`, {
    method: "PUT",
    headers: defaults.headers,
    body: JSON.stringify(formData),
  });

  const data = await response.json();

  return data;
}

export async function destroyAluno(id) {
  const response = await fetch(`${API_URL}/alunos/${id}`, {
    method: "DELETE",
    headers: defaults.headers,
  });

  const data = await response.json();

  return data;
}
