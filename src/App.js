import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/navbar"
import AddUser from "./components/add/add-user";
import AddItem from "./components/add/add-item";
import UserList from "./components/view/user-list";
import ItemList from "./components/view/item-list";
import TableList from "./components/view/table-list";
import Login from "./components/Login";
import Principal from "./components/Principal";

function App() {
  return (
    <React.Fragment>
      <Router>
        <React.Fragment>
          <div className="container">
            <Navbar />
            <Switch>
              <Route path="/" exact component={Principal} />
              <Route path="/user" component={UserList} />
              {/* <Route path="/item" component={ItemList} /> */}
              <Route path="/table" component={TableList} />
            </Switch >
          </div>
        </React.Fragment >
      </Router >
    </React.Fragment >
  );
}

export default App;
