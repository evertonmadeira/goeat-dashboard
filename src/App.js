import React from "react";
import { BrowserRouter as Router, Route, Switch, useLocation, useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import UserList from "./components/List/UserList";
import ItemList from "./components/List/ItemList";
import TableList from "./components/List/TableList";
import Login from "./components/Login";
import Register from "./components/Register";
import Principal from "./components/Principal";
import "./index.css";
import { useEffect } from "react";

const protectedRoutes = ['/main','/user', '/item', '/table']

const useAuth = () => {
  let location = useLocation()
  let history = useHistory()

  useEffect(() => {
    if(protectedRoutes.includes(location.pathname) && !localStorage.getItem('token')) {
      history.push('/')
    } 
  },[location.pathname])

}

            
const RouterMain = () => {
  useAuth()
  return (
    <>
    <Route path="/" exact component={Login} />
    <Route path="/main" component={Principal} />
    <Route path="/user" component={UserList} />
    <Route path="/item" component={ItemList} />
    <Route path="/table" component={TableList} />          
    <Route path="/register" component={Register} />
    </>
  )
}

function App() {

  return (
    <React.Fragment>
      <Router>
        <React.Fragment>
          <Switch>
            <RouterMain/>
          </Switch>
        </React.Fragment>
      </Router>
    </React.Fragment>
  );
}

export default App;
