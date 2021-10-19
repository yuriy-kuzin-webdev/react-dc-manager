import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Accordion from "react-bootstrap/Accordion";
import DcContext from "../store/dc-context";

const dateLocales = ["en-Us", "ru-Ru", "uk-UA"];
const confirmLocales = ["Confirm", "Подтвердить", "Підтвердити"];
const cancelLocales = ["Cancel","","Отменить", "Скасувати"];
const dentistLocales = ["name","nameRu","nameUa"];
const statusLocales = [
  ["Pending","Confirmed","Canceled"],
  ["Ожидает рассмотрения ","Подтверждено","Отменено"],
  ["Очікує на розгляд", "Підтверджено", "Скасовано"]
]

export default function Appointment({
  appointment,
  dentist,
  client,
  onConfirm,
  onCancel
}) {
  const context = useContext(DcContext);
  function onConfirmHandler() {
    onConfirm(appointment);
  }
  function onCancelHandler() {
    onCancel(appointment);
  }
  return (
    <tr>
      <td>{appointment.id}</td>
      <td>{dentist[dentistLocales[context.languageCode]]}</td>
      <td>
        {new Date(appointment.date).toLocaleDateString(dateLocales[context.languageCode], {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </td>
      <td>
        <Accordion>
          <Accordion.Item eventKey={appointment.id}>
            <Accordion.Header>{client.name}</Accordion.Header>
            <Accordion.Body>
              <p>Phone: {client.phone}</p>
              <p>Email: {client.email}</p>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </td>
      <td>{statusLocales[context.languageCode][appointment.status]}</td>
      {(onConfirm || onCancel) && (
        <td width="10%">
          <ButtonGroup>
            {onConfirm && (
              <Button variant="success" onClick={onConfirmHandler}>
                {confirmLocales[context.languageCode]}
              </Button>
            )}
            {onCancel && (
              <Button variant="danger" onClick={onCancelHandler}>
                {cancelLocales[context.languageCode]}
              </Button>
            )}
          </ButtonGroup>
        </td>
      )}
    </tr>
  );
}
