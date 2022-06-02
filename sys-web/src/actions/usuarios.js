import axios from "axios";

export async function fetchLogin(formData) {
  const { data } = await axios.post(`/usuarios/login`, formData);
  return data;
}
