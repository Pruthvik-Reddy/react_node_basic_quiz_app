import React from 'react';
import {Navbar,Nav} from 'react-bootstrap';
import {Link} from "react-router-dom";
import "./Home.css";

function Home() {
    return (
        <div className="container cd7">
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/" style={{fontWeight:"bold"}}>QuizApp</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="/login" style={{color:"white"}}>Login</Nav.Link>
                        {/* <Nav.Link href="/create" style={{color:"white"}}>create</Nav.Link>  */}
                     </Nav>      
            </Navbar>
            <div className="head">
                <h1>Welcome to Q & A Product </h1>
            </div>
            <div className="bd">
                <button className="btn btn-primary btn-lg">
                   <Link to="/register" style={{color:"white",textDecoration:"none"}}> CLICK HERE TO REGISTER!  </Link>
                    
                </button>
            </div>
         
         </div>
            
    )
}

export default Home