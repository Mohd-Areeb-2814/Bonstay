import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate();
    const logOut=()=>{
        localStorage.clear();
        navigate("/home")
    }
  return (
    <div>
            <nav
            data-testid="nav-bar"
            className="navbar navbar-expand-lg navbar-light  bg-custom"
          >
            <Link className="nav-link" style={{ fontFamily: "cursive" }} to="/home">
              BONSTAY  
            </Link> 
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/home">
                  Home
                </Link>
              </li>
              
              {localStorage.getItem("userId") !== null ? (<><li className="nav-item">
                <Link className="nav-link" to="/hotels">
                  Hotels
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/bookings">
                  Bookings
                </Link>
              </li>
              <li className="nav-item">
                <button className="nav-link" type="btn" onClick={logOut}>
                  Logout
                </button>
              </li> </>): <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link></li>
              }
              
            
            </ul>
          </nav>
    </div>
  )
}

export default Navbar