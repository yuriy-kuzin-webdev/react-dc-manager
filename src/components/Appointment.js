import React from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Accordion from "react-bootstrap/Accordion";

export default function Appointment({
  appointment,
  dentist,
  client,
  onConfirm,
  onCancel,
}) {
  function onConfirmHandler() {
    onConfirm(appointment);
  }
  function onCancelHandler() {
    onCancel(appointment);
  }
  return (
    <tr>
      <td>{appointment.id}</td>
      <td>{dentist.name}</td>
      <td>
        {new Date(appointment.date).toLocaleDateString("en-Us", {
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
      <td>{appointment.status}</td>
      {(onConfirm || onCancel) && (
        <td width="10%">
          <ButtonGroup>
            {onConfirm && (
              <Button variant="success" onClick={onConfirmHandler}>
                Confirm
              </Button>
            )}
            {onCancel && (
              <Button variant="danger" onClick={onCancelHandler}>
                Cancel
              </Button>
            )}
          </ButtonGroup>
        </td>
      )}
    </tr>
  );
}
