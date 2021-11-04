import { useState, useEffect } from "react";
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'

import { useMemo } from 'react'
import useDarkMode from '../../../components/useDarkMode'
import FormControlLabel from '@mui/material/FormControlLabel'
import MaterialUISwitch from "../../../components/MaterialUiSwitch";
// import Switch from '@mui/material/Switch';
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline';
import FormGroup from '@mui/material/FormGroup'

function Edit(props) {

    const [ mode, toggleMode ] = useDarkMode()

    const theme = useMemo(
      () => createTheme({
        palette: {
          mode: mode,
        }
      }), [mode]
    )

    const HEROKURL = "https://hello-user-api.herokuapp.com/"
    const [state, setState] = useState({
        user: {},
      });

    const id = props.match.params.id;
    // console.log('id is: ', id)
    
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
            // console.log(user)
            setState({
              user
            });
          }
        getuser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [props.user, URL]);

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
    <ThemeProvider theme={theme}>
      <CssBaseline />
    <div className="edit">
        <br />
        <h1 className="cursive">Edit Profile Card</h1><br />
        <div className="textbox5">
            <FormGroup>
            <FormControlLabel 
              control={<MaterialUISwitch sx={{ m: 1 }} />}
              checked={mode === 'dark'}
              onChange={toggleMode}
              label={''}
            />
            </FormGroup>
            
            <Box 
            display="flex"
            justifyContent="center"
            alignItems="center"
            border-raduis="10px"
            sx={{ width: '100%', mt: '2rem' }}
            >
                <Paper elevation={4} sx={{ width: '100%', p: '1rem' }}  >
                Edit Card:
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
        </div>
        <br />
        <br />
      </div>
      </ThemeProvider>
    )
  }
  
  export default Edit;