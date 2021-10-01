import React from "react";
import { Link } from "react-router-dom";
import classes from './MainNavigation.module.css'

export default function MainNavigation() {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link to="/">Manager Dashboard</Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/pending">Pending</Link>
          </li>
          <li>
            <Link to="/confirmed">Confirmed</Link>
          </li>
          <li>
            <Link to="/canceled">Canceled</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
