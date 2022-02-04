import { NavLink } from "react-router-dom";
import { faGift } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import classes from "./Navbar.module.css";

const Navbar = () => {
  return (
    <header className={classes.header}>
      <nav>
        <ul>
          <div style={{fontSize: 'xx-large', marginRight: '50px'}}>
            <FontAwesomeIcon icon={faGift} />{" "}
            Wrap ETH
          </div>
          <li>
            <NavLink
              className={(navObj) => (navObj.isActive ? classes.active : "")}
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className={(navObj) => (navObj.isActive ? classes.active : "")}
              to="/wrap"
            >
              Wrap
            </NavLink>
          </li>
          <li>
            <NavLink
              className={(navObj) => (navObj.isActive ? classes.active : "")}
              to="/about"
            >
              About
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
