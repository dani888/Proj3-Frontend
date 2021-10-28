import React from "react";
import {Link } from "react-router-dom";
// import style from "./skeleton.css";

const Welcome = (props) => {
  console.log(props.user)
  return ( 
    <div className="welcome">
        <div className="flex">
          {
            props.user ?
            <>
            <h1>Welcome to Hello USER </h1><br/>
            <h2><u>{props.user.displayName}</u></h2><br/>
            <Link to="/usercard"><button className="buttonskelwel">Lets get Started!</button></Link>
            </>
            :
            <>
            <h1>Welcome to Hello USER let's get you started</h1><br/><br/>
            <Link to="/login"><button className="buttonskelwel">Log In</button></Link>
            </>
          }
        </div>
    </div>
  )
};

export default Welcome;