 import "./register.css";
import React, { Component } from "react";
import axios from 'axios';
import {Navbar,Nav} from 'react-bootstrap';
export default class Register extends Component {
    constructor(props) {
        super(props);
       

        this.onChangeusername = this.onChangeusername.bind(this);
        this.onChangeuseremail = this.onChangeuseremail.bind(this);
        this.onChangeuserid = this.onChangeuserid.bind(this);
        this.onChangeusertype = this.onChangeusertype.bind(this);
        this.onChangeuserpassword = this.onChangeuserpassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            useremail: '',
            userid: '',
            usertype: '',
            userpassword: '',  
            showMessage: false
                
        }
    };

     
    
    error= () =>{
        if(this.state.username !== '' 
        && this.state.useremail !== '' 
        && this.state.userid !=='' 
        && this.state.usertype !== '' 
        && this.state.userpassword !== '') {
            this.setState({showMessage:true});
        }  else {
             alert("All fields are required")
        }
       };  

    onChangeusername(e) {
        this.setState({
            username: e.target.value
            
        });
    }
    
    onChangeuseremail(e) {
        this.setState({
            useremail: e.target.value
        });
    }

    onChangeuserid(e) {
        this.setState({
            userid: e.target.value
        });
    }
    onChangeusertype(e) {
        this.setState({
            usertype: e.target.value
        });
    }
    onChangeuserpassword(e) {
        this.setState({
            userpassword: e.target.value
        });
    }
     
    onSubmit(e) {
        e.preventDefault();
        
        console.log(`Form submitted:`);
        console.log(`UserName: ${this.state.username}`);
        console.log(`UserEmail: ${this.state.useremail}`);
        console.log(`UserId: ${this.state.userid}`);
        console.log(`Usertype: ${this.state.usertype}`);
        console.log(`UserPassword: ${this.state.userpassword}`);
        // alert(
       
        const mernL = {
            username: this.state.username,
            useremail: this.state.useremail,
            userid: this.state.userid,
            usertype: this.state.usertype,
            userpassword: this.state.userpassword

           
        };

        axios.post('http://localhost:5000/users/register/',mernL )
            .then(res => console.log(res.data));

       
        
    this.setState({
           username: '',
            useremail: '',
            userid: '',
            usertype: '',
            userpassword: ''

            
        })
    }
     

    render() {
        
        return(
            
            <div className="container cd1">
                <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/" style={{fontWeight:"bold"}}>Quiz App</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="/login" style={{color:"white"}}>Login</Nav.Link>
                     </Nav>      
            </Navbar>
            <div className="cd2">
                <h3 className="">User Registration</h3>
                <form onSubmit={this.onSubmit}>
                <div  style={{width :"200px"}} className="form-group">
                        <label className="">UserName: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.username}
                                onChange={this.onChangeusername}
                                required
                               />
                    </div>
                    <div  style={{width :"200px"}} className="form-group">
                        <label className="">UserEmail: </label>
                        <input 
                                type="email" 
                                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                className="form-control"
                                value={this.state.useremail}
                                onChange={this.onChangeuseremail}
                                required
                                
                                />
                                
                    </div>
                    <div  style={{width :"200px"}} className="form-group">
                        <label className="">UserId: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.userid}
                                onChange={this.onChangeuserid}
                                required
                                
                                />
                            
                    </div>
                    <div  style={{width :"200px"}} className="form-group">
                        <label className="">UserType: </label>
                        <select   onClick={this.dropdown} 
                        className="form-control"
                        value={this.state.usertype} 
                        onChange={this.onChangeusertype} 
                        
                        >
                            <option value="" className="color">select.....</option>
                            <option value="admin"className="color">Admin</option>

                             <option value="user"className="color">user</option>
                            
                        </select>
                 
                    </div>
                    
                    <div  style={{width :"200px"}} className="form-group">
                        <label className="">UserPassword: </label> 
                                <input
                                 type="password"
                                 className="form-control"
                                value={this.state.userpassword}
                                onChange={this.onChangeuserpassword}
                                required
                                />
                                
                    </div>
                   
                    <div className="form-group">{
                         this.state.showMessage && <p> Registeration Successfull</p>
                    }
                         <button type="submit" className="btn btn-primary middle" onClick={() => this.error()} >
                          
                          Register  </button>
                    </div>
                   
                </form>
                </div>
               

            </div>
            
        )}
                }
