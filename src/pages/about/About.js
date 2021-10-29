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
        <h1><u className="cursive" >About Hello USER</u></h1>
        <ol>
            <li><p>The Goal of this application is to efficently store user data for each user that logs and have a collection of all users in a table component </p></li>
            <li><p>This Application is an experimentation using Google Firebase and MongoDB.</p></li>
            <li><p>Experimentating with components, props, event handlers, states and react hooks to implement full crud, (create data/read data/update data/delete data)</p></li>
            <li><p>This Application is using a Mongoose backend which is powering the API data</p></li>
            <li><p>This App experiments with using Firebase Authentication. As well as experiment implementing extra features such as an Api that generates Gifs:</p></li>
        </ol>
        <Form getGify={getGify}/>
        <GifyDisplay gify={gify}/>
      </div>
    </div>
  );
}
    
export default About;




