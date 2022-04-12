import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Form, Button, Card } from 'react-bootstrap';
import "./SignupForm.css";
import * as sessionActions from "../../store/session";
import { signupValidation } from "../../utils/validators";

const initInvalidErrorMap = {
  email: false,
  username: false,
  password: false,
  confirmPassword: false
};

function SignupForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [errors, setErrors] = useState(initInvalidErrorMap);

  if (sessionUser) return <Redirect to="/" />;



  const handleSubmit = (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      const validationInfo = {
        email,
        username,
        password,
        confirmPassword,
        setErrors
      };

      if (!signupValidation(validationInfo)) return;

      setErrors(initInvalidErrorMap);
      console.log(email);
      console.log(username);
      console.log(password);
      // return dispatch(sessionActions.signup({ email, username, password }))
      //   .catch(async (res) => {
      //     const data = await res.json();
      //     if (data && data.errors) setErrors(data.errors);
      //   });

    } else {
      setErrors((errors) => ({ ...errors, confirmPassword: true }));
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
                      email: false
                    }));
                  }
                  setEmail(e.target.value);
                }}
                isInvalid={errors.email}
              />
              <Form.Control.Feedback type="invalid">
                Invalid email
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
                      username: false
                    }));
                  }
                  setUsername(e.target.value);
                }}
                isInvalid={errors.username}
              />
              <Form.Control.Feedback type="invalid">
                Invalid username
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
                      password: false
                    }));
                  }
                  setPassword(e.target.value);
                }}
                required
                isInvalid={errors.password}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a password
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
                      confirmPassword: false
                    }));
                  }
                  setConfirmPassword(e.target.value);
                }}
                required
                isInvalid={errors.confirmPassword}
              />
              <Form.Control.Feedback type="invalid">
                Passwords must match
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
