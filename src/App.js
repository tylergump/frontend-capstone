import React, { useState } from "react";

import "./App.css";
import SignIn from "./component/SignIn";
import { Container } from "semantic-ui-react";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const userAuthHandler = () => {
    setIsLoggedIn(!isLoggedIn);
  };
  return (
    <Container className="App">
      {!isLoggedIn && <SignIn isUserAuth={userAuthHandler} />}
      {isLoggedIn}
    </Container>
  );
};

export default App;