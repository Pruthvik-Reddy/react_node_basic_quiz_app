import React, { Component } from 'react';
import {Link} from "react-router-dom";

export default class category extends Component {
    render() {
        return (
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
        )
    }
}

