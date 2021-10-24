import { useState, useEffect } from "react";
// import "../Card.css";

const UserCard = () => {
  const [state, setState] = useState({
    users: [],
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

  const [form, setForm] = useState(
    {
      userName: "",
      nickName: "",
      linkedIn: "",
      portfolio: "",
      employed: false,
      companyName: "",
      jobTitle: "",
      hobbies: ""
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
    event.preventDefault();
    
    await fetch('http://localhost:3001/api/card/', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/json'
      },
      // request body
      body: JSON.stringify(state.newUser)
    });
    getUsers();

    setState(({users, newUser}) => ({
      users:[...users, newUser],
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
    }))
    // console.log("form submitted")
  }
  // we need to make an HTTP request localhost:3001/api/skills
  // once we recieve the data, we will use it to set our component state with skills data
  async function getUsers() {
    const response = await fetch('http://localhost:3001/api/table/');
    const users = await response.json();
    setState((prevState) => ({
      users,
      newUser: prevState.newUser
    }));
  }

  useEffect(() => {
    getUsers();
  }, []);


  return (
    <div className="usercard">
    <section className="section">
      <h2>HELLO USER</h2>
      <hr />
      {state.users.map((u) => (
        <article key={u.userName}>
          <div>{u.userName}</div> 
          <div>{u.nickName}</div>
        </article>
      ))}
      <hr />
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
        <label>
          <span>EMPLOYED?</span>
          <select name="employed" value={state.newUser.employed} onChange={handleChange}>
            <option value="true">Yes</option>
            <option value="false">No</option>
            {/* <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option> */}
          </select>
        </label>
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
        <button className="buttoncard">ADD PROFILE CARD</button>
      </form>
      {/* <button onClick={getSkills}>Get Skills</button> */}
    </section>
    </div>
  );
}

export default UserCard;