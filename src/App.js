import './App.css';
import { Route, Switch } from 'react-router-dom'
import Welcome from './pages/Welcome';
import UserCard from './pages/UserCard';
import Nav from './components/Nav';
import About from './pages/About';
import Table from './pages/Table';

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
          {/* <Route
            path="/price/:symbol"
            render={(routerProps) => <Price {...routerProps} />}
          /> */}
          {/* <Price /> */}
          {/* </Route> */}
        </Switch>
    </div>
  );
}

export default App;
