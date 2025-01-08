import axios from "axios";
import { Alergia } from "../components/pages/AlergiasPage";
import { Vacina } from "../components/pages/VacinasPage";

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

export async function getVacinas() {
  try {
    const response = await axios.get(`${url}/vacinas`);
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Erro ao buscar vacinas:", error);
    throw error;
  }
}


export async function deleteVacinas(id: string): Promise<void> {
  try {
    await axios.delete(`${url}/vacinas/${id}`);
  } catch (error) {
    console.error("Erro ao deletar vacina:", error);
    throw error;
  }
}

export async function postVacinas(dados: { titulo: string, descricao: string, doses: number, periodicidade: string, intervalo: number }): Promise<Vacina> {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    console.log("Enviando para o servidor:", dados);
    const response = await axios.post<Vacina>(
      `${url}/vacinas`,
      dados,
      config
    );

    console.log("Resposta completa:", response);

    if (!response.data) {
      const getResponse = await axios.get<Vacina[]>(`${url}/vacinas`);
      const newVacinas = getResponse.data[getResponse.data.length - 1];
      return newVacinas;
    }

    return response.data;
  } catch (error) {
    console.error("Erro na requisição:", error);
    throw error;
  }
}