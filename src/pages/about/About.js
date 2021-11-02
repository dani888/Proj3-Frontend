import React, {useState} from "react";
import GifyDisplay from "./gify/GifyDisplay";
import Form from "./gify/Form";

const About = (props) => {
    const API_KEY = "l0KZOOozi5WzYwHuxm2Zb7clklEE19Yv";

  const [gify, setGify] = useState(null);

  const getGify = async (searchTerm) => {
    // make fetch request and store response
    const response = await fetch(
      // searchTerm = "g"
      `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=&rating=${searchTerm}`
    );
    // parse JSON response into a javascript object
    const data = await response.json();
    console.log(data)
    // set the Movie state to the movie
    setGify(data);
  };

  // USE OUR COMPONENTS IN APP's RETURNED JSX
  return (
    <div className="about">
       <br />
       <br />
       <br />
       <div className="textbox">
        <h1><u className="cursive" >About Linked USER</u></h1>
        <ol>
            <li><p className="leftz">The Goal of this application is to efficently store user data for each user that logs in with google. Each user is able to make some profile cards which will be added to the User table where everyone (recruiters) can look for applicants. Each user has thier own idividual UserCard page where they can create edit and delete and manage thier profile cards.</p></li>
            <li><p className="leftz">This Application is an experimentation using Google Firebase to handle users and and MongoDB to handle data.</p></li>
            <li><p className="leftz">Experimentating with components, props, event handlers, states, and react hooks to implement full crud, (create data/read data/update data/delete data)</p></li>
            <li><p className="leftz">This Application is using a Mongoose backend which is managing user data on this site.</p></li>
            <li><p className="leftz">This App experiments with other cool features such as a search bar, materialize.css for styling. Also neat extra features such as an Api that generates Gifs:</p></li>
        </ol>
        <Form getGify={getGify}/>
        <GifyDisplay gify={gify}/>
      </div>
    </div>
  );
}
    
export default About;




