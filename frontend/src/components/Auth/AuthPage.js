import { Col, Container, Row } from "react-bootstrap";
import "./AuthPage.css";
import SigninForm from "../SigninForm";
import SignupForm from "../SignupForm";

function AuthPage() {
  return (
    <Container className="auth-page">
      <Row>
        <Col>
          <SignupForm />
        </Col>
        <Col>
          <SigninForm />
        </Col>
      </Row>
    </Container>
  );
}

export default AuthPage;
