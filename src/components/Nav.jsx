import React from 'react';
import { NavLink } from 'react-router-dom';
import './Nav.css';

function Nav() {
  return (
    <nav className="nav">
      <div className="nav-links">
        <p>
          <NavLink
            className="nav-link"
            exact
            to="/tweets"
            activeStyle={{
              color: '#fff',
            }}
          >
            Home
          </NavLink>
        </p>

        <p>
          <NavLink
            className="nav-link"
            exact
            to="/profile"
            activeStyle={{
              color: '#fff',
            }}
          >
            Profile
          </NavLink>
        </p>
      </div>
    </nav>
  );
}

export default Nav;
