import { useState, useEffect } from "react";
import {Link } from "react-router-dom";
// import "../Card.css";

const UserCard = (props) => {
  const HEROKURL = "https://hello-user-api.herokuapp.com/"

  const [state, setState] = useState({
    users: [],
    // form 
    newUser: {
    userName: "",
    nickName: "",
    linkedIn: "",
    portfolio: "",
    companyName: "",
    jobTitle: "",
    hobbies: ""
    }
  });

  function handleChange(event) {
    // console.log(event.target.value);
    // setState({...state, skill: event.target.value })
    setState(prevState => ({ 
      ...prevState, 
      newUser: {...prevState.newUser, // spread existing skills 
      [event.target.name]: event.target.value }
    }));
  }

  async function handleSubmit(event) {
    if(!props.user) return;
    event.preventDefault();
    const token = await props.user.getIdToken();
    const data = {...state.newUser, managedBy: props.user.uid}
    await fetch(`${HEROKURL}api/card/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/json',
        'Authorization': 'Bearer ' + token
      },
      // request body
      body: JSON.stringify(data)
    });
    getUsers();

    setState(({users, newUser}) => ({
      users:[...users, newUser],
      newUser: {
        userName: "",
        nickName: "",
        linkedIn: "",
        portfolio: "",
        // employed: false,
        companyName: "",
        jobTitle: "",
        hobbies: ""
        }
    }))
  }
  // we need to make an HTTP request localhost:3001/api/skills
  // once we recieve the data, we will use it to set our component state with skills data
  async function getUsers() {
    if(!props.user) return;
    const token = await props.user.getIdToken();
    console.log(token)
    const response = await fetch(`${HEROKURL}api/table/`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });
    const users = await response.json();
    setState((prevState) => ({
      users,
      newUser: prevState.newUser
    }));
  }

  useEffect(() => {
    getUsers();
  }, []);

  const loaded = () => {
    return (
      <div className="usercard">
        <section className="section">
          <h3 className="cursive">{props.user.displayName}'s</h3>
          <h5 className="cursive">USER CARDS</h5>
          <hr />
          {state.users.map((u) => (
            <article key={u.userName}>
              <div>{u.userName}</div> 
              <div>{u.jobTitle}</div>
              <div>
              <Link to={`/table/${u._id}`}>
                Details
              </Link>
              </div> 
            </article>
          ))}
          <hr />
          <div className="textbox2">
            <form onSubmit={handleSubmit}>
              <label>
                <span>USERNAME</span>
                <input name="userName" value={state.newUser.userName} onChange={handleChange}/>
              </label>
              <label>
                <span>NICKNAME</span>
                <input name="nickName" value={state.newUser.nickName} onChange={handleChange}/>
              </label>
              <label>
                <span>LINKEDIN</span>
                <input name="linkedIn" value={state.newUser.linkedIn} onChange={handleChange}/>
              </label>
              <label>
                <span>PORTFOLIO</span>
                <input name="portfolio" value={state.newUser.portfolio} onChange={handleChange}/>
              </label>
              {/* <label>
                <span>EMPLOYED?</span>
                <select name="employed" value={state.newUser.employed} onChange={handleChange}>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </label> */}
              <label>
                <span>COMPANY NAME</span>
                <input name="companyName" value={state.newUser.companyName} onChange={handleChange}/>
              </label>
              <label>
                <span>JOB TITLE</span>
                <input name="jobTitle" value={state.newUser.jobTitle} onChange={handleChange}/>
              </label>
              <label>
                <span>HOBBIES</span>
                <input name="hobbies" value={state.newUser.hobbies} onChange={handleChange}/>
              </label>
              <br />
              <button className="buttonskel">ADD PROFILE CARD</button>
            </form>
          </div>
          </section>
      </div>
    );
  }
  const loading = () => {
    return <h1>Loading...</h1>;
  };
  return state.users ? loaded() : loading();
}

export default UserCard;