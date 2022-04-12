import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import * as sessionActions from "./store/session";
import SignupForm from "./components/SignupForm";
import LogOut from "./components/Buttons/LogOut";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <LogOut />
      <SignupForm />
    </>
  );
}

export default App;
