import { Col, Container, Row } from "react-bootstrap";
import "./HomePage.css";
import ArticleCard from "../Article/ArticleCard";
import DecklistCard from "../Decklist/DecklistCard";
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { thunk_getAllArticles } from '../../store/article';

function HomePage() {
  const dispatch = useDispatch();
  const allArticles = useSelector((state) => state.article);

useEffect(() => {
  dispatch(thunk_getAllArticles())
}, [dispatch]);

return (
  <Container className="homepage">
      {console.log(allArticles)}
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
