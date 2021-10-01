import React, { useContext } from "react";
import { Link } from "react-router-dom";
import classes from './MainNavigation.module.css'
import DcContext from "../../store/dc-context";

export default function MainNavigation() {
  const context = useContext(DcContext)
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link to="/">Manager Dashboard{context.currentManager && ` for ${context.currentManager.clinicName}`}</Link>
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
