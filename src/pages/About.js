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
       <h1>About Hello USER</h1>
       <p>This Application is experimenting using Authentication with Goolge firebase, </p>
       <p>react components and forms. Using two differnt databases, Firebase and MongoDb </p>
       <p>referecing differnt models. The Goal of this application is to organize and store</p>
       <p>user data efficently. As well as experiment using Api such as Gify:</p>
      <Form getGify={getGify}/>
      <GifyDisplay gify={gify}/>
    </div>
  );
}
    
export default About;




