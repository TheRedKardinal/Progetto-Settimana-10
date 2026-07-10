import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import NavbarComp from "./assets/components/NavbarComp";
import FooterComp from "./assets/components/FooterComp";
import HomePage from "./assets/pages/HomePage";
import NewsPage from "./assets/pages/NewsPage";

function App() {
  const [city, setCity] = useState("Tokyo");

  return (
    <>
      <header>
        <NavbarComp onSearch={setCity} />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage city={city} />} />
          <Route path="/news" element={<NewsPage />} />
        </Routes>
      </main>
      <FooterComp />
    </>
  );
}

export default App;
