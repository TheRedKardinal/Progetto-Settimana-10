import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = import.meta.env.VITE_OPENWEATHER_BASE_URL;

function FavoriteCityCard({ city, onSelect, onRemove }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchWeather() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${BASE_URL}data/2.5/weather?q=${encodeURIComponent(
            city
          )},JP&units=metric&lang=it&appid=${API_KEY}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Errore meteo");
        }

        const data = await response.json();
        setWeather(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();
    return () => controller.abort();
  }, [city]);

  function handleRemove(e) {
    e.stopPropagation();
    onRemove();
  }

  return (
    <div className="favorite-card" onClick={onSelect}>
      <button
        type="button"
        className="favorite-remove"
        onClick={handleRemove}
        aria-label={`Rimuovi ${city} dai preferiti`}
      >
        &times;
      </button>

      <p className="favorite-city-name">{city}</p>

      {loading && <p className="favorite-status">Caricamento...</p>}
      {error && <p className="favorite-status meteo-error">N/D</p>}

      {weather && (
        <div className="favorite-weather">
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
            alt={weather.weather[0].description}
          />
          <p className="favorite-temp">{Math.round(weather.main.temp)}°C</p>
        </div>
      )}
    </div>
  );
}

export default FavoriteCityCard;
