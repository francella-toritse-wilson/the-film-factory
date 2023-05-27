import { Route, Link, Routes } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

const Nav = () => {
  return (
    <nav>
      <div className="section">
        <ul className="appLogo">
          <h1>FILM FACTORY</h1>
        </ul>
        <ul className="navigationList">
          <li>
            <Link to="/"> Home</Link>
          </li>
          <li>
            <Link to="/savedMovies"> My Movies </Link>
          </li>
        </ul>
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
