// import the useState hook from react
import { useState } from 'react';
import Button from '@mui/material/Button'

const Form = (props) => {
  // state to hold the data of our form
  const [ formState ] = useState({
    searchterm: "r",
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
        <Button variant="contained"  type="submit" value="Get Gif">Get Gif</Button>
      </form>
    </div>
    
  );
};
export default Form;