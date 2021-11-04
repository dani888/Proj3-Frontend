import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from '@mui/material/Button'

const ShowCard = (props) => {
    
    const HEROKURL = "https://hello-user-api.herokuapp.com/"
    const id = props.match.params;

    const [state, setState] = useState({
        user: [],
        // form 
      });
      
    
      // we need to make an HTTP request localhost:3001/api/skills
      // once we recieve the data, we will use it to set our component state with skills data
      useEffect(() => {
        async function getUser() {
          if(!props.user) return;
          const token = await props.user.getIdToken();
          const response = await fetch(`${HEROKURL}api/table/${id.id}`, {
                  method: 'GET',
                  headers: {
                'Authorization': 'Bearer ' + token
              }
            });
          const user = await response.json();
          // console.log('this is user', user)
          setState((prevState) => ({
            user,
            newUser: prevState.newUser
          }));
        }
        getUser();
       }, );
      
    //   console.log('this is state: ', state.user)



return ( 
    <div className="show">
        <div className="flex">
            <h1>Profile Card</h1><br/>
            <hr />
            <div className="textbox4">
                <h2 className="cursive">{state.user.userName}</h2>
                <table>
                    <tbody>
                    <tr>
                        <td><u>USERNAME:</u>  {state.user.userName}</td>
                    
                        <td><u>NICKNAME:</u>  {state.user.nickName}</td>
                    </tr>
                    <tr>
                        <td><u>EMAIL:</u>  {state.user.email}</td>
                    
                        <td><u>LINKEDIN:</u>  <a target="_blank" rel="noreferrer" href={state.user.linkedIn}>{state.user.linkedIn}</a></td>
                    </tr>
                    <tr>
                        <td><u>PORTFOLIO:</u>  {state.user.portfolio}</td>
                    
                        <td><u>LOCATION:</u>  {state.user.location}</td>
                    </tr>
                    <tr>
                        <td><u>EMPLOYMENT:</u>  {state.user.companyName}</td>
                    
                        <td><u>JOBTITLE:</u>  {state.user.jobTitle}</td>
                    </tr>
                    <tr>
                        <td><u>HOBBIES:</u>  {state.user.hobbies}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
                <hr />
                <div className="flextwo">
                <Link to="/table" ><Button className="buttwidth" variant="contained">Back</Button></Link>
            </div>
        </div>
    </div>
  )
};

export default ShowCard;