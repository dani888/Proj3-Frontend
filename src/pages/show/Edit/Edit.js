import { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";

function Edit(props) {

    const [state, setState] = useState({
        user: {},
      });

    const id = props.match.params.id;
    console.log('id is: ', id)
    
    const URL = `http://localhost:3001/api/table/${id}`;


    useEffect(() => {
        async function getuser() {
            const response = await fetch(URL);
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
        console.log("user",state.user)
        await fetch(`http://localhost:3001/api/table/${state.user._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "Application/json",
            },
            body: JSON.stringify(state.user),
        })
    };

    return (
    <div className="edit">
        <br />
        <br />
        <br />
        <h1>Edit USER Profile</h1><br />
            <form className="editform" onSubmit={handleSubmit}>
                <label>
                <span>USERNAME</span>
                <input className="width" name="userName" value={state.user.userName} onChange={handleChange}/>
                </label>
                <label>
                <span>NICKNAME</span>
                <input className="width" name="nickName" value={state.user.nickName} onChange={handleChange}/>
                </label>
                <label>
                <span>LINKEDIN</span>
                <input className="width" name="linkedIn" value={state.user.linkedIn} onChange={handleChange} />
                </label>
                <label>
                <span>PORTFOLIO</span>
                <input className="width" name="portfolio" value={state.user.portfolio} onChange={handleChange}/>
                </label>
                <label>
                <span>EMPLOYED?</span>
                <select className="width" name="employed" value={state.user.employed} onChange={handleChange}>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                    {/* <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option> */}
                </select>
                </label>
                <label>
                <span>COMPANY NAME</span>
                <input className="width" name="companyName" value={state.user.companyName} onChange={handleChange}/>
                </label>
                <label>
                <span>JOB TITLE</span>
                <input className="width" name="jobTitle" value={state.user.jobTitle} onChange={handleChange}/>
                </label>
                <label>
                <span>HOBBIES</span>
                <input className="width" name="hobbies" value={state.user.hobbies} onChange={handleChange}/>
                </label>
                <button className="buttoncard2" >UPDATE PROFILE CARD</button>
            </form>
      </div>
    )
  }
  
  export default Edit;