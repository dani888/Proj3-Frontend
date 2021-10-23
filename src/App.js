import './App.css';
import { Route, Switch } from 'react-router-dom'
import Welcome from './pages/Welcome';
import UserCard from './pages/UserCard';
import Nav from './components/Nav';
import About from './pages/About';
import Table from './pages/Table';
import "./Card.css";
import "./About.css";

function App() {
  return (
    <div className="App">
      <Nav />
        <Switch>
          <Route exact path="/">
            <Welcome />
          </Route>
          <Route exact path="/usercard">
            <UserCard />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/table">
            <Table />
          </Route>
        </Switch>
    </div>
  );
}

export default App;
