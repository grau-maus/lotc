import { Col, Container, Row } from "react-bootstrap";
import "./HomePage.css";
import ArticleCard from "../Article/ArticleCard";
import DecklistCard from "../Decklist/DecklistCard";

function HomePage() {
  return (
    <Container className="homepage">
      <Row>
        <Col>
          <h1>Articles</h1>
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
        </Col>
        <Col>
          <h1>Decklists</h1>
          <DecklistCard />
        </Col>
        <Col>
          <h1>Most played cards</h1>
          <h1>most played cards</h1>
          <h1>most played cards</h1>
          <h1>most played cards</h1>
          <h1>most played cards</h1>
          <h1>most played cards</h1>
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;
