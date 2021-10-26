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
          const response = await fetch(`http://localhost:3001/api${path}`);
          const user = await response.json();
          console.log('this is user', user)
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
        // make delete request to create usercard
        await fetch(`http://localhost:3001/api${path}`, {
          method: "DELETE",
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
            <Link to={`/table/${id.id}/edit`}><button className="buttonskel">Edit</button></Link>
            </div>

        </div>
    </div>
  )
};

export default Show;