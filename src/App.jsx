import { useState } from "react";
import "./App.css";
import NavbarComp from "./assets/components/NavbarComp";
import MeteoComp from "./assets/components/MeteoComp";

function App() {
  const [city, setCity] = useState("Tokyo");

  return (
    <>
      <header>
        <NavbarComp onSearch={setCity} />
      </header>
      <main>
        <MeteoComp city={city} />
      </main>
    </>
  );
}

export default App;
