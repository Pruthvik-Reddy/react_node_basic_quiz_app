import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router,Switch, Route} from "react-router-dom";

import Home from "./Components/Home";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Create from "./Components/create";
import Auth from "./Components/auth";
 import Category from "./Components/category";
// import Loginsuccessful from "./Components/loginsuccessful";
// import Examcat from "./Components/examcat";
import technical from "./Components/technical";
import gk from "./Components/GK";
import aptitude from "./Components/aptitude";

function App() {
  return (
    <Router>
    <>
    <Switch>
      <Route  path= "/" exact  component={Home}/>
      <Route  path= "/register" component={Register}/>
      <Route  path= "/login" component={Login}/>
      <Route  path= "/create" component={Create}/>
      <Route  path= "/auth" component={Auth}/>
      {/* <Route  path= "/loginFailed" component={LoginFailed}/>
      <Route  path= "/loginsuccessful" component={Loginsuccessful}/> */}
       <Route  path= "/category" component={Category}/>
       <Route  path= "/tech" component={technical}/>
       <Route  path= "/apt" component={aptitude}/>
       
       <Route  path= "/gk" component={gk}/>
       

    </Switch>

    </>
    </Router>
   
  );
}

export default App;
