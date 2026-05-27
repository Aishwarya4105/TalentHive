import { Link } from "react-router-dom";
import React from "react";
import { useState } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="navbar">
      <div className="logo">Talent</div>
      {/* HAMBURGER */}
      <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>


      <div className={`navlinks ${menuOpen ? "active" : ""}`}>
        <Link to="/">Home</Link>
        <Link to="/jobs">Find Jobs</Link>
        <Link to="/companies">Companies</Link>
        {/* <Link to="/about">About</Link> */}
        <a href="#about">About</a>

        <div className="mobile-auth">
          <Link to="/login"><button className="login">Login</button></Link>
          <Link to="/register"><button className="register">Register</button></Link>
        </div>



      </div>

      <div className="auth desktop-auth">
        <Link to="/login"><button className="login">Login</button></Link>
        <Link to="/register"><button className="register">Register</button></Link>
      </div>


    </div>
  );
}

export default Navbar;