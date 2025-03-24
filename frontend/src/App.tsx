import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  Link,
} from "react-router-dom";
import "./App.css";
import Books from "./pages/Books";
import Orders from "./pages/Orders";
import Users from "./pages/Users";

function App() {
  return (
    <Router>
      <div>
        <nav style={styles.navbar}>
          <Link to="/books" style={styles.link}>
            📚 Books
          </Link>
          <Link to="/orders" style={styles.link}>
            🛒 Orders
          </Link>
          <Link to="/users" style={styles.link}>
            👤 Users
          </Link>
        </nav>

        <Switch>
          <Route path="/" exact render={() => <Redirect to="/books" />} />
          <Route path="/books" component={Books} />
          <Route path="/orders" component={Orders} />
          <Route path="/users" component={Users} />
        </Switch>
      </div>
    </Router>
  );
}

/* 🔹 Simple Styles */
const styles = {
  navbar: {
    display: "flex",
    justifyContent: "center",
    padding: "10px",
    backgroundColor: "#282c34",
  },
  link: {
    margin: "0 15px",
    color: "#ffffff",
    textDecoration: "none",
    fontSize: "18px",
    fontWeight: "bold",
  },
};

export default App;
