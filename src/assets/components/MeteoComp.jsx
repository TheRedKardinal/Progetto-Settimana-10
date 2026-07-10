import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = import.meta.env.VITE_OPENWEATHER_BASE_URL;

function MeteoComp({ city }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!city) return;

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
          throw new Error(
            response.status === 404
              ? `Nessuna città giapponese trovata per "${city}"`
              : "Errore nel recupero del meteo"
          );
        }

        const data = await response.json();
        setWeather(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
          setWeather(null);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();
    return () => controller.abort();
  }, [city]);

  if (loading) {
    return <p className="meteo-status">Caricamento meteo...</p>;
  }

  if (error) {
    return <p className="meteo-status meteo-error">{error}</p>;
  }

  if (!weather) {
    return null;
  }

  const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

  return (
    <section id="today-meteo" className="meteo-card" key={weather.name}>
      <h2>{weather.name}, Giappone</h2>

      <div className="meteo-main">
        <img src={iconUrl} alt={weather.weather[0].description} />
        <p className="meteo-temp">{Math.round(weather.main.temp)}°C</p>
      </div>

      <p className="meteo-desc">{weather.weather[0].description}</p>

      <ul className="meteo-details">
        <li className="meteo-stat">
          <span className="meteo-stat-label">Percepita</span>
          <span className="meteo-stat-value">
            {Math.round(weather.main.feels_like)}°C
          </span>
        </li>
        <li className="meteo-stat">
          <span className="meteo-stat-label">Umidità</span>
          <span className="meteo-stat-value">{weather.main.humidity}%</span>
        </li>
        <li className="meteo-stat">
          <span className="meteo-stat-label">Vento</span>
          <span className="meteo-stat-value">{weather.wind.speed} m/s</span>
        </li>
      </ul>
    </section>
  );
}

export default MeteoComp;
