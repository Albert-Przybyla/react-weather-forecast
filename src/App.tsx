import { Route, Routes } from "react-router";
import "./App.css";
import NavBar from "./components/NavBar";
import { ThemeProvider } from "./components/ThemeProvider";
import Map from "./pages/map";
import Home from "./pages/home";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<Map />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
