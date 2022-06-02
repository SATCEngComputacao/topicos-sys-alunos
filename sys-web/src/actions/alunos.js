import axios from "axios";

export async function listAlunos() {
  const { data } = await axios.get(`/alunos`);
  return data;
}

export async function findAluno(id) {
  const { data } = await axios.get(`/alunos/${id}`);
  return data;
}

export async function createAluno(formData) {
  const { data } = await axios.post(`/alunos`, formData);
  return data;
}

export async function updateAluno(id, formData) {
  const { data } = await axios.put(`/alunos/${id}`, formData);
  return data;
}

export async function destroyAluno(id) {
  const { data } = await axios.delete(`/alunos/${id}`);
  return data;
}
