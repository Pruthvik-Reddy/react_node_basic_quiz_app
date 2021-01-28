import React from 'react'
// import './styles.css'

const  header = (props) => {
    
    return (
        <div>
            <div className="header">
                Current User: <span>{props.userid}</span>
            </div>
        </div>
     )
}

export default header