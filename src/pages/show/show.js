import { Link, useLocation } from "react-router-dom";
// import style from "./skeleton.css";
import { useState, useEffect } from "react";

const Show = (props) => {

    let location = useLocation();
    console.log('this is location', location)
    const path = location.pathname 
    const id = props.match.params;
    // console.log('id is: ', id)
    // const URL = `http://localhost:3001/api/table/${id}`;
    // const id = props.match.params
    // console.log(id)

    const [state, setState] = useState({
        user: [],
        // form 
        newUser: {
        userName: "",
        nickName: "",
        linkedIn: "",
        portfolio: "",
        employed: false,
        companyName: "",
        jobTitle: "",
        hobbies: ""
        }
      });
      
    
      // we need to make an HTTP request localhost:3001/api/skills
      // once we recieve the data, we will use it to set our component state with skills data
      useEffect(() => {
        async function getUser() {
          if(!props.user) return;
          const token = await props.user.getIdToken();
          const response = await fetch(`http://localhost:3001/api${path}`, {
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

//////
      
      const deleteCard = async (userId) => {
        if(!props.user) return;
        const token = await props.user.getIdToken();
        // make delete request to create usercard
        await fetch(`http://localhost:3001/api${path}`, {
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
            <h1>{state.user.userName}'s Profile Card</h1><br/>
            <hr />
            USERNAME:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {state.user.userName}<br />
            NICKNAME:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {state.user.nickName}<br />
            LINKEDIN:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {state.user.linkedIn}<br />
            PORTFOLIO:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {state.user.portfolio}<br />
            EMPLOYMENT:&nbsp;
            {state.user.companyName}<br />
            JOBTITLE: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {state.user.jobTitle}<br />
            HOBBIES:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {state.user.hobbies}<br />
            <hr />
            <div className="flextwo">
            <Link to="/usercard"><button className="buttonskel">Back</button></Link>
            <Link><button className="buttonskel" onClick={removeCard}>delete</button></Link>
            <Link to={`/table/${id.id}/edit`}><button className="buttonskel">Edit</button></Link>
            </div>
        </div>
    </div>
  )
};

export default Show;