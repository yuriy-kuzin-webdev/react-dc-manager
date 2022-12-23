import React, { useContext } from "react";
import { Link } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import DcContext from "../../store/dc-context";
import Form from "react-bootstrap/Form";

const menuLocale = [
  ["Pending", "Confirmed", "Canceled", "Clients"],
  ["Ожидает рассмотрения", "Подтверждено", "Отменено","Клиенты"],
  ["Очікує на розгляд", "Підтверджено", "Скасовано","Клiенти"],
];

export default function MainNavigation() {
  const context = useContext(DcContext);
  function handleLanguage(e) {
    context.setLanguageCode(parseInt(e.target.value));
  }
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link to="/">
          Manager Dashboard
          {context.currentManager &&
            ` for ${context.currentManager.clinicName}`}
        </Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/clients">{menuLocale[context.languageCode][3]}</Link>
          </li>
          <li>
            <Link to="/pending">{menuLocale[context.languageCode][0]}</Link>
          </li>
          <li>
            <Link to="/confirmed">{menuLocale[context.languageCode][1]}</Link>
          </li>
          <li>
            <Link to="/canceled">{menuLocale[context.languageCode][2]}</Link>
          </li>
          <li>
            <Form.Select
              style={{ backgroundColor: "#77002e" }}
              className="text-light"
              defaultValue={context.languageCode}
              onChange={handleLanguage}
            >
              <option value="0">English</option>
              <option value="1">Русский</option>
              <option value="2">Українська</option>
            </Form.Select>
          </li>
        </ul>
      </nav>
    </header>
  );
}
