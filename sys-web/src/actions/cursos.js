import axios from "axios";

export async function listCursos() {
  const { data } = await axios.get(`/cursos`);
  return data;
}

export async function findCurso(id) {
  const { data } = await axios.get(`/cursos/${id}`);
  return data;
}

export async function createCurso(formData) {
  const { data } = await axios.post(`/cursos`, formData);
  return data;
}

export async function updateCurso(id, formData) {
  const { data } = await axios.put(`/cursos/${id}`, formData);
  return data;
}

export async function destroyCurso(id) {
  const { data } = await axios.delete(`/cursos/${id}`);
  return data;
}
