import { Card, Image } from "react-bootstrap";
import "./Article.css";

function ArticleCard() {
  return (
    <Card className="article-card">
      <Card.Body>
        <Card.Title className="article-card-header">
          <Image
            roundedCircle
            thumbnail
            className="article-card-profile-pic"
            src={"https://static.cardkingdom.com/images/magic-the-gathering/kamigawa-neon-dynasty/the-wandering-emperor-29539.jpg"}
          />
          <div>
            <div className="article-card-title">
              Article Title
            </div>
            <div className="article-card-profile-name-date">
              <span className="article-card-username">
                jeb42069xxx
              </span>
              <span className="article-card-date">
                04/20/2022 06:09pm
              </span>
            </div>
          </div>
        </Card.Title>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus finibus quis sapien vestibulum blandit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent eu varius eros. Quisque quis magna vitae nulla susc...
      </Card.Body>
    </Card>
  );
}

export default ArticleCard;
