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
    email: "",
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
        email: "",
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
                <input id="textarea2" type="text" autocomplete="off" name="userName" value={state.newUser.userName} onChange={handleChange}/>
                <label for="textarea2">Ex. Daniel</label>
                </label>
              <label>
                <span>NICKNAME</span>
                <input id="textarea2" type="text" autocomplete="off" name="nickName" value={state.newUser.nickName} onChange={handleChange}/>
                <label for="textarea2">&nbsp; Ex. Dan &nbsp;</label>
              </label>
              <label>
                <span>EMAIL</span>
                <input id="textarea2" type="text" autocomplete="off" name="email" value={state.newUser.email} onChange={handleChange}/>
                <label for="textarea2">&nbsp; Ex. @gmail</label>
              </label>
              <label>
                <span>LINKEDIN</span>
                <input id="textarea2" type="text" autocomplete="off" name="linkedIn" value={state.newUser.linkedIn} onChange={handleChange}/>
                <label for="textarea2">Ex. http://</label>
              </label>
              <label>
                <span>PORTFOLIO</span>
                <input id="textarea2" type="text" autocomplete="off" name="portfolio" value={state.newUser.portfolio} onChange={handleChange}/>
                <label for="textarea2">Ex. http://</label>
              </label>
              <label>
                <span>COMPANY NAME</span>
                <input id="textarea2" type="text" autocomplete="off" name="companyName" value={state.newUser.companyName} onChange={handleChange}/>
                <label for="textarea2">Ex. Ikea &nbsp;</label>
              </label>
              <label>
                <span>JOB TITLE</span>
                <input id="textarea2" type="text" autocomplete="off" name="jobTitle" value={state.newUser.jobTitle} onChange={handleChange}/>
                <label for="textarea2">Ex. SWE&nbsp;</label>
              </label>
              <label>
                <span>HOBBIES</span>
                <input id="textarea2" type="text" autocomplete="off" name="hobbies" value={state.newUser.hobbies} onChange={handleChange}/>
                <label for="textarea2">Ex. Books</label>
              </label>
              <br />
              <button autocomplete="off" className="buttonskel">ADD PROFILE CARD</button>
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