import { Link } from "react-router-dom";

const Nav = (props) => {
  return (
    <div className="nav">
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
      <Link className="login" to="/login">
        <div>Login</div>
      </Link>
    </div>
  );
};

export default Nav;