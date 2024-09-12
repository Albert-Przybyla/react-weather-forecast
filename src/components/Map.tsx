import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "./ui/input";
import { useWeatherContext } from "@/contexts/weatherContext";
const Map = () => {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const [toggleValue, setToggleValue] = useState("1");
  const [timeValue, setTimeValue] = useState<number>(0);
  const { weatherData } = useWeatherContext();
  const [center, setCenter] = useState<[number, number]>([52.2297, 21.0122]);
  const mapRef = useRef(null);

  useEffect(() => {
    if (weatherData) {
      setCenter([weatherData.coord.lat, weatherData.coord.lon]);
    }
  }, [weatherData]);

  return (
    <Card className="weather-info mx-auto my-4 text-center">
      <CardHeader>
        <CardTitle className="text-2xl">Weather map</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="p-3">
          <ToggleGroup
            type="single"
            defaultValue={toggleValue}
            className="w-full"
            onValueChange={setToggleValue}
          >
            <ToggleGroupItem value="1" aria-label="Toggle rain">
              Rain
            </ToggleGroupItem>
            <ToggleGroupItem value="2" aria-label="Toggle temperature">
              Temperature
            </ToggleGroupItem>
            <ToggleGroupItem value="3" aria-label="Toggle wind">
              Wind
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        <div className="controls">
          <label htmlFor="timeRange">Time: {timeValue}h from now</label>
          <Input
            id="timeRange"
            type="range"
            min="-24"
            max="24"
            value={timeValue}
            onChange={(e) => setTimeValue(Number(e.target.value))}
          />
        </div>
        <MapContainer
          center={center}
          zoom={5}
          style={{ height: "60vh", width: "100%" }}
          whenCreated={(mapInstance: any) => {
            mapRef.current = mapInstance;
          }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {toggleValue === "1" && (
            <TileLayer
              url={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${API_KEY}&time=${timeValue}`}
              attribution='&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>'
            />
          )}

          {toggleValue === "2" && (
            <TileLayer
              url={`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${API_KEY}&time=${timeValue}`}
              attribution='&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>'
            />
          )}

          {toggleValue === "3" && (
            <TileLayer
              url={`https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${API_KEY}&time=${timeValue}`}
              attribution='&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>'
            />
          )}
        </MapContainer>
      </CardContent>
    </Card>
  );
};

export default Map;
