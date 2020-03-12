import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/navbar"
import EditUser from "./components/edit/edit-user";
import EditItem from "./components/edit/edit-item";
import EditTable from "./components/edit/edit-table";
import CreateUser from "./components/add/add-user";
import CreateItem from "./components/add/add-item";
import CreateTable from "./components/add/add-table";
import UserList from "./components/view/user-list";

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
              <Route path="/admin/table" component={CreateTable} />
              <Route path="/edit-user/:id" component={EditUser} />
              <Route path="/edit-item/:id" component={EditItem} />
              <Route path="/edit-table/:id" component={EditTable} />              
            </Switch >
          </div>
        </React.Fragment >
      </Router >
    </React.Fragment >
  );
}

export default App;
