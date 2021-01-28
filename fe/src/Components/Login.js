import { Navbar, Nav } from 'react-bootstrap';
import "./login.css";
import Header from './header'
import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
const axios = require('axios');

class Login extends Component {

    constructor(props) {
        super(props);

        this.onChangeuserid = this.onChangeuserid.bind(this);
        this.onChangepassword = this.onChangeuserpassword.bind(this);

        this.state = {
            userid: '',
            userpassword: '',
            formErrors: { userid: '', userpassword: '' },
            redirect: false,
            // useridValid: false,
            // userpasswordValid: false,
            // formValid: false
        }
    }
    componentDidMount(){
        
        this.setState({
            username: this.props.username
        })
    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        if (name === 'userid') {
            this.setState({ userid: value })
        } else {
            this.setState({ userpassword: value })
        }
    }




    onChangeuserid(e) {
        this.setState({
            userid: e.target.value
        });
    }

    onChangeuserpassword(e) {
        this.setState({
            userpassword: e.target.value
        });
    }

    handleSubmit = (e) => {
        if (this.state.userid && this.state.userpassword) {
            axios.post('http://localhost:5000/users/login/', {
                userid: this.state.userid,
                userpassword: this.state.userpassword
            }).then((response) => {
                this.props.history.push('/auth', {userid: response.data.userid, userpassword: this.state.userpassword})
                // if(response.data.code !== {error: "User does not exists"}){
                //     console.log("logged in successfull")
                // }
                console.log(`Form submitted:`);
                console.log(`Userid: ${this.state.userid}`);
                console.log(`userPassword: ${this.state.userpassword}`);

            })
        } else {
            if (this.state.userid === '') {
                this.setState(prevState => ({
                    formErrors: {
                        ...prevState.formErrors,
                        userid: 'Please enter userid'
                    }
                }))
            }
            if (this.state.userpassword === '') {
                this.setState(prevState => ({
                    formErrors: {
                        ...prevState.formErrors,
                        userpassword: 'Please enter password'
                    }
                }))
            }
        }
    }


    render() {
        const { formErrors } = this.state;
        return (
            <div className="container cd1">
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="/" style={{ fontWeight: "bold" }}>Quiz App</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="/register" style={{ color: "white" }}>Register</Nav.Link>
                    </Nav>
                </Navbar>
                <div className="container cd6 center" style={{ position: "absolute", top: "90px", marginLeft: 600 }}>
                    <h3 className="center">Login</h3>

                    <form onSubmit={this.onSubmit}>
                        <div className="form-group" style={{ width: "200px" }}>
                            <label className="aa">Userid: </label>
                            <input type="text"
                                className="form-control"
                                name="userid"
                                value={this.state.userid}

                                onChange={this.handleUserInput}
                            />
                        </div>
                        {formErrors && formErrors.userid && <p>{formErrors.userid}</p>}
                        <div className="form-group" style={{ width: "200px" }}>
                            {/* <div className="form-group " style={{width :"200px"}}> */}
                            <label className="aa">userPassword: </label>
                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                value={this.state.userpassword}
                                onChange={this.handleUserInput}
                            />
                        </div>
                        {formErrors && formErrors.userpassword && <p>{formErrors.userpassword}</p>}
                    </form>
                    <div>
                        {/* <button onClick={()=>{this.setState({username:'', goBack:true})}}>Exit</button> */}
                        <button className="btn btn-primary middle3" onClick={this.handleSubmit}  >
                            Login
                                </button>
                    </div>
                </div>
            </div>
        )
    }

}

export default withRouter(Login);