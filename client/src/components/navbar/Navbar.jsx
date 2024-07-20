import { useContext } from "react";
import "./navbar.css"
import {Link, useNavigate} from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const {user} = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="navbar">
      <div className="navContainer">
      <Link to='/' style={{color:"inherit", textDecoration:"none"}}>
      <span className="logo">Easybooking</span>
      </Link>
     
        {user ? (user.username) : (<div className="navItems">
          <button className="navButton" disabled>Register</button>
          <button className="navButton" onClick={()=>{navigate("/login")}}>Login</button>
        </div>
        )}
      </div>
    </div>
  )
}

export default Navbar