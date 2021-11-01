import { useState, useEffect } from "react";
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'

function Edit(props) {
    const HEROKURL = "https://hello-user-api.herokuapp.com/"
    const [state, setState] = useState({
        user: {},
      });

    const id = props.match.params.id;
    console.log('id is: ', id)
    
    const URL = `${HEROKURL}api/table/${id}`;


    useEffect(() => {
        async function getuser() {
            if(!props.user) return;
            const token = await props.user.getIdToken();
            const response = await fetch(URL, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token
                }
                });
            const user = await response.json();
            console.log(user)
            setState({
              user
            });
          }
        getuser();
      }, []);

    function handleChange(event) {
      setState(prevState => ({ 
        user: {
            ...prevState.user,
            [event.target.name]: event.target.value
        }
        }));
    }
    // handlesubmit for form
    const handleSubmit = async (event) => {
        event.preventDefault();
        await updatePeople();
        // // redirect people back to index
        props.history.push(`/table/${id}`);
    };

    const updatePeople = async () => {
        // make put request to create people
        // console.log("user",state.user)
        if(!props.user) return;
        const token = await props.user.getIdToken();
        await fetch(`${HEROKURL}api/table/${state.user._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "Application/json",
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(state.user),
        })
    };

    return (
    <div className="edit">
        <br />
        <h1 className="cursive">Edit USER Profile</h1><br />
        <div className="textbox4">
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
              margin="normal"
              fullWidth
              required
              value={state.user.userName} 
              onChange={handleChange}
            />
            <TextField
              type="text"
              autoComplete="off"
              name="nickName"
              margin="normal"
              fullWidth
              value={state.user.nickName} 
              onChange={handleChange}
            />
            <TextField
              type="text"
              autoComplete="off"
              name="email"
              margin="normal"
              fullWidth
              required
              value={state.user.email} 
              onChange={handleChange}
            />
            <TextField
              type="text"
              autoComplete="off"
              name="linkedIn"
              margin="normal"
              fullWidth
              required
              value={state.user.linkedIn} 
              onChange={handleChange}
            />
            <TextField
              type="text"
              autoComplete="off"
              name="portfolio"
              margin="normal"
              fullWidth
              value={state.user.portfolio} 
              onChange={handleChange}
            />
            <TextField
              type="text"
              autoComplete="off"
              name="location"
              margin="normal"
              fullWidth
              required
              value={state.user.location} 
              onChange={handleChange}
            />
            <TextField
              type="text"
              autoComplete="off"
              name="companyName"
              margin="normal"
              fullWidth
              required
              value={state.user.companyName} 
              onChange={handleChange}
            />
            <TextField
              type="text"
              autoComplete="off"
              name="jobTitle"
              margin="normal"
              fullWidth
              required
              value={state.user.jobTitle} 
              onChange={handleChange}
            />
            <TextField
              type="text"
              autoComplete="off"
              name="hobbies"
              margin="normal"
              fullWidth
              value={state.user.hobbies} 
              onChange={handleChange}
            />
            <Button type="submit" variant="contained" fullWidth> ADD PROFILE CARD</Button>
          </form>
        </Paper>
      </Box> 
            {/* <form className="editform" onSubmit={handleSubmit}>
                <label>
                <span>USERNAME</span>
                <input className="width" name="userName" value={state.user.userName} onChange={handleChange} required="true"/>
                </label>
                <label>
                <span>NICKNAME</span>
                <input className="width" name="nickName" value={state.user.nickName} onChange={handleChange}/>
                </label>
                <label>
                <span>EMAIL</span>
                <input className="width" name="email" value={state.user.email} onChange={handleChange} required="true"/>
                </label>
                <label>
                <span>LINKEDIN</span>
                <input className="width" name="linkedIn" value={state.user.linkedIn} onChange={handleChange} />
                </label>
                <label>
                <span>PORTFOLIO</span>
                <input className="width" name="portfolio" value={state.user.portfolio} onChange={handleChange} />
                </label>
                <label>
                <span>LOCATION</span>
                <input className="width" name="location" value={state.user.location} onChange={handleChange} required="true"/>
                </label>
                <label>
                <span>COMPANY NAME</span>
                <input className="width" name="companyName" value={state.user.companyName} onChange={handleChange} required="true"/>
                </label>
                <label>
                <span>JOB TITLE</span>
                <input className="width" name="jobTitle" value={state.user.jobTitle} onChange={handleChange} required="true"/>
                </label>
                <label>
                <span>HOBBIES</span>
                <input className="width" name="hobbies" value={state.user.hobbies} onChange={handleChange}/>
                </label>
                <br />
                <button className="buttonskel" >UPDATE PROFILE CARD</button>
            </form> */}
        </div>
      </div>
    )
  }
  
  export default Edit;