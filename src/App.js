import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import UserList from "./components/List/UserList";
import ItemList from "./components/List/ItemList";
import TableList from "./components/List/TableList";
import Login from "./components/Login";
import Register from "./components/Register";
import Principal from "./components/Principal";
import './index.css'

function App() {
  return (
    <React.Fragment>
      <Router>
        <React.Fragment>
            <Switch>
              <Route path="/" exact component={Principal} />
              <Route path="/user" component={UserList} />
              <Route path="/item" component={ItemList} />
              <Route path="/table" component={TableList} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
            </Switch >
        </React.Fragment >
      </Router >
    </React.Fragment >
  );
}

export default App;
