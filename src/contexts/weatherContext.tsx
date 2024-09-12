import { WeatherResponse } from "@/models/Weather.model";
import React, { createContext, useState, useContext, ReactNode } from "react";

interface WeatherContextType {
  weatherData: WeatherResponse | null;
  setWeatherData: (value: WeatherResponse | null) => void;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

interface WeatherContextProviderProps {
  children: ReactNode;
}

export const WeatherContextProvider: React.FC<WeatherContextProviderProps> = ({ children }) => {
  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);

  return (
    <WeatherContext.Provider value={{ weatherData, setWeatherData }}>{children}</WeatherContext.Provider>
  );
};

export const useWeatherContext = (): WeatherContextType => {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error("useMyContext must be used within a MyContextProvider");
  }
  return context;
};
