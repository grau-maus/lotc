import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Form, Button, Card } from "react-bootstrap";
import { login } from "../../store/session";
import { FESigninValidation } from "../../utils/validators";

const initInvalidErrorMap = {
  credential: "",
  password: ""
};

function SigninForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(initInvalidErrorMap);

  useEffect(() => {
    return () => {
      setCredential("");
      setPassword("");
    }
  }, []);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setCredential((credential) => credential.trim());
    setPassword((password) => password.trim());

    const validationInfo = {
      credential: credential.trim(),
      password: password.trim(),
      setErrors
    };

    if (!FESigninValidation(validationInfo)) return;

    dispatch(login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();

        if (data && data.errors.length) {
          setErrors(() => ({
            credential: true,
            password: data.errors[0]
          }));
        }
      });
  };

  return (
    <>
      <Card>
        <Card.Body>
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Username / Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username / email"
                value={credential}
                onChange={(e) => {
                  if (errors.credential) {
                    setErrors((errors) => ({
                      ...errors,
                      credential: ""
                    }));
                  }
                  setCredential(e.target.value);
                }}
                isInvalid={errors.credential}
              />
              <Form.Control.Feedback type="invalid">
                {errors.credential && errors.credential}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  if (errors.password) {
                    setErrors((errors) => ({
                      ...errors,
                      password: ""
                    }));
                  }
                  setPassword(e.target.value);
                }}
                required
                isInvalid={errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit">
              Sign In
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}

export default SigninForm;
