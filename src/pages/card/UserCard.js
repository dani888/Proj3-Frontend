import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'


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
    location: "",
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
        location: "",
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
            <p><b><u>Fill out Form below to Create a Card</u></b></p>
          <Box 
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ width: '100%', mt: '1rem' }}
            >
        <Paper elevation={4} sx={{ width: '100%', p: '1rem' }}  >
          <form onSubmit={handleSubmit}>
            <TextField 
              type="text"
              autoComplete="off"
              name="userName"
              label="First Name Last Name"
              margin="normal"
              fullWidth
              required
              value={state.newUser.userName} 
              onChange={handleChange}
            />
            <TextField
              type="text"
              autoComplete="off"
              name="nickName"
              label="Nick Name"
              margin="normal"
              fullWidth
              value={state.newUser.nickName} 
              onChange={handleChange}
            />
            <TextField
              type="text"
              autoComplete="off"
              name="email"
              label="Email"
              margin="normal"
              fullWidth
              required
              value={state.newUser.email} 
              onChange={handleChange}
            />
            <TextField
              type="text"
              autoComplete="off"
              name="linkedIn"
              label="Linkedin Url"
              margin="normal"
              fullWidth
              required
              value={state.newUser.linkedIn} 
              onChange={handleChange}
            />
            <TextField
              type="text"
              autoComplete="off"
              name="portfolio"
              label="Portfolio Url"
              margin="normal"
              fullWidth
              value={state.newUser.portfolio} 
              onChange={handleChange}
            />
            <TextField
              type="text"
              autoComplete="off"
              name="location"
              label="Location"
              margin="normal"
              fullWidth
              required
              value={state.newUser.location} 
              onChange={handleChange}
            />
            <TextField
              type="text"
              autoComplete="off"
              name="companyName"
              label="Company Name"
              margin="normal"
              fullWidth
              required
              value={state.newUser.companyName} 
              onChange={handleChange}
            />
            <TextField
              type="text"
              autoComplete="off"
              name="jobTitle"
              label="Your Profession"
              margin="normal"
              fullWidth
              required
              value={state.newUser.jobTitle} 
              onChange={handleChange}
            />
            <TextField
              type="text"
              autoComplete="off"
              name="hobbies"
              label="Hobbies you have"
              margin="normal"
              fullWidth
              value={state.newUser.hobbies} 
              onChange={handleChange}
            />
            <Button type="submit" variant="contained" fullWidth> ADD PROFILE CARD</Button>
          </form>
        </Paper>
      </Box> 
            {/* <form onSubmit={handleSubmit}>
              <label>
              <span>FIRSTNAME LASTNAME</span>
                <input type="text" autoComplete="off" name="userName" value={state.newUser.userName} onChange={handleChange} required={true} placeholder="Daniel Werminghausen"/>
              </label>
              <label>
                <span>NICKNAME</span>
                <input type="text" autoComplete="off" name="nickName" value={state.newUser.nickName} onChange={handleChange} placeholder="Dan"/>
              </label>
              <label>
                <span>EMAIL</span>
                <input type="text" autoComplete="off" name="email" value={state.newUser.email} onChange={handleChange} required={true} placeholder="Daniel.werminghausen@gmail.com"/>
              </label>
              <label>
                <span>LINKEDIN</span>
                <input type="text" autoComplete="off" name="linkedIn" value={state.newUser.linkedIn} onChange={handleChange} required={true} placeholder="https://www.linkedin.com/in/daniel-werminghausen32112333"/>
              </label>
              <label>
                <span>PORTFOLIO</span>
                <input type="text" autoComplete="off" name="portfolio" value={state.newUser.portfolio} onChange={handleChange}  placeholder="http://danielwerminghausen.com"/>
              </label>
              <label>
                <span>LOCATION</span>
                <input type="text" autoComplete="off" name="location" value={state.newUser.location} onChange={handleChange} required={true} placeholder="Boston MA"/>
              </label>
              <label>
                <span>COMPANY NAME</span>
                <input type="text" autoComplete="off" name="companyName" value={state.newUser.companyName} onChange={handleChange} placeholder="General Assembly"/>
              </label>
              <label>
                <span>JOB TITLE</span>
                <input type="text" autoComplete="off" name="jobTitle" value={state.newUser.jobTitle} onChange={handleChange} required={true} placeholder="Software Engineer"/>
              </label>
              <label>
                <span>HOBBIES</span>
                <input type="text" autoComplete="off" name="hobbies" value={state.newUser.hobbies} onChange={handleChange} placeholder="Running, Reading"/>
              </label>
              <br />
              <button className="buttonskel">ADD PROFILE CARD</button>
              <br />
              <br />
            </form> */}
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