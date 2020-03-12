import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/navbar"
import EditUser from "./components/edit/edit-user";
import EditItem from "./components/edit/edit-item";
import Table from "./components/table";
import CreateUser from "./components/add/create-user";
import CreateItem from "./components/add/create-item";
import UserList from "./components/user-list";

function App() {
  return (
    <React.Fragment>
      <Router>
        <React.Fragment>
          <Navbar />
          <div className="container">
            <Switch>
              <Route path="/" exact component={UserList} />
              <Route path="/admin/user" component={CreateUser} />
              <Route path="/admin/item" component={CreateItem} />
              <Route path="/edit-user/:id" component={EditUser} />
              <Route path="/edit-item/:id" component={EditItem} />
              <Route path="/admin/table" component={Table} />

            </Switch >
          </div>
        </React.Fragment >
      </Router >
    </React.Fragment >
  );
}

export default App;
