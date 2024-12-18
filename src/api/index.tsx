import axios from "axios";

const url = "http://localhost:8080";

export async function getAlergias() {
  try {
    const response = await axios.get(`${url}/alergias`);
    console.log(response.data.data); // Use response.data para acessar os dados retornados.
    return response.data.data; // Retorne os dados, se necessário.
  } catch (error) {
    console.error("Erro ao buscar alergias:", error);
    throw error; // Lance o erro para tratamento adicional, se necessário.
  }
}
