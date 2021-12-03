import React, { useState } from "react";
import { Button, Form, Container } from "semantic-ui-react";

const SignIn = (props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isExistUser, setIsExistUser] = useState(true);

  const usernameChangeHandler = (e) => {
    setUsername(e.target.value);
  };

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const loginModeHandler = () => {
    setIsExistUser(!isExistUser);
  };

  const userSignInHandler = async (e) => {
    e.preventDefault();
    const url =
      "http://localhost:8000/api/v1/users/" +
      (isExistUser ? "login" : "register");

    try {
      const respones = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (respones.status === 200 || respones.status === 201) {
        setUsername("");
        setEmail("");
        setPassword("");
        props.isUserAuth();
      }
    } catch (err) {
      console.log("Error => ", err);
    }
  };

  return (
    <Container text>
      <h2>{isExistUser ? "Log In" : "Register"}</h2>
      <Form onSubmit={userSignInHandler}>
        <Form.Field>
          <label htmlFor="name">Username</label>
          <input
            type="text"
            onChange={usernameChangeHandler}
            value={username}
          />
        </Form.Field>
        <Form.Field>
          <label htmlFor="email">Email</label>
          <input type="email" onChange={emailChangeHandler} value={email} />
        </Form.Field>
        <Form.Field>
          {" "}
          <label htmlFor="password">Password</label>
          <input
            type="password"
            onChange={passwordChangeHandler}
            value={password}
          />
        </Form.Field>
        <Button type="submit">{isExistUser ? "Log In" : "Register"}</Button>
      </Form>
      <p
        type="button"
        variant="submit"
        className="signInToggle"
        onClick={loginModeHandler}
      >
        {isExistUser ? "Create new account" : "Login with existing account"}
      </p>
    </Container>
  );
};

export default SignIn;
