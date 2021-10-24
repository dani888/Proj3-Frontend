import React from "react";
import {Link } from "react-router-dom";
// import style from "./skeleton.css";

const Welcome = (props) => {
  return ( 
    <div className="welcome">
        <div className="flex">
            <h1>Welcome to Hello USER let's get you started</h1><br/><br/><br/>
            
            <Link to="/usercard"><button className="buttonskel">Lets get Signed Up</button></Link>
            {/* <button onclick="window.location.href='/classes'">Back</button> */}
        </div>
    </div>
  )
};

export default Welcome;