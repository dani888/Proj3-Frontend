import React from "react";
import { Link, useHistory } from "react-router-dom";
import { signIn } from '../../services/firebase';
import Button from '@mui/material/Button'


const Welcome = (props) => {

  console.log(props.user)
  const history = useHistory()

  async function logIN2() {
    try{
        await signIn()
        history.push('/')
    }
    catch(error){
        console.log('not working')
    }
}

  return ( 
    <div className="welcome">
        <div className="flex">
          {
            props.user ?
            <>
            <h1>Welcome to Linked USER </h1><br/>
            <h2><u>{props.user.displayName}</u></h2><br/>
            <Link to="/usercard"><Button variant="contained" fullWidth>Lets get Started!</Button></Link>
            </>
            :
            <>
            <h1>Welcome to Linked USER let's get you started</h1><br/><br />
            <Link className="login" to="/"  onClick={logIN2} ><Button variant="contained" fullWidth>Log In</Button></Link>
            </>
          }
        </div>
    </div>
  )
};

export default Welcome;