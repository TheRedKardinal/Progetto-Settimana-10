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
    <section id="today-meteo" className="meteo-card">
      <h2>{weather.name}, Giappone</h2>
      <img src={iconUrl} alt={weather.weather[0].description} />
      <p className="meteo-temp">{Math.round(weather.main.temp)}°C</p>
      <p className="meteo-desc">{weather.weather[0].description}</p>
      <ul className="meteo-details">
        <li>Percepita: {Math.round(weather.main.feels_like)}°C</li>
        <li>Umidità: {weather.main.humidity}%</li>
        <li>Vento: {weather.wind.speed} m/s</li>
      </ul>
    </section>
  );
}

export default MeteoComp;
