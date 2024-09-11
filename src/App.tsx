import "./App.css";
import NavBar from "./components/NavBar";
import { ThemeProvider } from "./components/ThemeProvider";
import Map from "./components/Map";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <NavBar />
      <Map />
    </ThemeProvider>
  );
}

export default App;
