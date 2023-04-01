import React from "react";
import AuthBtns from "./AuthBtns";
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/sneakerlv.png"
import classes from './Header.module.css'

function Header() {
  return (
    <div className={classes.header}>
      <nav className={classes["left-nav"]}>
        <ul>
          <li>
            <NavLink to="home">Home</NavLink>
          </li>
          <li>
            <NavLink>New release</NavLink>
          </li>
          <li>
            <NavLink>Brands</NavLink>
          </li>
          <li>
            <NavLink>Categories</NavLink>
          </li>
          <li>
            <NavLink>Sale</NavLink>
          </li>
        </ul>
      </nav>
      <div className={classes.logo}>
        <img src={logo} alt="sneakerlv-logo" />
      </div>
      <nav className={classes["right-nav"]}>
        <ul>
          <li>
            <NavLink to="home">Releases</NavLink>
          </li>
          <li>
            <NavLink>Blog</NavLink>
          </li>
          <li>
            <NavLink>Location</NavLink>
          </li>
        </ul>
        <AuthBtns />
      </nav>
    </div>
  );
}

export default Header;