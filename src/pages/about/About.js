import React, {useState} from "react";
import GifyDisplay from "../gify/GifyDisplay";
import Form from "../gify/Form";

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
       <div className="textbox">
        <h1><u>About Hello USER</u></h1>
        <ul>
            <li><p>This Application is an experimentation, using Authentication with Goolge firebase, </p></li>
            <li><p>Using two differnt databases, Firebase and MongoDb </p></li>
            <li><p>Using react components and forms. referecing differnt models.</p></li>
            <li><p>The Goal of this application is to organize and store user data efficently. As well as experiment implementing extra features such as a fun Api such as Gify:</p></li>
        </ul>
        <Form getGify={getGify}/>
        <GifyDisplay gify={gify}/>
      </div>
    </div>
  );
}
    
export default About;




