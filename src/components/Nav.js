import { Route, Link, Routes } from "react-router-dom";

const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/"> Home</Link>
        </li>
        <li>
          <Link to="/savedMovies"> My Saved Movies </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav
