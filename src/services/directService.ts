import { Direct } from "@/models/Direct.model";
import axios from "axios";

const apiKey = import.meta.env.VITE_API_KEY;
const apiUrl = `${import.meta.env.VITE_API_URL}/geo/1.0`;

export const getDirects = async (q: string): Promise<Direct[] | null> => {
  try {
    const response = await axios.get(`${apiUrl}/direct`, {
      params: {
        q: `${q}`,
        appid: apiKey,
        limit: 10,
      },
    });
    const uniqueData = response.data.filter((item: Direct, index: number, self: Direct[]) => {
      return index === self.findIndex((t) => t.name === item.name);
    });

    return uniqueData;
  } catch {
    return null;
  }
};
