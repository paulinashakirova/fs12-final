import "./App.css";
import Dashboard from "./components/Dashboard";
import UserRegistration from "./components/UserRegistration";
import UserLogin from "./components/UserLogin";
import UserValidation from "./components/UserValidation";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <nav className="navbar navbar-expand">
          <NavLink className="nav-item" to="/">
            Dashboard
          </NavLink>
          <NavLink className="nav-item" to="/userRegistration">
            Register
          </NavLink>
          <NavLink className="nav-item" to="/userLogin">
            Login
          </NavLink>
        </nav>

        <Switch>
          <Route path="/" exact>
            <Dashboard />
          </Route>
          <Route path="/userRegistration">
            <UserRegistration />
          </Route>
          <Route path="/userLogin">
            <UserLogin />
          </Route>
          <Route path="/userValidation">
            <UserValidation />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
