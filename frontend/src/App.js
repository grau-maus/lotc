import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import * as sessionActions from "./store/session";
import NavbarCustom from "./components/NavbarCustom";
import HomePage from "./components/HomePage";
import AuthPage from "./components/Auth/AuthPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!isLoaded) {
      dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    }
  }, [dispatch, isLoaded]);

  return (
    <BrowserRouter>
      <NavbarCustom />
      <Switch>
        <Route path="/signup" exact={true}>
          <AuthPage />
        </Route>
        <Route path="/" exact={true}>
          <HomePage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
