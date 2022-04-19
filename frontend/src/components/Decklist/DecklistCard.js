import { Card, NavLink } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Decklist.css";

function DecklistCard({ deckList }) {
  const testDeckLists = new Array(20);
  testDeckLists.fill("3/27 Magic Online Challenge Magic Online,");

  return (
    <Card className="decklist-card-container">
      <Card.Body>
        {
          deckList.map((decklist, idx) => {
            const date = new Date(decklist.date);
            const parsedDate = `${date.getMonth() + 1}/${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}`;
            const location = decklist.location ? `, ${decklist.location}` : '';
            const text = `${parsedDate} ${decklist.event}${location}`;
            return (
              <NavLink key={idx} className="decklist-link">
                {text}
              </NavLink>
            );
          })
        }
      </Card.Body>
    </Card>
  );
}

export default DecklistCard;
