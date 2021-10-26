import './App.css';
import { Route, Switch } from 'react-router-dom'
// import { useState, useEffect } from 'react';
import Welcome from './pages/welcome/Welcome';
import UserCard from './pages/card/UserCard';
import Nav from './components/Nav';
import About from './pages/about/About';
import Table from './pages/table/Table';
import Show from './pages/show/show';
import Edit from './pages/show/Edit/Edit';
// css imports =>
// import "./pages/skeleton.css"
import "./pages/card/Card.css";
import "./pages/about/About.css";
import "./pages/table/Table.css";
import "./pages/show/show.css";
import "./pages/welcome/welcome.css";
import "./pages/show/Edit/edit.css";
//

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
          <Route exact path="/table/:id" render={(routerProps) => <Show {...routerProps} />}
          />
          <Route exact path="/table/:id/edit" render={(routerProps) => <Edit 
          // updatePeople={updatePeople} 
          {...routerProps} />}
          />
        </Switch>
    </div>
  );
}

export default App;
