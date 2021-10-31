import { Link } from "react-router-dom";
// import style from "./skeleton.css";
import { useState, useEffect } from "react";

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
       }, []);
      
      console.log('this is state: ', state.user)



return ( 
    <div className="show">
        <div className="flex">
            <h1 className="cursive">{state.user.userName}'s Profile Card</h1><br/>
            <hr />
            <div className="textbox3">
              <p><u className="orangecolor">USERNAME</u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <u>{state.user.userName}</u></p>
              <p><u className="orangecolor">NICKNAME</u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <u>{state.user.nickName}</u></p>
              <p><u className="orangecolor">EMAIL</u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <u>{state.user.email}</u></p>
              <p><u className="orangecolor">LINKEDIN</u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <u>{state.user.linkedIn}</u></p>
              <p><u className="orangecolor">PORTFOLIO</u> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <u>{state.user.portfolio}</u></p>
              <p><u className="orangecolor">LOCATION</u> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <u>{state.user.location}</u></p>
              <p><u className="orangecolor">EMPLOYMENT</u>&nbsp;&nbsp;&nbsp;&nbsp; <u>{state.user.companyName}</u></p>
              <p><u className="orangecolor">JOBTITLE</u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <u>{state.user.jobTitle}</u></p>
              <p><u className="orangecolor">HOBBIES</u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <u>{state.user.hobbies}</u></p>
            </div>
            <hr />
        
            <div className="flextwo">
              <Link to="/table" ><button className="buttonskel">Back</button></Link>
            </div>
            </div>
    </div>
  )
};

export default ShowCard;