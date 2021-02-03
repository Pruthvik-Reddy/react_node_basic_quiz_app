import React, { Component } from 'react';
import {Link} from "react-router-dom";
import axios from "axios";

import {Navbar,Nav} from 'react-bootstrap';

export default class category extends Component {
    constructor() {
        super();
        this.state = {
          
          name : [],
        };
      }
    
      componentDidMount() {
        console.log('Hello world');
        axios.post("http://localhost:5000/users/login").then((res) => {
          
           this.setState({
           name: res.data.username
            
           });
          
          console.log(this.state.name);
           
         });
      }
       
    render() {
        return (
            <div className="container cd1">
                <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/" style={{fontWeight:"bold"}}>Quiz App</Navbar.Brand>
                    <Nav className="mr-auto">
                        
                        <Nav.Link href="" style={{color:"white"}}>{this.state.name}</Nav.Link>
                     </Nav>      
            </Navbar>
            
            <div className="container" style={{alignItems:"center"}}>
                <div  style={{width :"500px"}}>
                     <h1  >choose a category</h1><br/><br/>  
                     <button className="btn btn-primary btn-lg">
                        <Link to="/tech" style={{color:"white",textDecoration:"none"}}> Technical</Link>
                    </button><br/><br/>  
                    <button className="btn btn-primary btn-lg">
                        <Link to="/gk" style={{color:"white",textDecoration:"none"}}>GK</Link>
                    </button><br/><br/> 
                    <button className="btn btn-primary btn-lg">
                         <Link to="/apt" style={{color:"white",textDecoration:"none"}}>Aptitude</Link>
                    </button><br/><br/>            
                                
                </div>
            </div>
            </div>
        )
    }
}

