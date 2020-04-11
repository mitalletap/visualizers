import './App.css';
import 'antd/dist/antd.css';
import React, { useParams } from 'react';
import Pathfinding from './Pathfinding/Pathfinding'
import { Button, Menu } from 'antd'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <React.Fragment>
      <Router>
      <div className="App">
        <Menu mode="horizontal" theme={"dark"}>
          <Menu.Item>
          <Link to="/"><Button ghost> Home </Button></Link>
          </Menu.Item>
          <Menu.Item>
          <Link to="/pathfinding"><Button ghost> Pathfinding </Button></Link>
          </Menu.Item>
          <Menu.Item>
          <Link to="/data-structures"><Button ghost> Data Structures </Button></Link>
          </Menu.Item>
          <Menu.Item>
          <Link to="/sorting"><Button ghost> Sorting </Button></Link>
          </Menu.Item>
          <Menu.Item>
          <Link to="/trees"><Button ghost> Trees </Button></Link>
          </Menu.Item>
        </Menu>

        <Switch>
          <Route exact path="/">
            <h1> Hello </h1>
          </Route>
          <Route path="/pathfinding">
            <Pathfinding />
          </Route>
          <Route path="/data-structures">
            <h1> structures </h1>
          </Route>
          <Route path="/sorting">
            <h1> sorting </h1>
          </Route>
          <Route path="/trees">
            <h1> trees </h1>
          </Route>
        </Switch>
      </div>
    </Router>
  </React.Fragment>
  )
}
 
export default App;