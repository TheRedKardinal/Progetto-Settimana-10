import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import NavbarComp from "./assets/components/NavbarComp";
import FooterComp from "./assets/components/FooterComp";
import HomePage from "./assets/pages/HomePage";
import FavoritesPage from "./assets/pages/FavoritesPage";
import NewsPage from "./assets/pages/NewsPage";

const FAVORITES_KEY = "meteoJapanFavorites";

function App() {
  const [city, setCity] = useState("Tokyo");
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  function toggleFavorite(cityName) {
    setFavorites((prev) =>
      prev.includes(cityName)
        ? prev.filter((c) => c !== cityName)
        : [...prev, cityName]
    );
  }

  return (
    <>
      <header>
        <NavbarComp onSearch={setCity} />
      </header>
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                city={city}
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
              />
            }
          />
          <Route
            path="/preferiti"
            element={
              <FavoritesPage
                favorites={favorites}
                onSelectCity={setCity}
                onRemoveFavorite={toggleFavorite}
              />
            }
          />
          <Route path="/news" element={<NewsPage />} />
        </Routes>
      </main>
      <FooterComp />
    </>
  );
}

export default App;
