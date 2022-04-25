import { Col, Container, Row } from "react-bootstrap";
import "./HomePage.css";
import ArticleCard from "../Article/ArticleCard";
import DecklistCard from "../Decklist/DecklistCard";
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { thunk_getHomepageArticles } from '../../store/article';
import { thunk_getHomepageDecklists } from '../../store/deck';
import { thunk_getMostPlayedStandardCards } from '../../store/card';

function HomePage() {
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.articles.homepage);
  const deckList = useSelector((state) => state.decks.homepage);
  const mostPlayedCards = useSelector((state) => state.cards.mostPlayed);

  useEffect(() => {
    dispatch(thunk_getHomepageArticles());
    dispatch(thunk_getHomepageDecklists());
    dispatch(thunk_getMostPlayedStandardCards());
  }, [dispatch]);

  return (
    <Container className="homepage">
      <Row>
        <Col>
          <h1>Articles</h1>
          {articles &&
            articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))
          }
        </Col>
        <Col>
          <h1>Decklists</h1>
          {deckList &&
            <DecklistCard deckList={deckList} />
          }
        </Col>
        <Col>
          <h1>Most played standard cards</h1>
          {mostPlayedCards &&
            mostPlayedCards.map((card) => {
              const cardName = card.name.includes(' // ') ? card.name.split(' // ')[0] : card.name;
              return (
                <div>{cardName}</div>
              );
            })
          }
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;
