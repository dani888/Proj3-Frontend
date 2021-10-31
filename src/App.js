import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useState, useEffect } from 'react';
// import { useState, useEffect } from 'react';
import Welcome from './pages/welcome/Welcome';
import UserCard from './pages/card/UserCard';
import Nav from './components/Nav';
import About from './pages/about/About';
import Table from './pages/table/Table';
import Show from './pages/show/show';
import Edit from './pages/show/Edit/Edit';
import ShowCard from './pages/table/show/ShowCard';
import Login from './pages/login/Login';
// css imports =>
// import "./pages/skeleton.css"
import "./pages/card/Card.css";
import "./pages/about/About.css";
import "./pages/table/Table.css";
import "./pages/show/show.css";
import "./pages/welcome/welcome.css";
import "./pages/show/Edit/edit.css";
import "./pages/login/login.css";
import "./materialize/css/materialize.css"
//

import { auth } from './services/firebase';


function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => setUser(user));
    return () => unsubscribe(); // clean up action
  }, [])

  return (
    <div className="App">
      <Nav user={user} />
        <Switch>
          <Route exact path="/">
            <Welcome user={user} />
          </Route>
          {/* <Route exact path="/usercard">
            <UserCard />
          </Route> */}
          <Route exact path="/usercard" render={() => (
            user ? <UserCard user={user} /> : <Redirect to="/usercard" />
          )} />
          <Route exact path="/about">
            <About />
          </Route>
          {/* <Route exact path="/table">
            <Table />
          </Route> */}
          <Route exact path="/table" render={() => (
            user ? <Table user={user} />: <Redirect to="/table" />
          )} />

          <Route exact path="/table/card/:id" render={(routerProps) => (
           <ShowCard user={user} {...routerProps} /> )}
          />

          <Route exact path="/table/:id" render={(routerProps) => (
          user ? <Show user={user} {...routerProps} /> : <Redirect to="/usercard" />)}
          />
          <Route exact path="/table/:id/edit" render={(routerProps) => (
          user ? <Edit user={user} {...routerProps} /> : <Redirect to="/login" />)}
          />
          <Route exact path="/login">
            <Login />
          </Route>
        </Switch>
    </div>
  );
}

export default App;
