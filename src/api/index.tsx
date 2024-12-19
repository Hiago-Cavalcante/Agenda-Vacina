import axios from "axios";
import { Alergia } from "../components/pages/AlergiasPage";

const url = "http://localhost:8080";

export async function getAlergias() {
  try {
    const response = await axios.get(`${url}/alergias`);
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Erro ao buscar alergias:", error);
    throw error;
  }
}

export async function postAlergias(dados: { nome: string }): Promise<Alergia> {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    console.log("Enviando para o servidor:", dados);
    const response = await axios.post<Alergia>(
      `${url}/alergias`,
      dados,
      config
    );

    console.log("Resposta completa:", response);

    if (!response.data) {
      const getResponse = await axios.get<Alergia[]>(`${url}/alergias`);
      const newAlergia = getResponse.data[getResponse.data.length - 1];
      return newAlergia;
    }

    return response.data;
  } catch (error) {
    console.error("Erro na requisição:", error);
    throw error;
  }
}

export async function deleteAlergia(id: string): Promise<void> {
  try {
    await axios.delete(`${url}/alergias/${id}`);
  } catch (error) {
    console.error("Erro ao deletar alergia:", error);
    throw error;
  }
}
