import { ForecastResponse } from "@/models/Forecast.model";
import React, { createContext, useState, useContext, ReactNode } from "react";

interface ForecastContextType {
  forecastData: ForecastResponse | null;
  setForecastData: (value: ForecastResponse | null) => void;
}

const ForecastContext = createContext<ForecastContextType | undefined>(undefined);

interface ForecastContextProviderProps {
  children: ReactNode;
}

export const ForecastContextProvider: React.FC<ForecastContextProviderProps> = ({ children }) => {
  const [forecastData, setForecastData] = useState<ForecastResponse | null>(null);

  return (
    <ForecastContext.Provider value={{ forecastData, setForecastData }}>{children}</ForecastContext.Provider>
  );
};

export const useForecastContext = (): ForecastContextType => {
  const context = useContext(ForecastContext);
  if (context === undefined) {
    throw new Error("useMyContext must be used within a MyContextProvider");
  }
  return context;
};
