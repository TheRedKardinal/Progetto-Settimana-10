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
        <p className="meteo-status text-black">
          Nessuna città preferita salvata.
        </p>
      </section>
    );
  }

  return (
    <section className="favorites-page">
      {favorites.map((city, index) => (
        <FavoriteCityCard
          key={city}
          city={city}
          onSelect={() => handleSelect(city)}
          onRemove={() => onRemoveFavorite(city)}
          style={{ animationDelay: `${index * 0.2}s` }}
        />
      ))}
    </section>
  );
}

export default FavoritesPage;
