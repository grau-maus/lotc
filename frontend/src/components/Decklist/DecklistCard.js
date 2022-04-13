import { Card, NavLink } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Decklist.css";

function DecklistCard() {
  const testDeckLists = new Array(20);
  testDeckLists.fill("3/27 Magic Online Challenge Magic Online,");

  return (
    <Card className="decklist-card-container">
      <Card.Body>
        {
          testDeckLists.map((decklist, idx) => (
            <NavLink key={idx} className="decklist-link">
              {decklist}
            </NavLink>
          ))
        }
      </Card.Body>
    </Card>
  );
}

export default DecklistCard;
