import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "./firebase/config";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProjectPage from "./pages/ProjectPage";
import UsersPage from "./pages/UsersPage";

function App() {
  const [user] = useAuthState(auth);

  if (!user) {
    return (
      <Switch>
        <Route path="/login">
          <LoginPage />
        </Route>

        <Route path="/register">
          <RegisterPage />
        </Route>

        <Redirect to="/login" />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/project/:projectId">
        <ProjectPage />
      </Route>
      <Route path="/users">
        <UsersPage />
      </Route>
      <Route exact path="/">
        <Home />
      </Route>

      <Redirect to="/" />
    </Switch>
  );
}

export default App;
