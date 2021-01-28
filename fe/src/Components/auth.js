

import React, { Component } from "react";
import {Redirect} from 'react-router-dom';
const axios = require('axios');
var Router = require('react-router');


export default class Auth extends Component {
  constructor(props)
  {
    super(props);
    this.state={
      loggedIn:false,
      routes:null,
    }
  }
  componentDidMount()
  {
    console.log('propss', this.props)
    axios.post('http://localhost:5000/users/login/', {
      userid: this.props.location.state.userid,
    userpassword: this.props.location.state.userpassword
    
    })
    .then( (response) =>{
      console.log('responsee',response)
      if(response.status===200){
    if(response.data.usertype === 'admin') {
      this.setState({loggedIn : true,routes:<Redirect to={"/create"} />});
    } else {
      {this.setState({loggedIn : true,routes:<Redirect to={"/category"} />});
    }

    }
      }
  else
    this.setState({routes:<Redirect to={"/login"} />});
    });
  }
  

  
  render(){
    

return(<div>
  

 {this.state.routes}

 
 
 </div>);

}
}