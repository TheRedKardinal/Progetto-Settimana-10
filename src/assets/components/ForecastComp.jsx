import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = import.meta.env.VITE_OPENWEATHER_BASE_URL;

function formatDayName(dt) {
  const label = new Date(dt * 1000).toLocaleDateString("it-IT", {
    weekday: "short",
  });
  return label.charAt(0).toUpperCase() + label.slice(1);
}

function ForecastComp({ city }) {
  const [days, setDays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!city) return;

    const controller = new AbortController();

    async function fetchForecast() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${BASE_URL}data/2.5/forecast?q=${encodeURIComponent(
            city
          )},JP&units=metric&lang=it&appid=${API_KEY}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Errore nel recupero delle previsioni");
        }

        const data = await response.json();
        const dailyEntries = data.list.filter((item) =>
          item.dt_txt.endsWith("12:00:00")
        );
        setDays(dailyEntries);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
          setDays([]);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchForecast();
    return () => controller.abort();
  }, [city]);

  if (loading) {
    return <p className="meteo-status">Caricamento previsioni...</p>;
  }

  if (error) {
    return <p className="meteo-status meteo-error">{error}</p>;
  }

  if (!days.length) {
    return null;
  }

  return (
    <section className="forecast-section">
      {days.map((day) => (
        <div className="day-card" key={day.dt}>
          <p className="day-name">{formatDayName(day.dt)}</p>
          <div className="day-weather">
            <img
              src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
              alt={day.weather[0].description}
            />
            <p className="day-temp">{Math.round(day.main.temp)}°C</p>
          </div>
        </div>
      ))}
    </section>
  );
}

export default ForecastComp;
