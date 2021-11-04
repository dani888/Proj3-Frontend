import { Link, useHistory } from "react-router-dom";
import { logOut, signIn } from '../services/firebase';

const Nav = (props) => {
    // console.log(props.user)
    const history = useHistory()
    // console.log('this is history: ', history)

    async function logIN() {
        try{
            await signIn()
            history.push('/')
        }
        catch(error){
            console.log('not working')
        }
    }

  return (
    <div className="nav">
        { 
        props.user ?
        <>
      <Link to="/">
        <div>Home</div>
      </Link>
      <Link to="/usercard">
        <div>User Card</div>
      </Link>
      <Link to="/table">
        <div>Table</div>
      </Link>
      <Link to="/about">
        <div>About</div>
      </Link>
      <Link className="login" to="/" onClick={logOut}>
        <div>Logout</div>
      </Link>
      <Link className="login" to="/" >
        <div>
            <img className="userimage"
                src={props.user.photoURL} 
                alt={props.user.displayName} 
            /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {props.user.displayName}&nbsp;&nbsp;
        </div>
      </Link>
      {/* <Link className="login" to="/" >
        <div>
            <img 
            src={props.user.photoURL} 
             alt={props.user.displayName} 
            />
        </div>
      </Link> */}
      
      </>
        :
        <>  
      <Link to="/">
        <div>Home</div>
      </Link>
      {/* <Link to="/"  onClick={logIN2} >
        <div>User Card</div>
      </Link> */}
      {/* <Link to="/table">
        <div>Table</div>
      </Link> */}
      <Link to="/about">
        <div>About</div>
      </Link>
      <Link className="login" to="/"  onClick={logIN} >
        <div>Login</div>
      </Link>
      </>
        }
    </div>
  );
};

export default Nav;