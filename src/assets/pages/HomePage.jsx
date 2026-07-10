import MeteoComp from "../components/MeteoComp";
import ForecastComp from "../components/ForecastComp";

function HomePage({ city, favorites, onToggleFavorite }) {
  return (
    <>
      <MeteoComp
        city={city}
        favorites={favorites}
        onToggleFavorite={onToggleFavorite}
      />
      <ForecastComp city={city} />
    </>
  );
}

export default HomePage;
