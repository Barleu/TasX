import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "./firebase/config";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";

function App() {
  const [user] = useAuthState(auth);

  if (!user) {
    return (
      <Router>
        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Redirect to="/login" />
        </Switch>
      </Router>
    );
  }

  return (
    <Router>
      <Switch>
        <Route path="/">
          <Home />
        </Route>

        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
