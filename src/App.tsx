import "./App.css";
import { ThemeProvider } from "./components/ThemeProvider";
import Map from "./components/Map";
import { Direct } from "./models/Direct.model";
import { SearchDirect } from "./components/SearchDirect";
import { getForecast } from "./services/forecastService";
import { getWeather, getWeatherByCity } from "./services/weatherService";
import DirectInfo from "./components/DirectInfo";
import { useWeatherContext } from "./contexts/weatherContext";
import { useForecastContext } from "./contexts/forecastContext";

function App() {
  const { setWeatherData } = useWeatherContext();
  const { setForecastData } = useForecastContext();
  const prepareData = (d: Direct) => {
    if (d.name)
      getWeatherByCity(d.name).then((data) => {
        setWeatherData(data);
      });
    else
      getWeather(d.lat, d.lon).then((data) => {
        setWeatherData(data);
      });

    getForecast(d.lat, d.lon).then((data) => {
      setForecastData(data);
    });
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <nav className="p-4 bg-gray-800 flex">
        <div className="container mx-auto">
          <SearchDirect onSelect={prepareData} />
        </div>
      </nav>

      <div className="container mx-auto">
        <DirectInfo />
        <Map />
      </div>
    </ThemeProvider>
  );
}

export default App;
