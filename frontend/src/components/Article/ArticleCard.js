import { Card, Image } from "react-bootstrap";
import { useHistory, Link } from 'react-router-dom';
import "./Article.css";

function ArticleCard({ article }) {
  return (
    <Card className="article-card">
      <Link to={`article/${article.id}`} style={{ textDecoration: 'none', color:'black' }}>
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
              {article.title}
            </div>
            <div className="article-card-profile-name-date">
              <span className="article-card-username">
                {article.User.username}
              </span>
              <span className="article-card-date">
                {new Date(article.updatedAt).toDateString()}
              </span>
            </div>
          </div>
        </Card.Title>
        {article.summary}
      </Card.Body>
      </Link>
    </Card>
  );
}

export default ArticleCard;
