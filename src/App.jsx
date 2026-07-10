import { useState } from "react";
import "./App.css";
import NavbarComp from "./assets/components/NavbarComp";
import MeteoComp from "./assets/components/MeteoComp";
import ForecastComp from "./assets/components/ForecastComp";
import FooterComp from "./assets/components/FooterComp";

function App() {
  const [city, setCity] = useState("Tokyo");

  return (
    <>
      <header>
        <NavbarComp onSearch={setCity} />
      </header>
      <main>
        <MeteoComp city={city} />
        <ForecastComp city={city} />
      </main>
      <FooterComp />
    </>
  );
}

export default App;
