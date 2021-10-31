// import { StyledMain } from "../styles";
import { signIn } from '../../services/firebase'

const Login = (props) => {
    return(
        <div className="loginz" >
        <br />
        <br />
        <br />
            <p>You are being asked to login to another account<br /> due to not being authorized to go to a show/edit <br />page for a card that does not belong to your current account!</p>
            <h2> Please Login </h2>
            <button className="buttonskelwel" onClick={signIn}>Google signIn</button>
        </div>
    );
};
export default Login;