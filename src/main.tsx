import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { WeatherContextProvider } from "./contexts/weatherContext.tsx";
import { ForecastContextProvider } from "./contexts/forecastContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <WeatherContextProvider>
      <ForecastContextProvider>
        <App />
      </ForecastContextProvider>
    </WeatherContextProvider>
  </StrictMode>
);
