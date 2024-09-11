import { WeatherResponse } from "@/models/Weather.model";
import axios from "axios";

const apiKey = import.meta.env.VITE_API_KEY;
const apiUrl = `${import.meta.env.VITE_API_URL}/data/2.5`;

export async function getWeather(lat: number, lon: number): Promise<WeatherResponse | null> {
  try {
    const response = await axios.get(`${apiUrl}/weather`, {
      params: {
        lat,
        lon,
        appid: apiKey,
        units: "metric",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
}
