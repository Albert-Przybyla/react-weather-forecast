import "./App.css";
import { ThemeProvider } from "./components/ThemeProvider";
import Map from "./components/Map";
import { Direct } from "./models/Direct.model";
import { SearchDirect } from "./components/SearchDirect";
import { getForecast } from "./services/forecastService";
import { getWeather } from "./services/weatherService";

function App() {
  const prepareData = (d: Direct) => {
    getWeather(d.lat, d.lon).then((data) => {
      console.log(data);
    });

    getForecast(d.lat, d.lon).then((data) => {
      console.log(data);
    });
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <nav className="p-4 bg-gray-800 flex">
        <SearchDirect onSelect={prepareData} />
      </nav>
      {/* <DirectInfo name={direct?.name} /> */}
      <Map />
    </ThemeProvider>
  );
}

export default App;
