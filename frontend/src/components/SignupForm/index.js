import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Form, Button, Card } from 'react-bootstrap';
import "./SignupForm.css";
import * as sessionActions from "../../store/session";
import { FEsignupValidation, BEsignupValidation } from "../../utils/validators";

const initInvalidErrorMap = {
  email: "",
  username: "",
  password: "",
  confirmPassword: ""
};

function SignupForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState(initInvalidErrorMap);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationInfo = {
      email,
      username,
      password,
      confirmPassword,
      setErrors
    };

    if (password === confirmPassword) {
      if (!FEsignupValidation(validationInfo)) return;

      setErrors(initInvalidErrorMap);
      dispatch(sessionActions.signup(validationInfo))
        .then(() => {
          setEmail("");
          setUsername("");
          setPassword("");
          setConfirmPassword("");
        })
        .catch(async (res) => {
          const data = await res.json();

          if (data && data.errors.length) {
            BEsignupValidation({
              BEErrors: data.errors,
              setErrors
            });
          }
        });
    } else {
      FEsignupValidation(validationInfo);
      setErrors((errors) => ({
        ...errors,
        confirmPassword: "Passwords must match"
      }));
    }
  };

  return (
    <>
      <Card className="signing-form">
        <Card.Body>
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => {
                  if (errors.email) {
                    setErrors((errors) => ({
                      ...errors,
                      email: ""
                    }));
                  }
                  setEmail(e.target.value);
                }}
                isInvalid={errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email && errors.email}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="jeb42069xxx"
                value={username}
                onChange={(e) => {
                  if (errors.username) {
                    setErrors((errors) => ({
                      ...errors,
                      username: ""
                    }));
                  }
                  setUsername(e.target.value);
                }}
                isInvalid={errors.username}
              />
              <Form.Control.Feedback type="invalid">
                {errors.username}
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
            <Form.Group className="mb-3">
              <Form.Label>Confirm password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={confirmPassword}
                onChange={(e) => {
                  if (errors.confirmPassword) {
                    setErrors((errors) => ({
                      ...errors,
                      confirmPassword: ""
                    }));
                  }
                  setConfirmPassword(e.target.value);
                }}
                required
                isInvalid={errors.confirmPassword}
              />
              <Form.Control.Feedback type="invalid">
                {errors.confirmPassword}
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}

export default SignupForm;
