import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
const Map = () => {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const lat = 52.2297;
  const lon = 21.0122;

  return (
    <MapContainer center={[lat, lon]} zoom={10} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {/* <TileLayer
        url={`https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${API_KEY}`}
        attribution='&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>'
      /> */}

      <TileLayer
        url={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${API_KEY}`}
        attribution='&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>'
      />
    </MapContainer>
  );
};

export default Map;
