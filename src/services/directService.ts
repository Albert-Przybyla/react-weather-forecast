import axios from "axios";

const apiKey = import.meta.env.VITE_API_KEY;
const apiUrl = import.meta.env.VITE_API_URL;

export const getDirects = async (q: string, coutry: string) => {
  try {
    const response = await axios.get(`${apiUrl}/direct`, {
      params: {
        q: `${q}, ${coutry}`,
        appid: apiKey,
        limit: 10,
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};
