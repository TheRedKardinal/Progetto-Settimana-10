import { useEffect, useState } from "react";
import { getWeatherEmoji } from "../utils/weatherIcons";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = import.meta.env.VITE_OPENWEATHER_BASE_URL;

function FavoriteCityCard({ city, onSelect, onRemove, style }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [entered, setEntered] = useState(false);

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
    <div
      className={`favorite-card${entered ? " favorite-card--entered" : ""}`}
      onClick={onSelect}
      onAnimationEnd={() => setEntered(true)}
      style={style}
    >
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
        <>
          <div className="favorite-weather">
            <span
              className="weather-emoji"
              role="img"
              aria-label={weather.weather[0].description}
            >
              {getWeatherEmoji(weather.weather[0].icon)}
            </span>
            <div>
              <p className="favorite-temp">
                {Math.round(weather.main.temp)}°C
              </p>
              <p className="favorite-desc">{weather.weather[0].description}</p>
            </div>
          </div>

          <ul className="favorite-details">
            <li className="favorite-stat">
              <span className="favorite-stat-label">Percepita</span>
              <span className="favorite-stat-value">
                {Math.round(weather.main.feels_like)}°C
              </span>
            </li>
            <li className="favorite-stat">
              <span className="favorite-stat-label">Umidità</span>
              <span className="favorite-stat-value">
                {weather.main.humidity}%
              </span>
            </li>
            <li className="favorite-stat">
              <span className="favorite-stat-label">Vento</span>
              <span className="favorite-stat-value">
                {weather.wind.speed} m/s
              </span>
            </li>
          </ul>
        </>
      )}
    </div>
  );
}

export default FavoriteCityCard;
