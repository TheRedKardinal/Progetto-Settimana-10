import MeteoComp from "../components/MeteoComp";
import ForecastComp from "../components/ForecastComp";

function HomePage({ city }) {
  return (
    <>
      <MeteoComp city={city} />
      <ForecastComp city={city} />
    </>
  );
}

export default HomePage;
