// import the useState hook from react
import { useState } from 'react';

const Form = (props) => {
  // state to hold the data of our form
  const [ formState, setFormState ] = useState({
    searchterm: "g",
  });
  const handleSubmit = (event) => {
    // prevent page from refreshing on form submission
    event.preventDefault();
    // pass the search term to the getGify prop
    props.getGify(formState.searchterm);
  };
  return (
    <div>
      <hr />
      <form onSubmit={handleSubmit}>
      <br/>
        <input className="buttonskel" type="submit" value="Get Gif" />
      </form>
    </div>
    
  );
};
export default Form;