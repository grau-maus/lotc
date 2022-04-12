import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import * as sessionActions from "./store/session";
import SignupForm from "./components/SignupForm";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <SignupForm />
    </>
  );
}

export default App;
