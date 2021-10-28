// import { StyledMain } from "../styles";
import { signIn } from '../services/firebase'

const Login = (props) => {
    return(
        <div className="logincenter" >
        <br />
        <br />
        <br />
            <h1>Login</h1>
            <button className="buttonskelwel" onClick={signIn}>Google signIn</button>
        </div>
    );
};
export default Login;