import { useNavigate } from "react-router-dom";
import FavoriteCityCard from "../components/FavoriteCityCard";

function FavoritesPage({ favorites, onSelectCity, onRemoveFavorite }) {
  const navigate = useNavigate();

  function handleSelect(city) {
    onSelectCity(city);
    navigate("/");
  }

  if (!favorites.length) {
    return (
      <section className="favorites-page">
        <p className="meteo-status">
          Nessuna città preferita salvata. Aggiungine una dalla card meteo con
          la stella.
        </p>
      </section>
    );
  }

  return (
    <section className="favorites-page">
      {favorites.map((city) => (
        <FavoriteCityCard
          key={city}
          city={city}
          onSelect={() => handleSelect(city)}
          onRemove={() => onRemoveFavorite(city)}
        />
      ))}
    </section>
  );
}

export default FavoritesPage;
