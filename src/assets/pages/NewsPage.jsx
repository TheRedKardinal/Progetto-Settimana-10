import Spinner from "react-bootstrap/Spinner";

function NewsPage() {
  return (
    <section className="news-page">
      <Spinner animation="border" role="status" className="news-spinner" />
      <p>Prossimamente...</p>
    </section>
  );
}

export default NewsPage;
