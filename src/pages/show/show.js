import { Link, useLocation } from "react-router-dom";
// import style from "./skeleton.css";
import { useState, useEffect } from "react";

const Show = (props) => {

    let location = useLocation();
    console.log('this is location', location)
    const path = location.pathname
    const id = props.match.params;
    console.log('id is: ', id)
    const URL = `http://localhost:3001/api/table/${id}`;
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
      console.log('this is state: ', state.user)
    
      // we need to make an HTTP request localhost:3001/api/skills
      // once we recieve the data, we will use it to set our component state with skills data
      async function getuser() {
        const response = await fetch(`http://localhost:3001/api${path}`);
        const user = await response.json();
        console.log(user)
        setState((prevState) => ({
          user,
          newUser: prevState.newUser
        }));
      }
//////
      const deleteCard = async (userId) => {
        // make delete request to create usercard
        await fetch(`http://localhost:3001/api${path}`, {
          method: "DELETE",
        });
        // update list of usercards
        getuser();
      };
    
      const removeCard = () => {
        deleteCard(state.user._id);
        props.history.push("/usercard");
      };
////// 
        const updateCard = async (state, id) => {
            // make put request to create people
            await fetch(URL + id, {
            method: "PUT",
            headers: {
                "Content-Type": "Application/json",
            },
            body: JSON.stringify(state),
            });
            // update list of people
            getuser();
        };
      
      useEffect(() => {
        getuser();
      }, []);


return ( 
    <div className="show">
        <div className="flex">
            <h1>This is the show page</h1><br/>
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
            <button className="buttonskel" onClick={removeCard}>
                DELETE
            </button>
            </div>
            {/* <button onclick="window.location.href='/classes'">Back</button> */}
        </div>
    </div>
  )
};

export default Show;