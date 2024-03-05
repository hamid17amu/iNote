import React from 'react'
import {Link, useLocation, useNavigate} from "react-router-dom";


const Navbar = (props) => {
    let location = useLocation();
    let nav = useNavigate();

    const handleLogout = () =>{
      localStorage.removeItem('token');
      nav("/login");
      props.showAlert("You've logged out of your account!", "")

    }

  return (
    <div><nav className="navbar navbar-expand-lg bg-body-tertiary">
    <div className="container-fluid">
      <Link className="navbar-brand" to="/">iNote</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className={`nav-link ${location.pathname==="/"?"active":""}`} aria-current="page" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${location.pathname==="/about"?"active":""}`} to="/about">About</Link>
          </li>
          
          <li className="nav-item">
            <Link className="nav-link disabled" aria-disabled="true">Disabled</Link>
          </li>
        </ul>
        {!localStorage.getItem('token') &&<form className="d-flex" role="search">
        <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
        <Link className="btn btn-primary mx-1" to="/signup" role="button">Signup</Link>
        </form>}
        {localStorage.getItem('token') &&<form className="d-flex" role="search">
        <Link className='btn btn-primary mx-2' to="/profile">Profile</Link>
        <Link className='btn btn-primary mx-2' to="/changepass">Change Password</Link>
        <button className='btn btn-primary' onClick={handleLogout}>Logout</button>
        </form>}
        
      </div>
    </div>
  </nav></div>
  )
}

export default Navbar