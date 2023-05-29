import { Route, Link, Routes } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';


const Nav = () => {

  const [isClicked, setIsClicked] = useState(false);

  const handleToggle = () => {
    setIsClicked(!isClicked);
  }

  return (
    <nav className={`navList ${isClicked ? 'open' : ''}`}>
      <div className="section">
        <ul className="appLogo">
          <h1>FILM FACTORY</h1>
          <li>
            <FontAwesomeIcon 
            className="hamburgerIcon"
            icon={faBars} onClick={handleToggle}/>
          </li>
        </ul>
        <div className="navigationList">
          <ul className={`navListItems ${isClicked ? 'display' : ''}`}>
            <li className="navListItems">
              <Link to="/">Home</Link>
            </li>
            <li className="navListItems">
              <Link to="/savedMovies">My Movies</Link>
            </li>
          </ul>
        </div>
        
      </div>

      <ul className="userProfile">
        <li>
          <FontAwesomeIcon
            className="profileIcon"
            icon={faUserCircle}
            size="2x"
          />
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
