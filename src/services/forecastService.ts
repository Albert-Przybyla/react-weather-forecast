import axios from "axios";

const apiKey = import.meta.env.VITE_API_KEY;
const apiUrl = `${import.meta.env.VITE_API_URL}/data/2.5`;

export async function getForecast(lat: number, lon: number) {
  try {
    const response = await axios.get(`${apiUrl}/forecast`, {
      params: {
        lat,
        lon,
        appid: apiKey,
        units: "metric", // Możesz zmienić na 'imperial' jeśli chcesz w Fahrenheitach
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching forecast data:", error);
    throw error;
  }
}

export async function getForecastDaily(lat: number, lon: number) {
  try {
    const response = await axios.get(`${apiUrl}/forecast/daily`, {
      params: {
        lat,
        lon,
        appid: apiKey,
        units: "metric", // Możesz zmienić na 'imperial' jeśli chcesz w Fahrenheitach
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching forecast data:", error);
    throw error;
  }
}
