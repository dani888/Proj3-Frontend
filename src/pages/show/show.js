import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from '@mui/material/Button'


const Show = (props) => {

    const HEROKURL = "https://hello-user-api.herokuapp.com/"
    let location = useLocation();
    console.log('this is location', location)
    const path = location.pathname 
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
          const response = await fetch(`${HEROKURL}api${path}`, {
                  method: 'GET',
                  headers: {
                'Authorization': 'Bearer ' + token
              }
            });
          const user = await response.json();
          // console.log('this is user', user)
          setState((prevState) => ({
            user
          }));
        }
        getUser();
       }, []);
      
      console.log('this is state: ', state.user)

//////
      
      const deleteCard = async (userId) => {
        if(!props.user) return;
        const token = await props.user.getIdToken();
        await fetch(`${HEROKURL}api${path}`, {
          method: "DELETE",
          headers: {
            'Authorization': 'Bearer ' + token
          }
        });
        // update list of usercards
        // getUser();
        props.history.push("/usercard");
      };

      const removeCard = () => {
        deleteCard(state.user._id);
      };
      
////// 

return ( 
    <div className="show">
        <div className="flex">
            <h1 className="cursive">{state.user.userName}'s Profile Card</h1><br/>
            <hr />
            <div className="textbox3">
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
              {/* <p><u className="orangecolor">USERNAME</u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <u>{state.user.userName}</u></p>
              <p><u className="orangecolor">NICKNAME</u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <u>{state.user.nickName}</u></p>
              <p><u className="orangecolor">EMAIL</u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <u>{state.user.email}</u></p>
              <p><u className="orangecolor">LINKEDIN</u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <u><a target="_blank" rel="noreferrer" href={state.user.linkedIn}>{state.user.linkedIn}</a></u></p>
              <p><u className="orangecolor">PORTFOLIO</u> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <u>{state.user.portfolio}</u></p>
              <p><u className="orangecolor">LOCATION</u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <u>{state.user.location}</u></p>
              <p><u className="orangecolor">EMPLOYMENT</u>&nbsp;&nbsp; <u>{state.user.companyName}</u></p>
              <p><u className="orangecolor">JOBTITLE</u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <u>{state.user.jobTitle}</u></p>
              <p><u className="orangecolor">HOBBIES</u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <u>{state.user.hobbies}</u></p> */}
            </div>
            <hr />
        
            <div className="flextwo">
              <Link to="/usercard" ><Button className="buttwidth" variant="contained" >Back</Button></Link>
                <div id="downer" >
                <Button className="buttwidth" variant="contained"  onClick={removeCard}>delete</Button>
                </div>
              <Link to={`/table/${id.id}/edit`}><Button className="buttwidth" variant="contained" >Edit</Button></Link>
            </div>
            </div>
    </div>
  )
};

export default Show;